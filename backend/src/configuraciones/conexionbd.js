const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('laboratorio', 'root', 'Unicah123', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

module.exports = sequelize;