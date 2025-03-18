import { useState, useEffect } from "react";
<<<<<<< HEAD
import "./style.css";
import Swal from 'sweetalert2';

=======
import Swal from "sweetalert2"; 
import "./style.css";  // 🔹 Importa los estilos
>>>>>>> b95706b9dba11d944d95bfa62566111af37cb7e8

export default function InventarioEquipo() {
    const [formData, setFormData] = useState({
        asignada_a: "",
        service_tag: "",
        marca_cpu: "DELL",
        estado: "Bueno",
        no_inventario_monitor: "",
        marca_monitor: "DELL",
        tamano_monitor: "20",
        estado_monitor: "Bueno",
        no_inventario_mouse: "",
        marca_mouse: "DELL",
        estado_mouse: "Bueno",
        no_inventario_teclado: "",
        marca_teclado: "DELL",
        estado_teclado: "Bueno",
        observaciones: "",
        puertaenlace: "",
        ip_asignada: "",
        traslado: ""
    });

    const [equipos, setEquipos] = useState([]);
    const [editandoId, setEditandoId] = useState(null);
    const [ipCounter, setIpCounter] = useState({ "10.8.2.1": 12, "10.8.3.1": 2 });

    useEffect(() => {
        cargarEquipos();
    }, []);

    const cargarEquipos = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/inventario_equipo/listar");
            const data = await response.json();
            setEquipos(data);
        } catch (error) {
            console.error("Error cargando el inventario:", error);
        }
    };

    const limpiarCampos = () => {
        setFormData({
            asignada_a: "",
            service_tag: "",
            marca_cpu: "DELL",
            estado: "Bueno",
            no_inventario_monitor: "",
            marca_monitor: "DELL",
            tamano_monitor: "20",
            estado_monitor: "Bueno",
            no_inventario_mouse: "",
            marca_mouse: "DELL",
            estado_mouse: "Bueno",
            no_inventario_teclado: "",
            marca_teclado: "DELL",
            estado_teclado: "Bueno",
            observaciones: "",
            puertaenlace: "",
            ip_asignada: "",
            traslado: ""
        });
        setEditandoId(null);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        const { name, value } = e.target;
        let updatedData = { ...formData, [name]: value };
        
        if (name === "puertaenlace") {
            if (value === "10.8.2.1" || value === "10.8.3.1") {
                const newIp = `10.8.${value.split('.')[2]}.${ipCounter[value]}`;
                setIpCounter((prev) => ({
                    ...prev,
                    [value]: prev[value] < 254 ? prev[value] + 1 : 12 
                }));
                updatedData.ip_asignada = newIp;
            } else {
                updatedData.ip_asignada = "";
            }
        }

        setFormData(updatedData);
    };

    const handleRowClick = (equipo) => {
        setFormData({ ...equipo });
        setEditandoId(equipo.id);
    };

    const saveEquipo = async () => {
<<<<<<< HEAD
        console.log("📦 Enviando datos al backend:", JSON.stringify(formData, null, 2));
    
=======
        if (!formData.asignada_a || !formData.service_tag) {
            Swal.fire({
                icon: "warning",
                title: "Campos obligatorios",
                text: "Por favor, llena todos los campos antes de continuar.",
                confirmButtonColor: "#3085d6",
            });
            return;
        }

>>>>>>> b95706b9dba11d944d95bfa62566111af37cb7e8
        try {
            let response = await fetch("http://localhost:4000/api/inventario_equipo/guardar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
    
            let result = await response.json();
            console.log("📥 Respuesta del servidor:", result);
    
            if (!response.ok) {
                console.error("❌ Error detallado del backend:", result.errors);
    
                Swal.fire({
                    icon: 'error',
                    title: 'Error al guardar',
                    html: result.errors.map(err => `<p>⚠️ ${err.msg}</p>`).join(""),
                    confirmButtonColor: '#d33',
                    footer: 'Por favor revisa los datos ingresados'
                });
    
                return;
            }
<<<<<<< HEAD
    
            Swal.fire({
                icon: 'success',
                title: '¡Equipo guardado!',
                text: result.mensaje,
                timer: 2000,
                showConfirmButton: false
            });
    
            await cargarEquipos();
            limpiarCampos();
        } catch (error) {
            console.error("❌ Error guardando el equipo:", error);
    
            Swal.fire({
                icon: 'error',
                title: 'Error inesperado',
                text: error.message,
                confirmButtonColor: '#d33'
            });
=======

            if (!response.ok) throw new Error("Error en la operación");
            
            Swal.fire({
                icon: "success",
                title: "Operación exitosa",
                text: editandoId !== null ? "Equipo actualizado con éxito" : "Equipo guardado correctamente",
                confirmButtonColor: "#28a745",
            });

            await cargarEquipos();
            limpiarCampos();
        } catch (error) {
            console.error("Error guardando el equipo:", error);
            Swal.fire({
                icon: "error",
                title: "Error al guardar",
                text: "Hubo un problema al registrar el equipo.",
                confirmButtonColor: "#dc3545",
            });
        }
    };

    const deleteEquipo = async () => {
        if (!editandoId) {
            Swal.fire({
                icon: "warning",
                title: "Selecciona un equipo",
                text: "Debes seleccionar un equipo antes de eliminarlo.",
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
                    const response = await fetch(`http://localhost:4000/api/inventario_equipo/eliminar?id=${editandoId}`, {
                        method: "DELETE"
                    });

                    if (!response.ok) throw new Error("Error al eliminar");

                    Swal.fire({
                        icon: "success",
                        title: "Equipo eliminado",
                        text: "El equipo ha sido eliminado correctamente.",
                        confirmButtonColor: "#28a745",
                    });

                    await cargarEquipos();
                    limpiarCampos();
                } catch (error) {
                    console.error("Error eliminando el equipo:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Error al eliminar",
                        text: "No se pudo eliminar el equipo.",
                        confirmButtonColor: "#dc3545",
                    });
                }
            }
        });
    };
