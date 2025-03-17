const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const RedesWiFi = require('../modelos/modeloRedeswifi');

// Ruta de inicio
exports.inicio = (req, res) => {
    res.json({ titulo: 'Rutas de Redes WiFi' });
};

// Ruta para guardar una nueva red WiFi
exports.guardar = async (req, res) => {
    const { nombre, contrasena } = req.body;
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Verificar si la red ya existe
        const redExistente = await RedesWiFi.findOne({ where: { nombre } });
        if (redExistente) {
            return res.status(400).json({ mensaje: 'La red WiFi ya existe' });
        }

        // Crear la nueva red WiFi
        const nuevaRed = await RedesWiFi.create({ nombre, contrasena });
        res.status(201).json(nuevaRed);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al guardar la red WiFi', error });
    }
};

// Ruta para listar todas las redes WiFi
exports.listar = async (req, res) => {
    try {
        const listaRedes = await RedesWiFi.findAll();
        res.status(200).json(listaRedes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener las redes WiFi', error });
    }
};

// Ruta para editar una red WiFi
exports.editar = async (req, res) => {
    const { id } = req.query;
    const { nombre, contrasena } = req.body;
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const red = await RedesWiFi.findByPk(id);
        if (!red) {
            return res.status(404).json({ mensaje: 'La red WiFi no existe' });
        }
        
        // Verificar si el nuevo nombre ya está en uso por otra red
        if (nombre) {
            const redExistente = await RedesWiFi.findOne({
                where: { nombre, id: { [Op.ne]: id } }
            });
            if (redExistente) {
                return res.status(400).json({ mensaje: 'El nombre de la red ya está en uso' });
            }
        }

        // Actualizar los campos
        red.nombre = nombre || red.nombre;
        red.contrasena = typeof contrasena !== 'undefined' ? contrasena : red.contrasena;

        await red.save();
        res.json({ mensaje: 'Red WiFi actualizada correctamente', red });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al editar la red WiFi', error });
    }
};

// Ruta para eliminar una red WiFi
exports.eliminar = async (req, res) => {
    const { id } = req.query;
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const red = await RedesWiFi.findByPk(id);
        if (!red) {
            return res.status(404).json({ mensaje: 'La red WiFi no existe' });
        }

        await red.destroy();
        res.status(200).json({ mensaje: 'Red WiFi eliminada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar la red WiFi', error });
    }
};