import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import Global from '../api/Global';
import { useRouter } from 'next/router';


function PDFDocument() {
    // creamos el documento PDF
    const doc = new jsPDF();
    const router = useRouter();

    const [data, setData] = useState([]);

    useEffect(() => {
        var admin = 0;
        var pant_Id = 15;
        var role_Id = 0;

        if (localStorage.getItem('role_Id') != null) {
            role_Id = localStorage.getItem('role_Id');
        }

        if (localStorage.getItem('user_EsAdmin') == 'true') {
            admin = 1;
        }

        axios.put(Global.url + `Pantalla/AccesoPantalla?esAdmin=${admin}&role_Id=${role_Id}&pant_Id=${pant_Id}`)
            .then((r) => {

                if (r.data[0][""] == 1) {
                    axios.get(Global.url + 'Servicio/Listado')
                        .then(response => response.data)
                        .then(data => setData(data.data))
                        .catch(error => {
                            console.log('Error en la solicitud Axios:', error);
                        });

                }
                else {
                    router.push('/');
                }
            })

    }, []);

    const header = function (data) {
        doc.setFontSize(18);
        const pageWidth = doc.internal.pageSize.width;
        const title = "Reporte de Servicios";
      
        // Calculate the width of the title
        const titleWidth = doc.getTextWidth(title);
      
        // Calculate the x-coordinate to center the title
        const x = (pageWidth - titleWidth) / 2;
      
        doc.setTextColor(40);
      
        // Agregar imagen
        // doc.addImage('https://i.ibb.co/gt5zMF1/FDCNegro.jpg', 'JPG', pageWidth - 40, 5, 24, 24);
      
        // Agregar texto centrado
        doc.text(title, x, 22);
      };
      

    const footer = function (data) {
        const pageCount = doc.internal.getNumberOfPages();
        const currentPage = data.pageNumber;
        const pageWidth = doc.internal.pageSize.width;
        const date = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const text = `Documento informativo de servicos Moonson ${date}`;
        const textWidth = doc.getTextWidth(text);
        const textX = (pageWidth * 1.3) - textWidth;
        doc.setFontSize(10);
        doc.text(`Página ${currentPage}`, data.settings.margin.left, doc.internal.pageSize.height - 10);
        doc.text(text, textX, doc.internal.pageSize.height - 10);
    };

    //  doc.autoTableAddPage({
    //    addPageContent: header,
    //  });

    // añadimos contenido al PDF utilizando jspdf-autotable
    doc.autoTable({
        head: [['Id', 'Servicio', 'Precio por Serivio']],
        body: data.map((row) => [
            row.serv_Id,
            row.serv_Nombre,
            row.serv_Precio + ' .Lps',
        ]),
        didDrawPage: function (data) {
            header(data);
            // agregamos la paginación
            footer(data);
        },
        margin: { top: 30, bottom: 20 }
    });

    // obtenemos una URL del PDF para mostrarlo en un iframe
    const pdfUrl = doc.output('dataurl');

    // mostramos el documento PDF en un iframe
    return (
        <div className="grid">
            <div className="col-12">

                <div className="card" style={{ background: `rgb(105,101,235)`, height: '100px', width: '100%' }}>
                    <div className="row text-center d-flex align-items-center">
                        <h2 style={{ color: 'white' }}>Reporte</h2>
                    </div>
                </div>

                <div className="card">
                    <div style={{ height: '100vh' }}>
                        <iframe src={pdfUrl} style={{ width: '100%', height: '100%' }} />
                    </div>
                </div>

            </div>
        </div>

    );
}

export default PDFDocument;