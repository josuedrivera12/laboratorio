import { useState, useEffect } from "react";
import "./style.css";  // 🔹 Importa los estilos

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
                    [value]: prev[value] < 254 ? prev[value] + 1 : 12 // Reset a 12 o 2 según la puerta de enlace
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
        if (!formData.asignada_a || !formData.service_tag) {
            alert("⚠️ Todos los campos obligatorios deben ser llenados");
            return;
        }
    
        try {
            let response;
            if (editandoId !== null) {
                console.log("Editando equipo con ID:", editandoId);
                response = await fetch(`http://localhost:4000/api/inventario_equipo/editar?id=${editandoId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                });
            } else {
                response = await fetch("http://localhost:4000/api/inventario_equipo/guardar", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                });
            }
    
            if (!response.ok) throw new Error("Error en la operación");
            await cargarEquipos();
            limpiarCampos();
        } catch (error) {
            console.error("Error guardando el equipo:", error);
        }
    };
    

    const deleteEquipo = async () => {
        if (!editandoId) {
            alert("Selecciona un registro para eliminar.");
            return;
        }

        if (!window.confirm("¿Seguro que deseas eliminar este equipo?")) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:4000/api/inventario_equipo/eliminar?id=${editandoId}`, {
                method: "DELETE"
            });

            if (!response.ok) throw new Error("Error al eliminar");

            await cargarEquipos();
            limpiarCampos();
        } catch (error) {
            console.error("Error eliminando el equipo:", error);
        }
    };


    

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
