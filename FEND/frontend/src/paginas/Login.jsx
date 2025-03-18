import React, { useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2"; 
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
<<<<<<< HEAD
        icon: 'warning',
        title: '⚠️ Campos obligatorios',
        text: 'Todos los campos son obligatorios.',
        confirmButtonColor: '#f39c12'
=======
        icon: "warning",
        title: "Campos obligatorios",
        text: "Por favor, llena todos los campos antes de continuar.",
        confirmButtonColor: "#3085d6",
>>>>>>> b95706b9dba11d944d95bfa62566111af37cb7e8
      });
      return;
    }

    try {
      const response = await Axios.post(LoginUrl, formData);
      console.log("Respuesta del servidor:", response.data);
<<<<<<< HEAD

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
=======
      
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
>>>>>>> b95706b9dba11d944d95bfa62566111af37cb7e8
      });
    }
  };


  return (
<<<<<<< HEAD
<div className="login-container">
=======
    <div className="login-container"> {/* Contenedor único para login */}
>>>>>>> b95706b9dba11d944d95bfa62566111af37cb7e8
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
