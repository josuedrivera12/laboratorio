const { DataTypes } = require('sequelize');
const db = require('../configuraciones/conexionbd');

const InventarioEquipo = db.define(
    'inventario_equipo',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        asignada_a: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        service_tag: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        marca_cpu: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        estado: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        no_inventario_monitor: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        marca_monitor: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        tamano_monitor: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        estado_monitor: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        no_inventario_mouse: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        marca_mouse: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        estado_mouse: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        no_inventario_teclado: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        marca_teclado: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        estado_teclado: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        observaciones: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        ip_asignada: {
            type: DataTypes.STRING(15),
            allowNull: true,
            validate: {
                isIP: true
            }
        },
        traslado: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    },
    {
        tableName: 'inventario_equipo',
        timestamps: true,
    }
);

module.exports = InventarioEquipo;
