import React, { useEffect, useState, useRef } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import Global from '../api/Global';
import { useRouter } from 'next/router';
import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';


function PDFDocument() {
    // creamos el documento PDF

    const doc = new jsPDF();
    const router = useRouter();
    const toast = useRef(null); //para los toast

    const [datos, setDatos] = useState([]);
    const [detalles, setdetalles] = useState([]);

    const [submitted, setSubmitted] = useState(false);

    const [Transportista_DDL, setTransportista_DDL] = useState([]);
    const [Transportista, setTransportista] = useState("");

    const [FechaInicio, setFechaInicio] = useState("");
    const [FechaFin, setFechaFin] = useState("");

    const [FechaFinActivado, setFechaFinActivado] = useState(true);

    useEffect(() => {
        var admin = 0;
        var pant_Id = 10;
        var role_Id = 0;

        if (localStorage.getItem('role_Id') != null) {
            role_Id = localStorage.getItem('role_Id');
        }

        if (localStorage.getItem('user_EsAdmin') == 'true') {
            admin = 1;
        }

        axios.put(Global.url + `Rol/AccesoPantalla?esAdmin=${admin}&role_Id=${role_Id}&pant_Id=${pant_Id}`)
            .then((r) => {

                if (r.data.data.messageStatus == '1') {

                    axios.get(Global.url + 'Transportista/Listado')
                        .then(response => response.data)
                        .then((data) => setTransportista_DDL(data.data.map((c) => ({ code: c.tran_Id, name: c.tran_NombreCompleto }))))
                        .catch(error => console.error(error))
                }
                else {
                    router.push('/');
                }
            })

    }, []);

    function formatearFecha(fechaOriginal) {
        const fecha = new Date(fechaOriginal);
        const dia = fecha.getDate();
        const mes = fecha.getMonth() + 1;
        const año = fecha.getFullYear();

        return `${mes}/${dia}/${año}`;
    }

    const EnviarDatos = () => {
        if (!FechaInicio || !Transportista || !FechaFin) {
            setSubmitted(true);
        }
        else {
            axios.get(Global.url + `Viajes/Reporte?tran_Id=${Transportista.code}&FechaInicio=${formatearFecha(FechaInicio)}&FechaFin=${formatearFecha(FechaFin)}`)
                .then((r) => {
                    console.log(r)
                    if (r.data.data.length > 0) {
                        toast.current.show({ severity: 'success', summary: 'Accion Exitosa', detail: 'Datos Correctos', life: 2000 });
                    }
                })
                .catch((e) => {
                    console.log(e)
                    toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Ups, algo salió mal. ¡Inténtalo nuevamente!', life: 2000 });
                })
        }
    }

    const pdfUrl = doc.output('dataurl');

    // const header = function (data) {
    //     doc.setFontSize(18);
    //     const pageWidth = doc.internal.pageSize.width;
    //     const title = "Reporte de Servicios";

    //     // Calculate the width of the title
    //     const titleWidth = doc.getTextWidth(title);

    //     // Calculate the x-coordinate to center the title
    //     const x = (pageWidth - titleWidth) / 2;

    //     doc.setTextColor(40);

    //     // Agregar imagen
    //     // doc.addImage('https://i.ibb.co/gt5zMF1/FDCNegro.jpg', 'JPG', pageWidth - 40, 5, 24, 24);

    //     // Agregar texto centrado
    //     doc.text(title, x, 22);
    //   };


    // const footer = function (data) {
    //     const pageCount = doc.internal.getNumberOfPages();
    //     const currentPage = data.pageNumber;
    //     const pageWidth = doc.internal.pageSize.width;
    //     const date = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    //     const text = `Documento informativo de servicos Moonson ${date}`;
    //     const textWidth = doc.getTextWidth(text);
    //     const textX = (pageWidth * 1.3) - textWidth;
    //     doc.setFontSize(10);
    //     doc.text(`Página ${currentPage}`, data.settings.margin.left, doc.internal.pageSize.height - 10);
    //     doc.text(text, textX, doc.internal.pageSize.height - 10);
    // };

    //  doc.autoTableAddPage({
    //    addPageContent: header,
    //  });

    // añadimos contenido al PDF utilizando jspdf-autotable
    // doc.autoTable({
    //     head: [['Id', 'Servicio', 'Precio por Serivio']],
    //     body: data.map((row) => [
    //         row.serv_Id,
    //         row.serv_Nombre,
    //         row.serv_Precio + ' .Lps',
    //     ]),
    //     didDrawPage: function (data) {
    //         header(data);
    //         // agregamos la paginación
    //         footer(data);
    //     },
    //     margin: { top: 30, bottom: 20 }
    // });

    // obtenemos una URL del PDF para mostrarlo en un iframe
    //const pdfUrl = doc.output('dataurl');

    // mostramos el documento PDF en un iframe
    return (
        <div className="grid">
            <Toast ref={toast} />
            <div className="col-12">

                <div className="card" style={{ background: `rgb(105,101,235)`, height: '100px', width: '100%' }}>
                    <div className="row text-center d-flex align-items-center">
                        <h2 style={{ color: 'white' }}>Reporte</h2>
                    </div>
                </div>

                <div className="card">
                    <div className="grid p-fluid">

                        <div className='col-4'>
                            <div className="field">
                                <label htmlFor="Sexo">Transportista</label><br />
                                <Dropdown optionLabel="name" placeholder="Selecionar" options={Transportista_DDL} value={Transportista} onChange={(e) => setTransportista(e.value)} className={classNames({ 'p-invalid': submitted && !Transportista })} />
                                {submitted && !Transportista && <small className="p-invalid" style={{ color: 'red' }}>Seleccione una opcion.</small>}
                            </div>
                        </div>

                        <div className='col-4'>

                            <div className="field">
                                <label htmlFor="calendar">Fecha Inicio</label>
                                <Calendar
                                    inputId="calendar"
                                    showIcon
                                    value={FechaInicio}
                                    onChange={(e) => setFechaInicio(e.target.value, setFechaFinActivado(false))}
                                    className={classNames({ 'p-invalid': submitted && !FechaInicio })} />
                                {submitted && !FechaInicio && <small className="p-invalid" style={{ color: 'red' }}>El campo es requerido.</small>}
                            </div>

                        </div>

                        <div className='col-4'>
                            <div className="field">
                                <label htmlFor="calendar">Fecha Fin</label>
                                <Calendar
                                    inputId="calendar"
                                    showIcon
                                    disabled={FechaFinActivado}
                                    minDate={new Date(FechaInicio)}
                                    value={FechaFin}
                                    onChange={(e) => setFechaFin(e.target.value)}
                                    className={classNames({ 'p-invalid': submitted && !FechaFin })} />
                                {submitted && !FechaFin && <small className="p-invalid" style={{ color: 'red' }}>El campo es requerido.</small>}
                            </div>
                        </div>

                        <div className='col-12'>
                            <Button type="button" label="Finalizar" severity="info" icon="pi pi-upload" onClick={EnviarDatos} />
                        </div>

                        <div className='col-12'>
                            <div style={{ height: '100vh' }}>
                                <iframe src={pdfUrl} style={{ width: '100%', height: '100%' }} />
                            </div>
                        </div>


                    </div>

                </div>

            </div>
        </div>

    );
}

export default PDFDocument;