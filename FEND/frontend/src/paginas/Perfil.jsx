import { useState, useEffect } from "react";
import axios from "axios";
import { UsuarioGuardar, usuarioEditar, usuarioListar, usuarioEliminar } from "../config/Urls";
import "./style.css";

export default function UsuariosForm() {
    const [correo, setCorreo] = useState('');
    const [nombre, setNombre] = useState('');
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [cargo, setCargo] = useState('Administrador');
    const [usuarios, setUsuarios] = useState([]);
    const [editandoId, setEditandoId] = useState(null);

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const cargarUsuarios = async () => {
        try {
            const response = await axios.get(usuarioListar);
            setUsuarios(response.data);
        } catch (error) {
            console.error('Error cargando usuarios:', error);
        }
    };

    const limpiarCampos = () => {
        setCorreo('');
        setNombre('');
        setUsuario('');
        setContraseña('');
        setCargo('Administrador');
        setEditandoId(null);
    };

    const saveUsuario = async () => {
        if (!correo || !nombre || !usuario || (!editandoId && !contraseña)) {
            alert('Todos los campos son obligatorios');
            return;
        }

        const nuevoUsuario = { correo, nombre, usuario, contraseña, cargo };

        try {
            let response;
            if (editandoId !== null) {
                // Editar usuario existente
                response = await axios.put(`${usuarioEditar}/${editandoId}`, nuevoUsuario);
            } else {
                // Registrar nuevo usuario
                response = await axios.post(UsuarioGuardar, nuevoUsuario);
                limpiarCampos();
            }

            if (!response.data) throw new Error('Error en la operación');
            await cargarUsuarios();
            limpiarCampos();
        } catch (error) {
            console.error('Error guardando el usuario:', error);
            alert(error.response?.data?.mensaje || "Error al guardar el usuario");
        }
    };

    const deleteUsuario = async () => {
        if (!editandoId) {
            alert("Selecciona un usuario para eliminar.");
            return;
        }

        if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) {
            return;
        }

        try {
            const response = await axios.delete(`${usuarioEliminar}/${editandoId}`);
            if (!response.data) throw new Error("Error al eliminar");

            await cargarUsuarios();
            limpiarCampos();
        } catch (error) {
            console.error("Error eliminando el usuario:", error);
            alert("No se pudo eliminar el usuario");
        }
    };

    const handleRowClick = (usuario) => {
        setCorreo(usuario.correo);
        setNombre(usuario.nombre);
        setUsuario(usuario.usuario);
        setCargo(usuario.cargo);
        setEditandoId(usuario.id);
        setContraseña(''); // No mostramos la contraseña por seguridad
    };

    return (
        <div className="wifi-container">
        <h2 className="title">Registro de Usuarios</h2>

        <div className="card">
            <div className="form">
                <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="input" />
                <input type="email" placeholder="Correo Electrónico" value={correo} onChange={(e) => setCorreo(e.target.value)} className="input" />
                <input type="text" placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} className="input" />
                <input type="password" placeholder="Contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} className="input" disabled={editandoId !== null} />
                <select value={cargo} onChange={(e) => setCargo(e.target.value)} className="input">
                    <option value="Administrador">Administrador</option>
                    <option value="Usuario">Usuario</option>
                    <option value="Docente">Docente</option>
                </select>
            </div>

            <div className="button-group">
                <button onClick={saveUsuario} className="btn save">{editandoId ? "Actualizar" : "Guardar"}</button>
                <button onClick={deleteUsuario} className="btn delete">Eliminar</button>
            </div>
        </div>

        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        <th>Correo</th>
                        <th>Nombre</th>
                        <th>Usuario</th>
                        <th>Cargo</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id} onClick={() => handleRowClick(usuario)} className="editable-row">
                            <td>{usuario.correo}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.usuario}</td>
                            <td>{usuario.cargo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    );
}
