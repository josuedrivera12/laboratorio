const { Op } = require('sequelize');
const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorResponsables = require('../controladores/controladorResponsables');
const Responsable = require('../modelos/modeloResponsables');

const rutas = Router();

// Ruta de inicio
rutas.get('/', controladorResponsables.inicio);

// Ruta para listar todos los responsables
rutas.get('/listar', controladorResponsables.listar);

// Ruta para guardar un nuevo responsable
rutas.post('/guardar',
    body("identidad")
        .isLength({ min: 13, max: 13 })
        .withMessage('El ID debe tener exactamente 13 caracteres')
        .custom(async (value) => {
            const responsableExistente = await Responsable.findOne({ where: { id: value } });
            if (responsableExistente) {
                throw new Error('El responsable ya existe');
            }
        }),
    body("nombre")
        .isLength({ min: 3, max: 255 })
        .withMessage('El nombre debe tener entre 3 y 255 caracteres'),
    body("apellido")
        .isLength({ min: 3, max: 255 })
        .withMessage('El apellido debe tener entre 3 y 255 caracteres'),
    body("cargo")
        .isString()
        .withMessage('El cargo debe ser un texto válido'),
    controladorResponsables.guardar
);

// Ruta para editar un responsable
rutas.put('/editar',
    query("id")
        .isLength({ min: 13, max: 13 })
        .withMessage("El ID debe tener exactamente 13 caracteres"),
    body("nombre")
        .optional()
        .isLength({ min: 3, max: 255 })
        .withMessage('El nombre debe tener entre 3 y 255 caracteres'),
    body("apellido")
        .optional()
        .isLength({ min: 3, max: 255 })
        .withMessage('El apellido debe tener entre 3 y 255 caracteres'),
    body("cargo")
        .optional()
        .isString()
        .withMessage('El cargo debe ser un texto válido'),
    controladorResponsables.editar
);

// Ruta para eliminar un responsable
rutas.delete('/eliminar',
    query("id")
        .isLength({ min: 13, max: 13 })
        .withMessage("El ID debe tener exactamente 13 caracteres")
        .custom(async (value) => {
            const responsable = await Responsable.findOne({ where: { id: value } });
            if (!responsable) {
                throw new Error('El ID no existe');
            }
        }),
    controladorResponsables.eliminar
);

module.exports = rutas;
