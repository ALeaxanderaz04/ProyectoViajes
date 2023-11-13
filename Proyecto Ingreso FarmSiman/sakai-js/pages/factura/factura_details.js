import { useRouter } from 'next/router'
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import Global from '../api/Global';
import { Fieldset } from 'primereact/fieldset';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';


const Detalle = () => {

    const router = useRouter();
    const [searchText, setSearchText] = useState(''); //para la barra de busqueda
    const [FacturaId, setFacturaId] = useState(router.query.id); // optiene el id del resgitro a editar

    const [user_Creacion, setuser_Creacion] = useState('');
    const [FechaCreacion, setFechaCreacion] = useState('');
    const [user_Modificacion, setuser_Modificacion] = useState('');
    const [FechaModificacion, setFechaModificacion] = useState('');

    const [Auditoria, setAuditoria] = useState([]);

    const [FacturaDatos, setFacturaDatos] = useState([]);
    const [cliente, setcliente] = useState('');
    const [Empleado, setEmpleado] = useState('');
    const [sucursal, setSucursal] = useState('');
    const [metodopago, setmetodopago] = useState('');
    const [FechaCompra, setFechaCompra] = useState('');
    const [SubTotal, setSubTotal] = useState('');
    const [IVA, setIVA] = useState('');
    const [Total, setTotal] = useState('');


    useEffect(() => {
        axios.get(Global.url + 'Factura/Buscar?id=' + FacturaId)
            .then((r) => {


                setcliente(r.data.clie_NombreCompleto)
                setEmpleado(r.data.empe_NombreCompleto)
                setSucursal(r.data.sucu_Nombre)
                setmetodopago(r.data.meto_Descripcion)
                setFechaCompra(r.data.fact_FechaCompra)

                setAuditoria(r.data)
                console.log(Auditoria)
            })
            .catch((e) => {
                router.push('./factura_index')
            })

        axios.put(Global.url + 'Factura/ListadoDetalles?id=' + FacturaId)
            .then((r) => {
                setFacturaDatos(r.data.data);
            })
            .catch((e) => {

            })

        axios.put(Global.url + 'Factura/PrecioDetalles?id=' + FacturaId)
            .then((r) => {
                setSubTotal(r.data[0].SubTotal);
                setIVA(r.data[0].IVA);
                setTotal(r.data[0].Total);
            })
            .catch((e) => {

            })
    }, []);

    return (

        <div className="grid">
            <div className="col-12">

                <div className="card" style={{ background: `rgb(105,101,235)`, height: '100px', width: '100%' }}>
                    <div className="row text-center d-flex align-items-center">
                        <h2 style={{ color: 'white' }}>Detalles</h2>
                    </div>
                </div>

                <div className="card">
                    <div className="grid p-fluid">


                        <div className='col-12'>
                            <h5>Factura Id: </h5> <label>{FacturaId}</label>
                        </div>
                        <div className='col-6 mt-2'>
                            <h5>Cliente: </h5>
                            <label>{cliente}</label>
                        </div>
                        <div className='col-6m t-2'>
                            <h5>Empleado: </h5> <label>{Empleado}</label>
                        </div>
                        <div className='col-6 mt-2'>
                            <h5>Sucursal: </h5> <label>{sucursal}</label>
                        </div>
                        <div className='col-6 mt-2'>
                            <h5>Metdodo de pago: </h5> <label>{metodopago}</label>
                        </div>


                        <div className='col-6 mt-2'>
                            <h5>FechaCompra: </h5> <label>{FechaCompra}</label>
                        </div>


                        <div className='col-12 mt-2'>


                            <Fieldset legend="Servicios Comprados" toggleable>

                                <div className="grid p-fluid">
                                    <div className='col-4 mt-2'>
                                        <h5>Servicio</h5>
                                        {FacturaDatos.map((item, index) => (
                                            <div key={index}>
                                                {/* Aquí puedes mostrar los elementos del arreglo */}
                                                <label>- {item.serv_Nombre}</label>
                                            </div>
                                        ))}

                                    </div>
                                    <div className='col-2 mt-2'>
                                        <h5>Precio</h5>
                                        {FacturaDatos.map((item, index) => (
                                            <div key={index}>
                                                {/* Aquí puedes mostrar los elementos del arreglo */}
                                                <label> {item.serv_Precio} .Lps</label>
                                            </div>
                                        ))}

                                    </div>
                                    <div className='col-2 mt-2'>
                                        <h5>Cantidad</h5>
                                        {FacturaDatos.map((item, index) => (
                                            <div key={index}>
                                                {/* Aquí puedes mostrar los elementos del arreglo */}
                                                <label> {item.fdet_Cantidad}</label>
                                            </div>
                                        ))}

                                    </div>
                                    <div className='col-4 mt-2'>
                                        <h5>Total a Pagar</h5>
                                        <div className="grid p-fluid">
                                            <div className='col-4'>
                                                <label>SubTotal:    </label><br />
                                                <label>IVA:         </label><br />
                                                <label>Total:       </label><br />
                                            </div>
                                            <div className='col-4'>
                                                <label>{SubTotal} .Lps</label><br />
                                                <label>{IVA} .Lps</label><br />
                                                <label>{Total} .Lps</label><br />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Fieldset>


                        </div>

                        <div className='col-12'>

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
                                            value={[Auditoria]}
                                        >
                                            <Column field="user_Creacion" header="Usuario Creacion" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }} body={(rowData) => rowData.user_Creacion} />
                                            <Column field="fact_FechaCreacion" header="Fecha Creacion" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }} body={(rowData) => new Date(rowData.fact_FechaCreacion).toLocaleDateString()} />
                                            <Column field="user_Modificacion" header="Usuario Modificacion" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }} body={(rowData) => rowData.user_Modificacion} />
                                            <Column field="fact_FechaModificacion" header="Fecha Modificacion" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }} body={(rowData) => rowData.fact_FechaModificacion} />

                                        </DataTable>
                                    </div>
                                </div>
                            </Fieldset>
                        </div>

                        <div className='col-12'>
                            <div className="grid p-fluid">
                                <div className='col-2'>
                                    <Button label="Regresar " severity="info" onClick={() => router.push('./factura_index')} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )

}

export default Detalle;