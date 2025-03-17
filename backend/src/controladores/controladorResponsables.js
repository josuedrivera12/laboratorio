const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const Responsables = require('../modelos/modeloResponsables');

// ✅ Ruta de inicio
exports.inicio = (req, res) => {
    res.json({ titulo: 'Rutas de responsables' });
};

// ✅ Guardar un nuevo responsable
exports.guardar = async (req, res) => {    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { identidad, nombre, apellido, cargo } = req.body;

        // Verificar si el responsable ya existe
        const responsableExistente = await Responsables.findOne({ where: { identidad } });
        if (responsableExistente) {
            return res.status(400).json({ mensaje: 'El responsable ya existe' });
        }

        // Crear el nuevo responsable
        const nuevoResponsable = await Responsables.create({ identidad, nombre, apellido, cargo });
        res.status(201).json({ mensaje: 'Responsable creado correctamente', responsable: nuevoResponsable });
    } catch (error) {
        console.error('❌ Error al guardar el responsable:', error);
        res.status(500).json({ mensaje: 'Error al guardar el responsable', error });
    }
};

// ✅ Listar todos los responsables
exports.listar = async (req, res) => {
    try {
        const listaResponsables = await Responsables.findAll();
        res.status(200).json(listaResponsables);
    } catch (error) {
        console.error('❌ Error al obtener los responsables:', error);
        res.status(500).json({ mensaje: 'Error al obtener los responsables', error });
    }
};

// ✅ Editar un responsable
exports.editar = async (req, res) => {
    const { identidad } = req.query;  // Se recibe por query param
    const { nombre, apellido, cargo } = req.body;
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        // Buscar el responsable por identidad
        const responsable = await Responsables.findByPk(identidad);
        if (!responsable) {
            return res.status(404).json({ mensaje: 'El responsable no existe' });
        }

        // Actualizar los campos si se proporcionan
        responsable.nombre = nombre || responsable.nombre;
        responsable.apellido = apellido || responsable.apellido;
        responsable.cargo = cargo || responsable.cargo;

        await responsable.save();
        res.json({ mensaje: 'Responsable actualizado correctamente', responsable });
    } catch (error) {
        console.error('❌ Error al editar el responsable:', error);
        res.status(500).json({ mensaje: 'Error al editar el responsable', error });
    }
};

// ✅ Eliminar un responsable
exports.eliminar = async (req, res) => {
    const { identidad } = req.query;  // Se recibe por query param
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const responsable = await Responsables.findByPk(identidad);
        if (!responsable) {
            return res.status(404).json({ mensaje: 'El responsable no existe' });
        }

        await responsable.destroy();
        res.status(200).json({ mensaje: 'Responsable eliminado correctamente' });
    } catch (error) {
        console.error('❌ Error al eliminar el responsable:', error);
        res.status(500).json({ mensaje: 'Error al eliminar el responsable', error });
    }
};
