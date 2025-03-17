const { validationResult } = require('express-validator');
const InventarioEquipo = require('../modelos/modeloInventarioequipo');

// ✅ Ruta de inicio
exports.inicio = (req, res) => {
    res.json({ titulo: 'Rutas de Inventario de Equipos' });
};

// ✅ Guardar un nuevo equipo en el inventario
exports.guardar = async (req, res) => {
    const datos = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Verificar si el equipo ya existe por Service Tag
        const equipoExistente = await InventarioEquipo.findOne({ where: { service_tag: datos.service_tag } });
        if (equipoExistente) {
            return res.status(400).json({ mensaje: '⚠️ El equipo con este Service Tag ya existe' });
        }

        // Crear el nuevo equipo
        const nuevoEquipo = await InventarioEquipo.create(datos);
        res.status(201).json({ mensaje: '✅ Equipo agregado correctamente', equipo: nuevoEquipo });
    } catch (error) {
        console.error('❌ Error al guardar el equipo:', error);
        res.status(500).json({ mensaje: '❌ Error al guardar el equipo', error });
    }
};

// ✅ Listar todos los equipos del inventario
exports.listar = async (req, res) => {
    try {
        const listaEquipos = await InventarioEquipo.findAll();
        res.status(200).json(listaEquipos);
    } catch (error) {
        console.error('❌ Error al obtener el inventario:', error);
        res.status(500).json({ mensaje: '❌ Error al obtener el inventario', error });
    }
};

// ✅ Editar un equipo en el inventario
exports.editar = async (req, res) => {
    const { id } = req.query;
    const datos = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Buscar el equipo por ID
        const equipo = await InventarioEquipo.findByPk(id);
        if (!equipo) {
            return res.status(404).json({ mensaje: '⚠️ El equipo no existe' });
        }

        // Actualizar los campos si se proporcionan
        await equipo.update(datos);
        res.json({ mensaje: '✅ Equipo actualizado correctamente', equipo });
    } catch (error) {
        console.error('❌ Error al editar el equipo:', error);
        res.status(500).json({ mensaje: '❌ Error al editar el equipo', error });
    }
};

// ✅ Eliminar un equipo del inventario
exports.eliminar = async (req, res) => {
    const { id } = req.query;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const equipo = await InventarioEquipo.findByPk(id);
        if (!equipo) {
            return res.status(404).json({ mensaje: '⚠️ El equipo no existe' });
        }

        await equipo.destroy();
        res.status(200).json({ mensaje: '✅ Equipo eliminado correctamente' });
    } catch (error) {
        console.error('❌ Error al eliminar el equipo:', error);
        res.status(500).json({ mensaje: '❌ Error al eliminar el equipo', error });
    }
};
