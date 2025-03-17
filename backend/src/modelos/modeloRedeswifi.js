const { DataTypes } = require('sequelize');
const db = require('../configuraciones/conexionbd');

const RedesWiFi = db.define(
    'redes_wifi',
    {
        nombre: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                len: [3, 255] // El nombre debe tener entre 3 y 255 caracteres
            }
        },
        contrasena: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                len: [6, 255] // La contraseña debe tener al menos 6 caracteres
            }
        }
    },
    {
        tableName: 'redes_wifi',
        timestamps: true,
    }
);

module.exports = RedesWiFi;