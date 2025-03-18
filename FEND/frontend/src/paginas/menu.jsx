import { useNavigate, useLocation } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./style.css";
import LogoUnicah from "../imagenes/Icono_unicah.svg";
import Swal from 'sweetalert2';


export default function Menu({ onLogout }) {
    const navigate = useNavigate();
    const location = useLocation();

    if (location.pathname === "/" || location.pathname === "/register") return null;

    const getBackgroundClass = () => {
        switch (location.pathname) {
            case "/menu":
                return "fondo-menu";
            case "/redeswifi":
                return "fondo-redes";
            case "/inventarioequipo":
                return "fondo-inventario";
            case "/reportes":
                return "fondo-reportes";
            default:
                return "";
        }
    };

    const handleLogout = () => {
        Swal.fire({
            title: '¿Seguro que deseas salir?',
            text: 'Se cerrará tu sesión y regresarás a la pantalla de inicio.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, salir',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: 'success',
                    title: 'Sesión cerrada',
                    text: 'Has cerrado sesión correctamente.',
                    timer: 2000,
                    showConfirmButton: false
                });

                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }
        });
    };

    return (
        <div className={`page-container ${getBackgroundClass()}`}>
            <div className="sidebar">
                <div className="menu-header">
                    <img src={LogoUnicah} alt="Logo UNICAH" className="login-logo" />
                </div>
                <ul className="menu-list">
                    <li>
                        <button onClick={() => navigate("/redeswifi")} title="Redes Wi-Fi">
                            <i className="fas fa-wifi"></i>
                            <span>Redes Wi-Fi</span>
                        </button>
                    </li>
                    <li>
                        <button onClick={() => navigate("/inventarioequipo")} title="Inventario">
                            <i className="fas fa-server"></i>
                            <span>Inventario</span>
                        </button>
                    </li>
                    <li>
                        <button onClick={() => navigate("/reportes")} title="Reportes">
                            <i className="fas fa-file-alt"></i>
                            <span>Reportes</span>
                        </button>
                    </li>
                    <li>
                        <button onClick={() => navigate("/Perfil")} title="Perfil">
                            <i className="fas fa-user-circle"></i>
                            <span>Perfil</span>
                        </button>
                    </li>
                </ul>
                        <button className="logout-button" onClick={handleLogout} title="Cerrar Sesión">
                            <i className="fas fa-sign-out-alt"></i>
                            <span>Salir</span>
                        </button>
            </div>
        </div>
    );
}