<<<<<<< HEAD
    
    


const deleteEquipo = async () => {
    if (!editandoId) {
        Swal.fire({
            icon: 'warning',
            title: '⚠️ Atención',
            text: 'Selecciona un registro para eliminar.',
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
        const response = await fetch(`http://localhost:4000/api/inventario_equipo/eliminar?id=${editandoId}`, {
            method: "DELETE"
        });

        if (!response.ok) throw new Error("Error al eliminar");

        await cargarEquipos();
        limpiarCampos();

        Swal.fire({
            icon: 'success',
            title: '¡Eliminado!',
            text: 'El equipo ha sido eliminado correctamente.',
            timer: 2000,
            showConfirmButton: false
        });

    } catch (error) {
        console.error("Error eliminando el equipo:", error);

        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al eliminar el equipo.',
            confirmButtonColor: '#d33'
        });
    }
};


=======
>>>>>>> b95706b9dba11d944d95bfa62566111af37cb7e8

    return (
        <div className="inventario-container">  
            <h2 className="title">Inventario de Equipos</h2>

        <fieldset className="section">
            <legend>Lugar</legend>
            <div className="flex-container">
                <input type="text" name="asignada_a" placeholder="Asignada a" value={formData.asignada_a} onChange={handleChange} className="input" />
            </div>
        </fieldset>

        <fieldset className="section">
            <legend>Case</legend>
            <div className="flex-container">
                <input type="text" name="service_tag" placeholder="Service Tag" value={formData.service_tag} onChange={handleChange} className="input" />
                <select name="marca_cpu" value={formData.marca_cpu} onChange={handleChange} className="input">
                    <option value="DELL">DELL</option>
                    <option value="HP">HP</option>
                </select>
                <select name="estado" value={formData.estado} onChange={handleChange} className="input">
                    <option value="Bueno">Bueno</option>
                    <option value="Malo">Malo</option>
                </select>
            </div>
        </fieldset>

        <fieldset className="section">
            <legend>Monitor</legend>
            <div className="flex-container">
                <input type="text" name="no_inventario_monitor" placeholder="No. Inventario" value={formData.no_inventario_monitor} onChange={handleChange} className="input" />
                <select name="marca_monitor" value={formData.marca_monitor} onChange={handleChange} className="input">
                    <option value="DELL">DELL</option>
                    <option value="HP">HP</option>
                </select>
                <select name="tamano_monitor" value={formData.tamano_monitor} onChange={handleChange} className="input">
                    <option value="20">20"</option>
                    <option value="27">27"</option>
                    <option value="29">29"</option>
                </select>
                <select name="estado_monitor" value={formData.estado_monitor} onChange={handleChange} className="input">
                    <option value="Bueno">Bueno</option>
                    <option value="Malo">Malo</option>
                </select>
            </div>
        </fieldset>

        <fieldset className="section">
            <legend>Mouse</legend>
            <div className="flex-container">
                <input type="text" name="no_inventario_mouse" placeholder="No. Inventario" value={formData.no_inventario_mouse} onChange={handleChange} className="input" />
                <select name="marca_mouse" value={formData.marca_mouse} onChange={handleChange} className="input">
                    <option value="DELL">DELL</option>
                    <option value="HP">HP</option>
                </select>
                <select name="estado_mouse" value={formData.estado_mouse} onChange={handleChange} className="input">
                    <option value="Bueno">Bueno</option>
                    <option value="Malo">Malo</option>
                </select>
            </div>
        </fieldset>

                    <fieldset className="section">
            <legend>Teclado</legend>
            <div className="flex-container">
                <input type="text" name="no_inventario_teclado" placeholder="No. Inventario" value={formData.no_inventario_teclado} onChange={handleChange} className="input" />
                <select name="marca_teclado" value={formData.marca_teclado} onChange={handleChange} className="input">
                    <option value="DELL">DELL</option>
                    <option value="HP">HP</option>
                </select>
                <select name="estado_teclado" value={formData.estado_teclado} onChange={handleChange} className="input">
                    <option value="Bueno">Bueno</option>
                    <option value="Malo">Malo</option>
                </select>
            </div>
        </fieldset>

        <fieldset className="section">
            <legend>Redes</legend>
            <div className="flex-container">
                <input type="text" name="puertaenlace" placeholder="Puerta de enlace" value={formData.puertaenlace} onChange={handleChange} className="input" />
                <input type="text" name="ip_asignada" placeholder="IP Asignada" value={formData.ip_asignada} onChange={handleChange} className="input" />
                <input type="text" name="traslado" placeholder="Traslado" value={formData.traslado} onChange={handleChange} className="input" />
            </div>
        </fieldset>

        <fieldset className="section">
            <legend>Observaciones</legend>
            <div className="textarea-container">
                <textarea name="observaciones" placeholder="Observaciones" value={formData.observaciones} onChange={handleChange} className="input textarea"></textarea>
            </div>
        </fieldset>

            <div className="button-group">
                <button onClick={saveEquipo} className="btn save">
                    {editandoId ? "Actualizar" : "Guardar"}
                </button>
                <button onClick={deleteEquipo} className="btn delete">Eliminar</button>
            </div>
            <div className="table-container">
    <table className="table">
        <thead>
            <tr>
                <th>Asignada a</th>
                <th>Service Tag</th>
                <th>Marca CPU</th>
                <th>Estado CPU</th>
                <th>No. Inv. Monitor</th>
                <th>Marca Monitor</th>
                <th>Tamaño Monitor</th>
                <th>Estado Monitor</th>
                <th>No. Inv. Mouse</th>
                <th>Marca Mouse</th>
                <th>Estado Mouse</th>
                <th>No. Inv. Teclado</th>
                <th>Marca Teclado</th>
                <th>Estado Teclado</th>
                <th>Puerta de enlace</th>
                <th>IP Asignada</th>
                <th>Traslado</th>
                <th>Observaciones</th>
            </tr>
        </thead>
        <tbody>
            {equipos.map((equipo) => (
                <tr key={equipo.id} onClick={() => handleRowClick(equipo)} className="editable-row">
                    <td>{equipo.asignada_a}</td>
                    <td>{equipo.service_tag}</td>
                    <td>{equipo.marca_cpu}</td>
                    <td>{equipo.estado}</td>
                    <td>{equipo.no_inventario_monitor}</td>
                    <td>{equipo.marca_monitor}</td>
                    <td>{equipo.tamano_monitor}"</td>
                    <td>{equipo.estado_monitor}</td>
                    <td>{equipo.no_inventario_mouse}</td>
                    <td>{equipo.marca_mouse}</td>
                    <td>{equipo.estado_mouse}</td>
                    <td>{equipo.no_inventario_teclado}</td>
                    <td>{equipo.marca_teclado}</td>
                    <td>{equipo.estado_teclado}</td>
                    <td>{equipo.puertaenlace}</td>
                    <td>{equipo.ip_asignada}</td>
                    <td>{equipo.traslado}</td>
                    <td>{equipo.observaciones}</td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

        </div>
    );
}
