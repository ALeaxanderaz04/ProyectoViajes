import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import Global from '../api/Global';
import axios from 'axios'
import { useRouter } from 'next/router'
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const App = () => {
    const router = useRouter();
    const toast = useRef(null); //para los toast
    const id = router.query.id; // optiene el id del resgitro a editar

    const [datos, setDatos] = useState([]);

    useEffect(() => {

        var admin = 0;
        var pant_Id = 5;
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

                    axios.get(Global.url + 'Transportista/Buscar?id=' + id)
                        .then((r) => {
                            setDatos(r.data)
                        })
                        .catch((e) => {

                            localStorage.setItem('Transportista', '400');
                            router.push('./Transportistas_index')
                        })
                }
                else {
                    router.push('/');
                }
            })

    }, []);

    function formatearFecha(fechaOriginal) {
        if (fechaOriginal != null) {
            const fecha = new Date(fechaOriginal);
            const dia = fecha.getDate();
            const mes = fecha.getMonth() + 1;
            const año = fecha.getFullYear();

            return `${dia}/${mes}/${año}`;
        }
        else
            return "";
    }

    return (
        <div className='col-12'>
            <Toast ref={toast} />
            <div className="card" style={{ background: `rgb(105,101,235)`, height: '100px', width: '100%' }}>
                <div className="row text-center d-flex align-items-center">
                    <h2 style={{ color: 'white' }}>Detalle del Transportista</h2>
                </div>
            </div>

            <div className="card">
                <div className="grid p-fluid">


                    <div className="col-6">
                        <div className="field mt-3">
                            <label style={{ fontWeight: 'bold', fontSize: '18px' }}>Id</label><br />
                            <label htmlFor="inputtext">{datos.tran_Id}</label>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="field mt-3">

                        </div>
                    </div>

                    <div className="col-6">
                        <div className="field">
                            <label style={{ fontWeight: 'bold', fontSize: '18px' }}>Nombres</label><br />
                            <label htmlFor="inputtext">{datos.tran_Nombres}</label>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="field">
                            <label style={{ fontWeight: 'bold', fontSize: '18px' }}>Apellidos</label><br />
                            <label htmlFor="inputtext">{datos.tran_Apellidos}</label>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="field">
                            <label style={{ fontWeight: 'bold', fontSize: '18px' }}>Fecha De Nacimiento</label><br />
                            <label htmlFor="inputtext">{formatearFecha(datos.tran_FechaNacimiento)}</label>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="field">
                            <label style={{ fontWeight: 'bold', fontSize: '18px' }}>Sexo</label><br />
                            <label htmlFor="inputtext">{datos.tran_Sexo == "M" ? "Masculino" : "Femenino"}</label>
                        </div>
                    </div>


                    <div className="col-6">
                        <div className="field">
                            <label style={{ fontWeight: 'bold', fontSize: '18px' }}>Estado Civil</label><br />
                            <label htmlFor="inputtext">{datos.eciv_Descripcion}</label>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="field">
                            <label style={{ fontWeight: 'bold', fontSize: '18px' }}>Telefono</label><br />
                            <label htmlFor="inputtext">{datos.tran_Telefono}</label>
                        </div>
                    </div>


                    <div className="col-6">
                        <div className="field">
                            <label style={{ fontWeight: 'bold', fontSize: '18px' }}>Pago por KM</label><br />
                            <label htmlFor="inputtext">{`${datos.tran_PagoKm} .LPS`}</label>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="field">
                            <label style={{ fontWeight: 'bold', fontSize: '18px' }}>Municipio de Vivienda</label><br />
                            <label htmlFor="inputtext">{datos.muni_Nombre}</label>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="field">
                            <label style={{ fontWeight: 'bold', fontSize: '18px' }}>Departamento de Vivienda</label><br />
                            <label htmlFor="inputtext">{datos.depa_Nombre}</label>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="field">
                            <label style={{ fontWeight: 'bold', fontSize: '18px' }}>Dirección Exacta</label><br />
                            <label htmlFor="inputtext">{datos.tran_DireccionExacta}</label>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="grid p-fluid">
                            <div className='col-12 mt-2'>
                                <DataTable

                                    className="p-datatable-gridlines"
                                    showGridlines
                                    sortField="representative.name"
                                    currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registros."
                                    dataKey="tran_Id"
                                    filterDisplay="menu"
                                    responsiveLayout="scroll"
                                    emptyMessage="No se encontraron registros."
                                    value={[datos]}
                                >
                                    <Column field="user_Creacion" header="Usuario Creacion" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }} body={(rowData) => rowData.user_Creacion} />
                                    <Column field="tran_FechaCreacion" header="Fecha Creacion" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }} body={(rowData) => formatearFecha(rowData.tran_FechaCreacion)} />
                                    <Column field="user_Modificacion" header="Usuario Modificacion" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }} body={(rowData) => rowData.user_Modificacion} />
                                    <Column field="tran_FechaModificacion" header="Fecha Modificacion" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }} body={(rowData) => formatearFecha(rowData.tran_FechaModificacion)} />

                                </DataTable>
                            </div>

                            <div className='col-12'>
                                <div className="grid p-fluid">
                                    <div className='col-2'>
                                        <Button label="Regresar " severity="info" onClick={() => router.push('./Transportistas_index')} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>




                </div>
            </div>
        </div>

    )
}

export default App;
