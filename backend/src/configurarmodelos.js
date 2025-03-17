const modeloRedeswifi = require('./modelos/modeloRedeswifi');
const modeloHerramientas = require('./modelos/modeloInventarioequipo');
const modeloUsuarios = require('./modelos/modeloUsuarios');


const sequelize = require('./configuraciones/conexionbd');

async function configurarModelos() {
    try {  

        // 🔄 **Sincronizar los modelos**
        await sequelize.sync({ alter: true });
        console.log("✅ Modelos generados exitosamente");

    } catch (error) {
        console.error("❌ Error al configurar los modelos:", error);
    }
}

module.exports = configurarModelos;
