import { useState, useEffect } from "react";
import "./style.css";

export default function WifiForm() {
    const [nombre, setNombre] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [redes, setRedes] = useState([]);
    const [editandoId, setEditandoId] = useState(null);

    useEffect(() => {
        cargarRedes();
    }, []);

    const cargarRedes = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/redes_wifi/listar');
            const data = await response.json();
            setRedes(data);
        } catch (error) {
            console.error('Error cargando redes:', error);
        }
    };

    const limpiarCampos = () => {
        setNombre('');
        setContrasena('');
        setEditandoId(null);
    };

    const saveWifi = async () => {
        if (!nombre || !contrasena) {
            alert('Todos los campos son obligatorios');
            return;
        }

        const nuevaRed = { nombre, contrasena };

        try {
            let response;
            if (editandoId !== null) {
                response = await fetch(`http://localhost:4000/api/redes_wifi/editar/${editandoId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(nuevaRed)
                });

                if (!response.ok) throw new Error('Error al actualizar');
            } else {
                response = await fetch('http://localhost:4000/api/redes_wifi/guardar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(nuevaRed)
                });

                if (!response.ok) throw new Error('Error al guardar');
            }

            await cargarRedes();
            limpiarCampos();
        } catch (error) {
            console.error('Error guardando la red:', error);
        }
    };

    const deleteWifi = async () => {
        if (!editandoId) {
            alert("Selecciona un registro para eliminar.");
            return;
        }

        if (!window.confirm("¿Seguro que deseas eliminar esta red WiFi?")) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:4000/api/redes_wifi/eliminar/${editandoId}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error("Error al eliminar");

            await cargarRedes();
            limpiarCampos();
        } catch (error) {
            console.error("Error eliminando la red:", error);
        }
    };

    const handleRowClick = (red) => {
        setNombre(red.nombre);
        setContrasena(red.contrasena);
        setEditandoId(red.id);
    };

    return (
        <div className="wifi-container">
            <h2 className="title">Registro de Redes WiFi</h2>

            <div className="form">
                <input
                    type="text"
                    placeholder="Nombre de la red"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="input"
                />
                <input
                    type={editandoId ? "text" : "password"}
                    placeholder="Contraseña"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    className="input"
                />
            </div>

            <div className="button-group">
                <button onClick={saveWifi} className="btn save">
                    {editandoId ? "Actualizar" : "Guardar"}
                </button>
                <button onClick={deleteWifi} className="btn delete">Eliminar</button>
            </div>

            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Contraseña</th>
                        </tr>
                    </thead>
                    <tbody>
                        {redes.map((red) => (
                            <tr key={red.id} onClick={() => handleRowClick(red)} className="editable-row">
                                <td>{red.nombre}</td>
                                <td>{editandoId === red.id ? red.contrasena : "••••••"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
