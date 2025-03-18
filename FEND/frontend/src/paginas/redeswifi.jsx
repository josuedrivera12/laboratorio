import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { wifiGuardar, wifiEditar, wifiListar, wifiEliminar } from "../config/Urls";
import "./style.css";
import Swal from 'sweetalert2';

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
            const response = await fetch(wifiListar);
            const data = await response.json();
            setRedes(data);
        } catch (error) {
            console.error('Error cargando redes:', error);
            Swal.fire({
                icon: 'error',
                title: '❌ Error',
                text: 'No se pudieron cargar las redes WiFi.',
                confirmButtonColor: '#d33'
            });
        }
    };
    
    const limpiarCampos = () => {
        setNombre('');
        setContrasena('');
        setEditandoId(null);
    };
    
    const saveWifi = async () => {
        if (!nombre || !contrasena) {
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
    
        const nuevaRed = { nombre, contrasena };
    
        try {
            let response;
            if (editandoId !== null) {
                response = await fetch(`${wifiEditar}?id=${editandoId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(nuevaRed)
                });
            } else {
                response = await fetch(wifiGuardar, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(nuevaRed)
                });
            }
    
            if (!response.ok) throw new Error('Error al guardar/actualizar la red');
<<<<<<< HEAD
    
=======

            Swal.fire({
                icon: "success",
                title: editandoId ? "Red WiFi actualizada" : "Red WiFi guardada",
                text: "La red WiFi se ha guardado correctamente.",
                confirmButtonColor: "#28a745",
            });

>>>>>>> b95706b9dba11d944d95bfa62566111af37cb7e8
            await cargarRedes();
            limpiarCampos();
    
            Swal.fire({
                icon: 'success',
                title: '✅ Red guardada',
                text: 'La red WiFi se ha guardado correctamente.',
                timer: 2000,
                showConfirmButton: false
            });
    
        } catch (error) {
            console.error('Error guardando la red:', error);
<<<<<<< HEAD
    
            Swal.fire({
                icon: 'error',
                title: '❌ Error al guardar',
                text: 'No se pudo guardar la red WiFi.',
                confirmButtonColor: '#d33'
=======
            Swal.fire({
                icon: "error",
                title: "Error al guardar",
                text: "Hubo un problema al registrar la red WiFi.",
                confirmButtonColor: "#dc3545",
>>>>>>> b95706b9dba11d944d95bfa62566111af37cb7e8
            });
        }
    };
    
    const deleteWifi = async () => {
        if (!editandoId) {
            Swal.fire({
<<<<<<< HEAD
                icon: 'warning',
                title: '⚠️ Atención',
                text: 'Selecciona una red para eliminar.',
                confirmButtonColor: '#f39c12'
            });
            return;
        }
    
        const confirmacion = await Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no se puede deshacer.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });
    
        if (!confirmacion.isConfirmed) return;
    
        try {
            const response = await fetch(`${wifiEliminar}?id=${editandoId}`, {
                method: 'DELETE'
            });
    
            if (!response.ok) throw new Error("Error al eliminar");
    
            await cargarRedes();
            limpiarCampos();
    
            Swal.fire({
                icon: 'success',
                title: '✅ Red eliminada',
                text: 'La red WiFi ha sido eliminada correctamente.',
                timer: 2000,
                showConfirmButton: false
            });
    
        } catch (error) {
            console.error("Error eliminando la red:", error);
    
            Swal.fire({
                icon: 'error',
                title: '❌ Error',
                text: 'No se pudo eliminar la red WiFi.',
                confirmButtonColor: '#d33'
            });
=======
                icon: "warning",
                title: "Selecciona una red",
                text: "Debes seleccionar una red antes de eliminarla.",
                confirmButtonColor: "#3085d6",
            });
            return;
>>>>>>> b95706b9dba11d944d95bfa62566111af37cb7e8
        }

        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`${wifiEliminar}?id=${editandoId}`, {
                        method: 'DELETE'
                    });

                    if (!response.ok) throw new Error("Error al eliminar");

                    Swal.fire({
                        icon: "success",
                        title: "Red eliminada",
                        text: "La red WiFi ha sido eliminada correctamente.",
                        confirmButtonColor: "#28a745",
                    });

                    await cargarRedes();
                    limpiarCampos();
                } catch (error) {
                    console.error("Error eliminando la red:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Error al eliminar",
                        text: "No se pudo eliminar la red WiFi.",
                        confirmButtonColor: "#dc3545",
                    });
                }
            }
        });
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
