import { useState, useEffect } from "react";
import axios from "axios";
import { UsuarioGuardar, usuarioEditar, usuarioListar, usuarioEliminar } from "../config/Urls";
import "./style.css";
import Swal from 'sweetalert2';


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
            Swal.fire({
                icon: 'error',
                title: '❌ Error',
                text: 'No se pudieron cargar los usuarios.',
                confirmButtonColor: '#d33'
            });
        }
    };
    
    const limpiarCampos = () => {
        setCorreo('');
        setNombre('');
        setUsuario('');
        setContraseña('');
        setCargo('Administrador');
        setEditandoId('');
    };
    
    const saveUsuario = async () => {
        if (!correo || !nombre || !usuario || (!editandoId && !contraseña)) {
            Swal.fire({
                icon: 'warning',
                title: '⚠️ Campos obligatorios',
                text: 'Todos los campos son obligatorios.',
                confirmButtonColor: '#f39c12'
            });
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
    
            Swal.fire({
                icon: 'success',
                title: '✅ Usuario guardado',
                text: 'El usuario se ha guardado correctamente.',
                timer: 2000,
                showConfirmButton: false
            });
    
        } catch (error) {
            console.error('Error guardando el usuario:', error);
    
            Swal.fire({
                icon: 'error',
                title: '❌ Error al guardar',
                text: error.response?.data?.mensaje || "No se pudo guardar el usuario.",
                confirmButtonColor: '#d33'
            });
        }
    };
    
    const deleteUsuario = async () => {
        if (!editandoId) {
            Swal.fire({
                icon: 'warning',
                title: '⚠️ Atención',
                text: 'Selecciona un usuario para eliminar.',
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
            const response = await axios.delete(`${usuarioEliminar}/${editandoId}`);
            if (!response.data) throw new Error("Error al eliminar");
    
            await cargarUsuarios();
            limpiarCampos();
    
            Swal.fire({
                icon: 'success',
                title: '✅ Usuario eliminado',
                text: 'El usuario ha sido eliminado correctamente.',
                timer: 2000,
                showConfirmButton: false
            });
    
        } catch (error) {
            console.error("Error eliminando el usuario:", error);
    
            Swal.fire({
                icon: 'error',
                title: '❌ Error',
                text: 'No se pudo eliminar el usuario.',
                confirmButtonColor: '#d33'
            });
        }
    };
    
    const handleRowClick = (usuario) => {
        setCorreo(usuario.correo);
        setNombre(usuario.nombre);
        setUsuario(usuario.usuario);
        setCargo(usuario.cargo);
        setEditandoId(usuario.id);
        setContraseña('');
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
