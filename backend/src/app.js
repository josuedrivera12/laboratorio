const express = require('express');
const cors = require('cors'); // ✅ Importar CORS
const db = require('./configuraciones/conexionbd');
const configurarModelos = require('./configurarmodelos');

// Importar rutas
const rutasUsuarios = require('./rutas/rutaUsuarios');
const rutasRedeswifi = require('./rutas/rutaRedeswifi');
const rutasInventarioequipo = require('./rutas/rutaInventarioequipo');


// Conectar con la base de datos
db.authenticate()
    .then(async () => {
        console.log("✅ Conexión establecida con la base de datos.");
        configurarModelos();
    })
    .catch((error) => console.error("❌ Error de conexión:", error));

const app = express();

// ✅ Habilitar CORS para todas las solicitudes
app.use(cors({
    origin: 'http://localhost:3000', // Permite solo el frontend React en desarrollo
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Encabezados permitidos
}));

// Middleware para procesar JSON en solicitudes
app.use(express.json());

// Montar las rutas
app.use('/api/Usuarios', rutasUsuarios);
app.use('/api/redes_wifi', rutasRedeswifi);
app.use('/api/inventario_equipo', rutasInventarioequipo);


// Configurar el puerto y escuchar
const PORT = 4000;
app.set('port', PORT);
app.listen(PORT, () => {
    console.log(`🚀 Servidor iniciado en el puerto ${PORT}`);
});
