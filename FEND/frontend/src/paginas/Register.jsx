import React, { useState } from "react";
import "./style.css";
import Axios from "axios";
import Swal from 'sweetalert2';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    usuario: "",
    contraseña: "",
    cargo: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("📥 Datos enviados al backend:", JSON.stringify(formData, null, 2)); // 🔍 Imprimir los datos estructurados

    // 🔹 Validaciones antes de enviar los datos
    if (!formData.nombre || !formData.correo || !formData.usuario || !formData.contraseña || !formData.cargo) {
        Swal.fire({
            icon: "warning",
            title: "⚠️ Campos obligatorios",
            text: "Todos los campos son obligatorios.",
            confirmButtonColor: "#f39c12"
        });
        return;
    }

    if (formData.contraseña.length < 6) {
        Swal.fire({
            icon: "warning",
            title: "⚠️ Contraseña inválida",
            text: "La contraseña debe tener al menos 6 caracteres.",
            confirmButtonColor: "#f39c12"
        });
        return;
    }

    if (!["Administrador", "Usuario", "Docente"].includes(formData.cargo)) {
        Swal.fire({
            icon: "warning",
            title: "⚠️ Cargo inválido",
            text: "El cargo debe ser Administrador, Usuario o Docente.",
            confirmButtonColor: "#f39c12"
        });
        return;
    }

    try {
        const response = await Axios.post("http://localhost:4000/api/Usuarios/guardar", formData, {
            headers: { "Content-Type": "application/json" } // 🔥 Asegurar que se envían como JSON
        });

        console.log("✅ Respuesta del servidor:", response.data);

        Swal.fire({
            icon: "success",
            title: "✅ Registro exitoso",
            text: response.data.mensaje,
            timer: 2000,
            showConfirmButton: false
        });

        setFormData({ nombre: "", correo: "", usuario: "", contraseña: "", cargo: "" });
    } catch (error) {
        console.error("❌ Error al registrar el usuario:", error);
        console.log("📥 Respuesta del backend:", error.response?.data); // 🔍 Imprimir respuesta del backend

        let errorMsg = "Error al registrar el usuario.";
        if (error.response?.data?.mensaje) {
            errorMsg = error.response.data.mensaje;
        }

        Swal.fire({
            icon: "error",
            title: "❌ Registro fallido",
            text: errorMsg,
            confirmButtonColor: "#d33"
        });
    }

  };

  return (
    <div className="contenedor-registro">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
      <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} />
        <input type="email" name="correo" placeholder="Correo Electrónico" value={formData.correo} onChange={handleChange} />
        <input type="text" name="usuario" placeholder="Usuario" value={formData.usuario} onChange={handleChange} />
        <input type="password" name="contraseña" placeholder="Contraseña" value={formData.contraseña} onChange={handleChange} />
        <input type="text" name="cargo" placeholder="Cargo" value={formData.cargo} onChange={handleChange} />
        <button type="submit">Registrar</button>
      </form>
      <p>¿Ya tienes cuenta? <a href="/">Inicia sesión</a></p>
    </div>
  );
};

export default Register;