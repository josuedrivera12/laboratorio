const { Router } = require('express');
const { body, param } = require('express-validator');
const controladorUsuarios = require('../controladores/controladorUsuarios');
const Usuario = require('../modelos/modeloUsuarios');

const rutas = Router();

// Ruta para listar todos los usuarios
rutas.get('/listar', controladorUsuarios.listar);

// Ruta para iniciar sesión
rutas.post('/login',
    body("usuario").notEmpty().withMessage("El usuario es obligatorio"),
    body("contraseña").notEmpty().withMessage("La contraseña es obligatoria"),
    controladorUsuarios.loginUsuario
);

// Ruta para registrar un nuevo usuario
rutas.post('/guardar',
    body("correo")
        .isEmail().withMessage('Debe ingresar un correo electrónico válido')
        .custom(async (value) => {
            const usuarioExistente = await Usuario.findOne({ where: { correo: value } });
            if (usuarioExistente) {
                throw new Error('El correo ya está en uso');
            }
        }),
    body("usuario")
        .isLength({ min: 3, max: 50 }).withMessage('El usuario debe tener entre 3 y 50 caracteres')
        .custom(async (value) => {
            const usuarioExistente = await Usuario.findOne({ where: { usuario: value } });
            if (usuarioExistente) {
                throw new Error('El usuario ya está en uso');
            }
        }),
    body("contraseña")
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body("cargo")
        .isIn(['Administrador', 'Usuario', 'Gerente', 'Empleado']).withMessage('El cargo debe ser uno de los valores permitidos'),
    controladorUsuarios.guardarUsuario
);

// Ruta para editar un usuario
rutas.put('/editar/:id',
    param("id").isInt().withMessage("El ID debe ser un número entero"),
    body("correo")
        .isEmail().withMessage("Debe ingresar un correo válido"),
    body("usuario")
        .isLength({ min: 3, max: 50 }).withMessage("El usuario debe tener entre 3 y 50 caracteres"),
    body("contraseña")
        .optional().isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
    body("cargo")
        .isIn(["Administrador", "Usuario", "Gerente", "Empleado"]).withMessage("El cargo no es válido"),
    controladorUsuarios.editarUsuario
);

// Ruta para eliminar un usuario
rutas.delete('/eliminar/:id',
    param("id").isInt().withMessage("El ID debe ser un número entero"),
    controladorUsuarios.eliminarUsuario
);

module.exports = rutas;