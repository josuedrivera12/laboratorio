import React, { useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2"; 
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
      Swal.fire({
        icon: "warning",
        title: "Campos obligatorios",
        text: "Por favor, llena todos los campos antes de continuar.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    try {
      const response = await Axios.post(LoginUrl, formData);
      console.log("Respuesta del servidor:", response.data);
      
      Swal.fire({
        icon: "success",
        title: "Inicio de sesión exitoso",
        text: "Bienvenido, " + formData.usuario + "!",
        confirmButtonColor: "#28a745",
      }).then(() => {
        navigate("/inventory"); // Redirige después de la confirmación
      });

    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      
      Swal.fire({
        icon: "error",
        title: "Error en el inicio de sesión",
        text: "Usuario o contraseña incorrectos.",
        confirmButtonColor: "#dc3545",
      });
    }
  };

  return (
    <div className="login-container"> {/* Contenedor único para login */}
      <div className="login-box">
        <img src="/unicah.png" alt="Logo UNICAH" className="login-logos" />
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
