const { DataTypes } = require('sequelize');
const db = require('../configuraciones/conexionbd');

const Responsables = db.define(
    'responsables',
    {
        identidad: {
            type: DataTypes.STRING(13),  // Cambiar de INTEGER a STRING si es un DNI
            allowNull: false,
          },
        nombre: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                len: [3, 255] // El nombre debe tener entre 3 y 255 caracteres
            }
        },
        apellido: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                len: [3, 255] // El apellido debe tener entre 3 y 255 caracteres
            }
        },
        cargo: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    },
    {
        tableName: 'responsables',
        timestamps: true,
    }
);

module.exports = Responsables;
