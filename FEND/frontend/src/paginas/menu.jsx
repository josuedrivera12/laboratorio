import { useNavigate, useLocation } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./style.css";
import LogoUnicah from "../imagenes/Icono_unicah.svg";

export default function Menu({ onLogout }) {
    const navigate = useNavigate();
    const location = useLocation();

    if (location.pathname === "/" || location.pathname === "/register") return null;

    // 🔹 Asigna la clase de fondo según la ruta actual
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
                </ul>
                <button className="logout-button" onClick={() => navigate("/")} title="Cerrar Sesión">
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Salir</span>
                </button>
            </div>
        </div>
    );
}
