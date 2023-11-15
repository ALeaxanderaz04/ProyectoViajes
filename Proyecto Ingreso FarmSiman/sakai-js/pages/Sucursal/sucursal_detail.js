import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Global from '../api/Global';
import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import axios from 'axios'
import { useRouter } from 'next/router';
import { Fieldset } from 'primereact/fieldset';

const App = () => {
    const router = useRouter();
    const toast = useRef(null); //para los toast
    const id = router.query.id; // optiene el id del resgitro a editar

    const [datos, setDatos] = useState([]);
    const [detalles, setdetalles] = useState([]);


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

                    axios.get(Global.url + 'Sucursal/Buscar?id=' + id)
                        .then((r) => {
                            setDatos(r.data)
                        })
                        .catch((e) => {

                            localStorage.setItem('Colaborador', '400');
                            router.push('./sucursal_index')
                        })

                    axios.get(Global.url + 'Sucursal/ListadoColaboradoresPorSucursal?id=' + id)
                        .then((r) => {
                            console.log(r.data.data)
                            setdetalles(r.data.data)
                        })
                        .catch((e) => {

                            localStorage.setItem('Colaborador', '400');
                            router.push('./sucursal_index')
                        })


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

        return `${dia}/${mes}/${año}`;
    }

    return (
        <div className='col-12'>
            <Toast ref={toast} />
            <div className="card" style={{ background: `rgb(105,101,235)`, height: '100px', width: '100%' }}>
                <div className="row text-center d-flex align-items-center">
                    <h2 style={{ color: 'white' }}>Detalle de la Sucursal</h2>
                </div>
            </div>

            <div className="card">
                <div className="grid p-fluid">


                    <div className="col-6">
                        <div className="field mt-3">
                            <label style={{ fontWeight: 'bold', fontSize: '18px' }}>Id</label><br />
                            <label htmlFor="inputtext">{datos.sucu_Id}</label>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="field mt-3">

                        </div>
                    </div>

                    <div className="col-6">
                        <div className="field">
                            <label style={{ fontWeight: 'bold', fontSize: '18px' }}>Nombre</label><br />
                            <label htmlFor="inputtext">{datos.sucu_Nombre}</label>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="field">
                            <label style={{ fontWeight: 'bold', fontSize: '18px' }}>Municipio de la Sucursal</label><br />
                            <label htmlFor="inputtext">{datos.muni_Nombre}</label>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="field">
                            <label style={{ fontWeight: 'bold', fontSize: '18px' }}>Departamento de la Sucursal</label><br />
                            <label htmlFor="inputtext">{datos.depa_Nombre}</label>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="field">
                            <label style={{ fontWeight: 'bold', fontSize: '18px' }}>Dirección Exacta</label><br />
                            <label htmlFor="inputtext">{datos.sucu_Direccion}</label>
                        </div>
                    </div>

                    <div className="col-12">
                        <Fieldset legend="Auditoria" toggleable>
                            <div className="grid p-fluid">
                                <div className='col-12 mt-2'>
                                    <DataTable

                                        className="p-datatable-gridlines"
                                        showGridlines
                                        sortField="representative.name"
                                        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registros."
                                        dataKey="cate_Id"
                                        filterDisplay="menu"
                                        responsiveLayout="scroll"
                                        emptyMessage="No se encontraron registros."
                                        value={[datos]}
                                    >
                                        <Column field="user_Creacion" header="Usuario Creacion" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }} body={(rowData) => rowData.user_Creacion} />
                                        <Column field="sucu_FechaCreacion" header="Fecha Creacion" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }} body={(rowData) => formatearFecha(rowData.sucu_FechaCreacion)} />
                                        <Column field="user_Modificacion" header="Usuario Modificacion" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }} body={(rowData) => rowData.user_Modificacion} />
                                        <Column field="sucu_FechaModificacion" header="Fecha Modificacion" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }} body={(rowData) => formatearFecha(rowData.sucu_FechaModificacion)} />

                                    </DataTable>
                                </div>


                            </div>
                        </Fieldset>
                    </div>

                    <div className="col-12">
                        <Fieldset legend="Detalles" toggleable>
                            <div className="grid p-fluid">
                                <div className='col-12 mt-2'>
                                    <DataTable
                                        paginator
                                        className="p-datatable-gridlines"
                                        showGridlines
                                        sortField="representative.name"
                                        rows={10}
                                        rowsPerPageOptions={[5, 10, 25]}
                                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registros."
                                        dataKey="sucu_Id"
                                        filterDisplay="menu"
                                        responsiveLayout="scroll"
                                        emptyMessage="No se encontrron registros."
                                        filterMode="filter"
                                        value={detalles.filter((post) =>
                                            post.cola_NombreCompleto ||
                                            post.cola_identidad ||
                                            post.cosu_DistanciaSucursal
                                        )}
                                    >
                                        <Column field="cola_NombreCompleto" header="Nombre" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }}  />
                                        <Column field="cola_identidad" header="Identidad" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }} />
                                        <Column field="cosu_DistanciaSucursal" header="Distancia (KM)" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }} />

                                    </DataTable>
                                </div>


                            </div>
                        </Fieldset>
                    </div>

                    <div className='col-12'>
                        <div className="grid p-fluid">
                            <div className='col-2'>
                                <Button label="Regresar " severity="info" onClick={() => router.push('./sucursal_index')} />
                            </div>
                        </div>
                    </div>




                </div>
            </div>
        </div>

    )
}

export default App;