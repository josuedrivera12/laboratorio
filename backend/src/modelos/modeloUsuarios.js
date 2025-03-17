const { DataTypes } = require('sequelize');
const db = require('../configuraciones/conexionbd');

const Usuarios = db.define(
    'usuarios',
    {
        correo: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true // Validar que sea un correo electrónico
            }
        },
        usuario: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
                len: [3, 50] // El nombre de usuario debe tener entre 3 y 50 caracteres
            }
        },
        contraseña: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        cargo: {
            type: DataTypes.ENUM('Administrador', 'Usuario', 'Gerente', 'Empleado'),
            allowNull: false
        }
    },
    {
        tableName: 'usuarios',
        timestamps: true,
    }
);

module.exports = Usuarios;
