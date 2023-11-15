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
import { Row } from 'jspdf-autotable';


function PDFDocument() {
    // creamos el documento PDF

    const doc = new jsPDF();
    const router = useRouter();
    const toast = useRef(null); //para los toast
    const [submitted, setSubmitted] = useState(false);

    const [Transportista_DDL, setTransportista_DDL] = useState([]);
    const [Transportista, setTransportista] = useState("");

    const [FechaInicio, setFechaInicio] = useState("");
    const [FechaFin, setFechaFin] = useState("");

    const [FechaFinActivado, setFechaFinActivado] = useState(true);

    const [pdfData, setPdfData] = useState('');

    useEffect(() => {
        var admin = 0;
        var pant_Id = 8;
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

    function formatearFechaSQl(fechaOriginal) {
        const fecha = new Date(fechaOriginal);
        const dia = fecha.getDate();
        const mes = fecha.getMonth() + 1;
        const año = fecha.getFullYear();

        return `${mes}/${dia}/${año}`;
    }

    function formatearFecha(fechaOriginal) {
        const fecha = new Date(fechaOriginal);
        const dia = fecha.getDate();
        const mes = fecha.getMonth() + 1;
        const año = fecha.getFullYear();

        return `${dia}/${mes}/${año}`;
    }

    //Enviar parametros
    const EnviarDatos = () => {
        if (!FechaInicio || !Transportista || !FechaFin) {
            setSubmitted(true);
        } else {
            axios
                .get(
                    Global.url +
                    `Viajes/Reporte?tran_Id=${Transportista.code}&FechaInicio=${formatearFechaSQl(
                        FechaInicio
                    )}&FechaFin=${formatearFechaSQl(FechaFin)}`
                )
                .then((r) => {
                    if (r.data.data.length > 0) {
                        //setDatos(r.data.data);
                        // Llamar a generarPDF después de actualizar los datos
                        generarPDF(r.data.data);
                    }
                    else {
                        toast.current.show({
                            severity: 'warn',
                            summary: 'Advertencia',
                            detail: 'No hay Viajes en el Rango Seleccionado',
                            life: 2000,
                        });
                    }
                })
                .catch((e) => {
                    console.log(e);
                    toast.current.show({
                        severity: 'warn',
                        summary: 'Advertencia',
                        detail: 'Ups, algo salió mal. ¡Inténtalo nuevamente!',
                        life: 2000,
                    });
                });
        }
    };

    const generarPDF = (datos) => {
        const newDoc = new jsPDF();
        let y = 10;
        let KilometrajeTotal = 0;
        let TotalPago = 0;

        datos.forEach((viaje, index) => {
            let counter = 1; // Inicializa el contador
            KilometrajeTotal += viaje.Kilometraje;
            TotalPago += viaje.Pago;


            // Encabezado
            doc.text(`Datos del Viaje ${viaje.viaj_Id}`, 20, y + 5);

            // Detalles del Viaje
            const detallesViaje = [
                ['Transportista', viaje.tran_NombreCompleto],
                ['Sucursal', viaje.sucu_Nombre],
                ['Fecha de Viaje', formatearFecha(viaje.viaj_FechaViaje)],
                ['Pago del Viaje', `${viaje.Pago} .LPS`],
                ['Kilometraje del Viaje', `${viaje.Kilometraje} .KM`],
            ];

            doc.autoTable({
                startY: y + 10,
                head: [['Campo', 'Valor']],
                body: detallesViaje,
            });

            // Detalles
            doc.text('Colaboradores que Viajaron', 20, y + 70);

            const detallesTabla = JSON.parse(viaje.Detalles).map((detalle) => [
                counter++,
                detalle.cola_NombreCompleto,
                detalle.cola_Identidad,
            ]);

            doc.autoTable({
                startY: y + 75,
                head: [['#', 'Nombre del Colaborador', 'Identidad']],
                body: detallesTabla,
            });

            // Añadir salto de página para el próximo viaje
            if (index !== datos.length - 1) {
                doc.addPage();
            }
        });

        doc.addPage();

        // Encabezado
        doc.text(`Total a Pagar`, 20, y + 5);

        //Costos Totales
        const Pago = [
            ['Transportista', Transportista.name],
            ['Fecha de Inicio', formatearFecha(FechaInicio)],
            ['Fecha Final', formatearFecha(FechaFin)],
            ['Kilometraje Total Alcanzado', `${KilometrajeTotal} .KM`],
            ['Pago Total al Transportista', `${TotalPago} .LPS`],
        ];

        doc.autoTable({
            startY: y + 10,
            head: [['Campo', 'Valor']],
            body: Pago,
        });

        // Opcional: si deseas obtener los datos del PDF en formato base64
        const dataUrl = doc.output('dataurl');
        setPdfData(dataUrl);
    };

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
                                {/* Mostrar el PDF en el iframe */}

                                <iframe src={pdfData} style={{ width: '100%', height: '100%' }} />
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>

    );
}

export default PDFDocument;