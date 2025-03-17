const { Op } = require("sequelize");
const Usuarios = require("../modelos/modeloUsuarios");

// ✅ Función para listar usuarios
exports.listar = async (req, res) => {
    try {
        const usuarios = await Usuarios.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error("❌ Error al listar usuarios:", error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

// ✅ Función para iniciar sesión
exports.loginUsuario = async (req, res) => {
    const { usuario, contraseña } = req.body;

    try {
        const usuarioEncontrado = await Usuarios.findOne({ where: { usuario } });

        if (!usuarioEncontrado) {
            return res.status(400).json({ mensaje: "❌ Usuario no encontrado" });
        }

        if (usuarioEncontrado.contraseña !== contraseña) {
            return res.status(400).json({ mensaje: "❌ Contraseña incorrecta" });
        }

        res.status(200).json({ mensaje: "✅ Inicio de sesión exitoso", usuario: usuarioEncontrado });
    } catch (error) {
        console.error("❌ Error en el login:", error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

// ✅ Función para registrar usuario
exports.guardarUsuario = async (req, res) => {
    const { correo, usuario, contraseña, cargo } = req.body;

    try {
        const usuarioExistente = await Usuarios.findOne({ where: { [Op.or]: [{ correo }, { usuario }] } });
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: "⚠️ El usuario o correo ya están en uso" });
        }

        const nuevoUsuario = await Usuarios.create({ correo, usuario, contraseña, cargo });
        res.status(201).json({ mensaje: "✅ Usuario registrado con éxito", usuario: nuevoUsuario });

    } catch (error) {
        console.error("❌ Error en el registro:", error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};