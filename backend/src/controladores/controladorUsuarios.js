const { Op } = require("sequelize");
const Usuarios = require("../modelos/modeloUsuarios");

// Función para listar usuarios
exports.listar = async (req, res) => {
    try {
        const usuarios = await Usuarios.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error("Error al listar usuarios:", error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

// Función para iniciar sesión
exports.loginUsuario = async (req, res) => {
    const { usuario, contraseña } = req.body;

    try {
        const usuarioEncontrado = await Usuarios.findOne({ where: { usuario } });

        if (!usuarioEncontrado) {
            return res.status(400).json({ mensaje: "Usuario no encontrado" });
        }

        if (usuarioEncontrado.contraseña !== contraseña) {
            return res.status(400).json({ mensaje: "Contraseña incorrecta" });
        }

        res.status(200).json({ mensaje: "Inicio de sesión exitoso", usuario: usuarioEncontrado });
    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

// Función para registrar usuario
exports.guardarUsuario = async (req, res) => {
    const { correo, nombre, usuario, contraseña, cargo } = req.body;

    try {
        console.log("📥 Datos recibidos en el backend:", req.body); // 🔍 Imprimir datos recibidos

        // Verificar si ya existe el usuario o el correo
        const usuarioExistente = await Usuarios.findOne({ where: { [Op.or]: [{ correo }, { usuario }] } });
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: "El usuario o correo ya están en uso" });
        }

        // Guardar usuario
        const nuevoUsuario = await Usuarios.create({ correo, nombre, usuario, contraseña, cargo });
        res.status(201).json({ mensaje: "✅ Usuario registrado con éxito", usuario: nuevoUsuario });

    } catch (error) {
        console.error("❌ ERROR en el registro:", error);
        res.status(500).json({
            mensaje: "Error en el servidor",
            error: error.message,
            stack: error.stack, // 🔥 Captura la pila de errores
            raw: JSON.stringify(error, null, 2) // 🔥 Captura el error en JSON
        });
    }
};



// Editar usuario
exports.editarUsuario = async (req, res) => {
    const { id } = req.params;
    const { correo, nombre, usuario, contraseña, cargo } = req.body;
    try {
        const usuarioExistente = await Usuarios.findByPk(id);
        if (!usuarioExistente) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        await usuarioExistente.update({ correo, nombre, usuario, contraseña, cargo });
        res.status(200).json({ mensaje: "Usuario actualizado con éxito", usuario: usuarioExistente });
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

// Eliminar usuario
exports.eliminarUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const usuarioExistente = await Usuarios.findByPk(id);
        if (!usuarioExistente) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        await usuarioExistente.destroy();
        res.status(200).json({ mensaje: "Usuario eliminado con éxito" });
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};