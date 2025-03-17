import React, { useState } from "react";
import "./style.css";
//import { UsuarioGuardar } from "../config/Urls";
import Axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    usuario: "",
    contraseña: "",
    cargo: "",
  });

  //const [usuarios, setUsuarios] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Datos enviados:", formData); // 🔍 Verifica los datos antes de enviarlos

    if (!formData.correo || !formData.usuario || !formData.contraseña || !formData.cargo) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    try {
        const response = await Axios.post("http://localhost:4000/api/Usuarios/guardar", formData);
        console.log("Respuesta del servidor:", response.data);
        alert(response.data.mensaje);
        
        setFormData({ nombre: "", correo: "", usuario: "", contraseña: "", cargo: "" });
    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        alert("Error al registrar el usuario. Revisa la consola para más detalles.");
    }
};


  return (
    <div className="container">
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