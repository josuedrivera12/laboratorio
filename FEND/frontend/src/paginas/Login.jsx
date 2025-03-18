import React, { useState } from "react";
import Axios from "axios";
import "./style.css";
import { Login as LoginUrl } from "../config/Urls";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


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
        icon: 'warning',
        title: '⚠️ Campos obligatorios',
        text: 'Todos los campos son obligatorios.',
        confirmButtonColor: '#f39c12'
      });
      return;
    }

    try {
      const response = await Axios.post(LoginUrl, formData);
      console.log("Respuesta del servidor:", response.data);

      Swal.fire({
        icon: 'success',
        title: '✅ Inicio de sesión exitoso',
        text: 'Redirigiendo...',
        timer: 2000,
        showConfirmButton: false
      });

      setTimeout(() => {
        navigate("/inventory");
      }, 2000);

    } catch (error) {
      console.error("Error en el inicio de sesión:", error);

      Swal.fire({
        icon: 'error',
        title: '❌ Error de autenticación',
        text: 'Usuario o contraseña incorrectos.',
        confirmButtonColor: '#d33'
      });
    }
  };


  return (
<div className="login-container">
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