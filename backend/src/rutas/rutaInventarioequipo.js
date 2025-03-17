const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorInventario = require('../controladores/controladorInventarioequipo');
const InventarioEquipo = require('../modelos/modeloInventarioequipo');

const rutas = Router();

// ✅ Ruta de inicio
rutas.get('/', controladorInventario.inicio);

// ✅ Ruta para listar todos los equipos del inventario
rutas.get('/listar', controladorInventario.listar);

// ✅ Ruta para guardar un nuevo equipo en el inventario
rutas.post('/guardar',
    body("asignada_a").isLength({ min: 3, max: 255 }).withMessage('⚠️ El nombre de asignación debe tener entre 3 y 255 caracteres'),
    body("service_tag").isLength({ min: 3, max: 50 }).withMessage('⚠️ El Service Tag debe tener entre 3 y 50 caracteres').custom(async (value) => {
        const equipoExistente = await InventarioEquipo.findOne({ where: { service_tag: value } });
        if (equipoExistente) {
            throw new Error('⚠️ El equipo con este Service Tag ya existe');
        }
    }),
    body("marca_cpu").isLength({ min: 2, max: 100 }).withMessage('⚠️ La marca de la CPU debe tener entre 2 y 100 caracteres'),
    body("estado").isString().withMessage('⚠️ El estado debe ser un texto válido'),
    body("no_inventario_monitor").optional().isString(),
    body("marca_monitor").optional().isString(),
    body("tamano_monitor").optional().isString(),
    body("estado_monitor").optional().isString(),
    body("no_inventario_mouse").optional().isString(),
    body("marca_mouse").optional().isString(),
    body("estado_mouse").optional().isString(),
    body("no_inventario_teclado").optional().isString(),
    body("marca_teclado").optional().isString(),
    body("estado_teclado").optional().isString(),
    body("observaciones").optional().isString(),
    body("ip_asignada").optional().isIP().withMessage('⚠️ Debe ser una dirección IP válida'),
    body("traslado").optional().isString(),
    controladorInventario.guardar
);

// ✅ Ruta para editar un equipo en el inventario
rutas.put('/editar',
    query("id").isInt().withMessage("⚠️ El ID debe ser un número entero"),
    body("asignada_a").optional().isLength({ min: 3, max: 255 }).withMessage('⚠️ El nombre de asignación debe tener entre 3 y 255 caracteres'),
    body("service_tag").optional().isLength({ min: 3, max: 50 }).withMessage('⚠️ El Service Tag debe tener entre 3 y 50 caracteres'),
    body("marca_cpu").optional().isLength({ min: 2, max: 100 }).withMessage('⚠️ La marca de la CPU debe tener entre 2 y 100 caracteres'),
    body("estado").optional().isString(),
    body("no_inventario_monitor").optional().isString(),
    body("marca_monitor").optional().isString(),
    body("tamano_monitor").optional().isString(),
    body("estado_monitor").optional().isString(),
    body("no_inventario_mouse").optional().isString(),
    body("marca_mouse").optional().isString(),
    body("estado_mouse").optional().isString(),
    body("no_inventario_teclado").optional().isString(),
    body("marca_teclado").optional().isString(),
    body("estado_teclado").optional().isString(),
    body("observaciones").optional().isString(),
    body("ip_asignada").optional().isIP().withMessage('⚠️ Debe ser una dirección IP válida'),
    body("traslado").optional().isString(),
    controladorInventario.editar
);

// ✅ Ruta para eliminar un equipo del inventario
rutas.delete('/eliminar',
    query("id").isInt().withMessage("⚠️ El ID debe ser un número entero").custom(async (value) => {
        const equipo = await InventarioEquipo.findOne({ where: { id: value } });
        if (!equipo) {
            throw new Error('⚠️ El ID no existe');
        }
    }),
    controladorInventario.eliminar
);

module.exports = rutas;
