const { Op } = require('sequelize');
const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorRedesWiFi = require('../controladores/controladorRedeswifi');
const RedesWiFi = require('../modelos/modeloRedeswifi');

const rutas = Router();

// Ruta de inicio
rutas.get('/', controladorRedesWiFi.inicio);

// Ruta para listar todas las redes WiFi
rutas.get('/listar', controladorRedesWiFi.listar);

// Ruta para guardar una nueva red WiFi
rutas.post('/guardar',
    body("nombre")
        .isLength({ min: 3, max: 255 })
        .withMessage('El nombre de la red debe tener entre 3 y 255 caracteres')
        .custom(async (value) => {
            const redExistente = await RedesWiFi.findOne({ where: { nombre: value } });
            if (redExistente) {
                throw new Error('La red WiFi ya existe');
            }
        }),
    body("contrasena")
        .isLength({ min: 6, max: 255 })
        .withMessage('La contraseña debe tener entre 6 y 255 caracteres'),
    controladorRedesWiFi.guardar
);

// Ruta para editar una red WiFi
rutas.put('/editar',
    query("id")
        .isInt()
        .withMessage("El ID debe ser un número entero"),
    body("nombre")
        .optional()
        .isLength({ min: 3, max: 255 })
        .withMessage('El nombre de la red debe tener entre 3 y 255 caracteres')
        .custom(async (value, { req }) => {
            if (!value) return true;
            const redId = parseInt(req.query.id, 10);
            if (isNaN(redId)) {
                throw new Error("El ID de la red es inválido");
            }
            const redExistente = await RedesWiFi.findOne({
                where: { nombre: value, id: { [Op.ne]: redId } }
            });
            if (redExistente) {
                throw new Error('El nombre de la red ya está en uso');
            }
        }),
    body("contrasena")
        .optional()
        .isLength({ min: 6, max: 255 })
        .withMessage('La contraseña debe tener entre 6 y 255 caracteres'),
    controladorRedesWiFi.editar
);

// Ruta para eliminar una red WiFi
rutas.delete('/eliminar',
    query("id")
        .isInt()
        .withMessage("El ID debe ser un número entero")
        .custom(async (value) => {
            const red = await RedesWiFi.findOne({ where: { id: value } });
            if (!red) {
                throw new Error('El ID no existe');
            }
        }),
    controladorRedesWiFi.eliminar
);

module.exports = rutas;
