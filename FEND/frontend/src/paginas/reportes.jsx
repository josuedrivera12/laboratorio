import Swal from 'sweetalert2';
import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 

export default function Reportes() {
    const [equipos, setEquipos] = useState([]);
    const [redes, setRedes] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const resEquipos = await fetch("http://localhost:4000/api/inventario_equipo/listar");
                const dataEquipos = await resEquipos.json();
                setEquipos(dataEquipos);

                const resRedes = await fetch("http://localhost:4000/api/redes_wifi/listar");
                const dataRedes = await resRedes.json();
                setRedes(dataRedes);

                setCargando(false);
            } catch (error) {
                console.error("Error al obtener datos:", error);
                setCargando(false);
                Swal.fire({
                    icon: 'error',
                    title: '❌ Error',
                    text: 'No se pudieron obtener los datos.',
                    confirmButtonColor: '#d33'
                });
            }
        }
        fetchData();
    }, []);

    // 🔹 Función para generar el Reporte de Equipos
    const generateInventoryReport = () => {
        if (cargando) {
            Swal.fire({
                icon: 'warning',
                title: '⚠️ Datos en proceso',
                text: 'Los datos aún se están cargando. Intenta de nuevo en unos segundos.',
                confirmButtonColor: '#f39c12'
            });
            return;
        }
        if (!equipos || equipos.length === 0) {
            Swal.fire({
                icon: 'info',
                title: 'ℹ️ No hay datos',
                text: 'No hay datos de equipos para generar el reporte.',
                confirmButtonColor: '#3085d6'
            });
            return;
        }

        const doc = new jsPDF({ orientation: "landscape", format: "legal" });
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        const addHeader = (pageNumber) => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(16);
            doc.text("UNIVERSIDAD CATÓLICA DE HONDURAS", pageWidth / 2, 15, { align: "center" });
            doc.setFontSize(14);
            doc.text("NUESTRA SEÑORA REINA DE LA PAZ", pageWidth / 2, 25, { align: "center" });
            doc.text("CAMPUS JESÚS SACRAMENTADO - ANEXO COMAYAGUA", pageWidth / 2, 35, { align: "center" });
            doc.setFontSize(18);
            doc.text("REPORTE DE EQUIPOS DE LABORATORIO DE CÓMPUTO", pageWidth / 2, 50, { align: "center" });
        };

        addHeader(1);

        const columns = [
            "Asignada a", "Service Tag", "Marca CPU", "Estado",
            "Inv. Monitor", "Marca Monitor", "Estado Monitor",
            "Inv. Mouse", "Estado Mouse",
            "Inv. Teclado", "Estado Teclado",
            "IP Asignada", "Traslado", "Observaciones"
        ];

        const rows = equipos.map((equipo) => [
            equipo.asignada_a || "-",
            equipo.service_tag || "-",
            equipo.marca_cpu || "-",
            equipo.estado || "-",
            equipo.no_inventario_monitor || "-",
            equipo.marca_monitor || "-",
            equipo.estado_monitor || "-",
            equipo.no_inventario_mouse || "-",
            equipo.estado_mouse || "-",
            equipo.no_inventario_teclado || "-",
            equipo.estado_teclado || "-",
            equipo.ip_asignada || "-",
            equipo.traslado || "-",
            equipo.observaciones || "-"
        ]);

        autoTable(doc, { 
            startY: 60,
            head: [columns], 
            body: rows,
            theme: "grid",
            styles: { fontSize: 5, cellPadding: 4, valign: "middle" },
            headStyles: { fillColor: [0, 76, 153], textColor: 255, fontStyle: "bold", halign: "center" }, 
            alternateRowStyles: { fillColor: [240, 248, 255] }, 
            margin: { left: 10, right: 10 }
        });

        doc.save("Reporte_Equipos.pdf");

        Swal.fire({
            icon: 'success',
            title: '✅ Reporte generado',
            text: 'El reporte de equipos se ha descargado correctamente.',
            timer: 2000,
            showConfirmButton: false
        });
    };

    // 🔹 Función para generar el Reporte de Redes WiFi
    const generateWifiReport = () => {
        if (cargando) {
            Swal.fire({
                icon: 'warning',
                title: '⚠️ Datos en proceso',
                text: 'Los datos aún se están cargando. Intenta de nuevo en unos segundos.',
                confirmButtonColor: '#f39c12'
            });
            return;
        }
        if (!redes || redes.length === 0) {
            Swal.fire({
                icon: 'info',
                title: 'ℹ️ No hay datos',
                text: 'No hay datos de redes WiFi para generar el reporte.',
                confirmButtonColor: '#3085d6'
            });
            return;
        }

        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();

        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("UNIVERSIDAD CATÓLICA DE HONDURAS", pageWidth / 2, 15, { align: "center" });
        doc.setFontSize(14);
        doc.text("NUESTRA SEÑORA REINA DE LA PAZ", pageWidth / 2, 25, { align: "center" });
        doc.text("CAMPUS JESÚS SACRAMENTADO - ANEXO COMAYAGUA", pageWidth / 2, 35, { align: "center" });
        doc.text("REPORTE DE REDES WIFI", pageWidth / 2, 50, { align: "center" });

        const columns = ["Nombre", "Contraseña"];
        const rows = redes.map((red) => [red.nombre || "-", red.contrasena || "-"]);

        autoTable(doc, { 
            startY: 60,
            head: [columns], 
            body: rows,
            theme: "striped",
            styles: { fontSize: 10, cellPadding: 2 },
            headStyles: { fillColor: [0, 76, 153], textColor: 255, fontStyle: "bold" }
        });

        doc.save("Reporte_WiFi.pdf");

        Swal.fire({
            icon: 'success',
            title: '✅ Reporte generado',
            text: 'El reporte de redes WiFi se ha descargado correctamente.',
            timer: 2000,
            showConfirmButton: false
        });
    };

    return (
        <div className="report-container">
            <h2 className="report-title">Generar Reportes</h2>
            <p className="report-description">Descarga reportes detallados del inventario de equipos y redes WiFi.</p>
    
            <div className="report-buttons">
                <button className="btn report-btn equipos-btn" onClick={generateInventoryReport} disabled={cargando}>
                    {cargando ? "Generando..." : "Reporte de Equipos"}
                </button>
                <button className="btn report-btn wifi-btn" onClick={generateWifiReport} disabled={cargando}>
                    {cargando ? "Generando..." : "Reporte de Redes WiFi"}
                </button>
            </div>
        </div>
    );  
}
