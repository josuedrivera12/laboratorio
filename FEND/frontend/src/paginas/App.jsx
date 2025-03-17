import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Menu from "./menu";
import Login from "./Login";
import Register from "./Register";
import WifiForm from "./redeswifi";
import Inventory from "./inventarioequipo";
import Reports from "./reportes";
import "./style.css";

const App = () => {
  return (
    <Router>
      <MainContent />
    </Router>
  );
};

const MainContent = () => {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ Se agregó useNavigate

  const showNavbar = location.pathname !== "/" && location.pathname !== "/register";

  // ✅ Función para cambiar de sección
  const handleSectionChange = (section) => {
    console.log(`Cambiando a la sección: ${section}`);
    if (section === "wifiForm") {
      navigate("/redeswifi");
    } else if (section === "inventory") {
      navigate("/inventarioequipo");
    } else if (section === "report") {
      navigate("/reportes");
    }
  };

  return (
    <>
      {showNavbar && <Menu onSectionChange={handleSectionChange} />}
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/menu" element={<Menu onSectionChange={handleSectionChange} />} />
          <Route path="/redeswifi" element={<WifiForm />} />
          <Route path="/inventarioequipo" element={<Inventory />} />
          <Route path="/reportes" element={<Reports />} />
        </Routes>
      </div>
    </>
  );
};

export default App;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
