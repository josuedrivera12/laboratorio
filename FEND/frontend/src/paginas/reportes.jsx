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
            }
        }
        fetchData();
    }, []);

    // 🔹 Función para generar el Reporte de Equipos
    const generateInventoryReport = () => {
        if (cargando) {
            alert("Los datos aún se están cargando. Intenta de nuevo en unos segundos.");
            return;
        }
        if (!equipos || equipos.length === 0) {
            alert("No hay datos de equipos para generar el reporte.");
            return;
        }

        const doc = new jsPDF({ orientation: "landscape", format: "legal" });
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        const addHeader = (pageNumber) => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(16);
            doc.setTextColor(0, 0, 0); // Color de texto negro
            doc.text("UNIVERSIDAD CATÓLICA DE HONDURAS", pageWidth / 2, 15, { align: "center" });
            doc.setFontSize(14);
            doc.text("NUESTRA SEÑORA REINA DE LA PAZ", pageWidth / 2, 25, { align: "center" });
            doc.text("CAMPUS JESÚS SACRAMENTADO - COMAYAGUA", pageWidth / 2, 35, { align: "center" });
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
            columnStyles: {
                0: { cellWidth: 30 },
                1: { cellWidth: 30 },
                2: { cellWidth: 25 },
                3: { cellWidth: 20 },
                4: { cellWidth: 30 },
                5: { cellWidth: 30 },
                6: { cellWidth: 15 },
                7: { cellWidth: 20 },
                8: { cellWidth: 25 },
                9: { cellWidth: 25 },
                10: { cellWidth: 20 },
                11: { cellWidth: 25 },
                12: { cellWidth: 25 },
                13: { cellWidth: 20 },
                14: { cellWidth: 30 },
                15: { cellWidth: 25 },
                16: { cellWidth: 40 },
            },
            margin: { left: 10, right: 10 },
            didDrawPage: (data) => {
                let pageNumber = doc.internal.getNumberOfPages();
                doc.setFontSize(10);
                doc.text(`Generado el: ${new Date().toLocaleString()}`, 14, pageHeight - 10);
                doc.text(`Página ${pageNumber}`, pageWidth - 10, pageHeight - 15);
                if (pageNumber > 2) addHeader(pageNumber);
            }
        });

        doc.save("Reporte_Equipos.pdf");

    };

    // 🔹 Función para generar el Reporte de Redes WiFi
    const generateWifiReport = () => {
        if (cargando) {
            alert("Los datos aún se están cargando. Intenta de nuevo en unos segundos.");
            return;
        }
        if (!redes || redes.length === 0) {
            alert("No hay datos de redes WiFi para generar el reporte.");
            return;
        }

        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();

        // 🔹 Encabezado Institucional
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("UNIVERSIDAD CATOLICA DE HONDURAS", pageWidth / 2, 15, { align: "center" });
        doc.text("NUESTRA SEÑORA REINA DE LA PAZ", pageWidth / 2, 22, { align: "center" });
        doc.text("CAMPUS JESÚS SACRAMENTADO ANEXO COMAYAGUA", pageWidth / 2, 29, { align: "center" });

        doc.setFontSize(18);
        doc.text("REPORTE DE REDES WIFI", pageWidth / 2, 40, { align: "center" });

        const columns = ["Nombre", "Contraseña"];
        const rows = redes.map((red) => [red.nombre || "-", red.contrasena || "-"]);

        autoTable(doc, { 
            startY: 50,
            head: [columns], 
            body: rows,
            theme: "striped",
            styles: { fontSize: 10, cellPadding: 2 },
            headStyles: { fillColor: [46, 204, 113], textColor: 255, fontStyle: "bold" }
        });

        // 🔹 Pie de página
        doc.setFontSize(10);
        doc.text(`Generado el: ${new Date().toLocaleString()}`, 14, doc.internal.pageSize.getHeight() - 10);
        doc.save("Reporte_WiFi.pdf");
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
