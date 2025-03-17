import React, { useState } from "react";
import Axios from "axios";
import "./style.css";
import { Login as LoginUrl } from "../config/Urls";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ usuario: "", contraseña: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.usuario || !formData.contraseña) {
      alert("⚠️ Todos los campos son obligatorios.");
      return;
    }

    try {
      const response = await Axios.post(LoginUrl, formData);
      console.log("✅ Respuesta del servidor:", response.data);
      alert("✅ Inicio de sesión exitoso");
      // Redirigir a la página de Navbar (puede ser Inventario u otra sección por defecto)
      navigate("/inventory");
    } catch (error) {
      console.error("❌ Error en el inicio de sesión:", error);
      alert("❌ Usuario o contraseña incorrectos.");
    }
  };

  return (
<div className="login-container"> {/* 🔹 Contenedor único para login */}
      <div className="login-box">
        <img src="/unicah.png" alt="Logo UNICAH" className="login-logo" />
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="usuario"
            placeholder="Usuario"
            value={formData.usuario}
            onChange={handleChange}
            className="login-input"
          />
          <input
            type="password"
            name="contraseña"
            placeholder="Contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            className="login-input"
          />
          <button type="submit" className="login-btn">Ingresar</button>
        </form>
        <p className="register-link">
          ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
        </p>
      </div>
    </div>
  );
};

export default Login;