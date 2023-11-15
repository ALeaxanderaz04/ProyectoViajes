import React, { useState, useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import Global from '../api/Global';
import axios from 'axios'
import { useRouter } from 'next/router'
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';

const App = () => {

    const router = useRouter();
    const toast = useRef(null); //para los toast
    const id = router.query.id; // optiene el id del resgitro a editar

    const [DeleteModal, setDeleteModal] = useState(false); //abrir el modal eliminar

    const [posts, setPosts] = useState([]);
    const [searchText, setSearchText] = useState(''); //para la barra de busqueda
    const [ViajeId, setViajeId] = useState(id);
    const [vide_Id, setvide_Id] = useState("");
    const [Kilometraje, setKilometraje] = useState(0);
    const [KilometrajeTotal, setKilometrajeTotal] = useState(0);
    const [PagoTransportista, setPagoTransportista] = useState(0);

    const [submitted, setSubmitted] = useState(false);
    const [submitted2, setSubmitted2] = useState(false);

    const [Sucursal_DDL, setSucursal_DDL] = useState("");
    const [Sucursal, setSucursal] = useState("");

    const [Transportista_DDL, setTransportista_DDL] = useState([]);
    const [Transportista, setTransportista] = useState("");

    const [ColaboradoresDDL, setColaboradoresDDL] = useState([]);
    const [Colaborador, setColaborador] = useState('')
    const [ColaboradorDelete, setColaboradorDelete] = useState('')

    const [FechaViaje, setFechaViaje] = useState("");

    const [Form1Activado, setForm1Activado] = useState(false)
    const [Form2Activado, setForm2Activado] = useState(true)

    useEffect(() => {

        var admin = 0;
        var pant_Id = 9;
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

                    axios.get(Global.url + 'Sucursal/Listado')
                        .then(response => response.data)
                        .then((data) => setSucursal_DDL(data.data.map((c) => ({ code: c.sucu_Id, name: c.sucu_Nombre }))))
                        .catch(error => console.error(error))

                    axios.get(Global.url + 'Transportista/Listado')
                        .then(response => response.data)
                        .then((data) => setTransportista_DDL(data.data.map((c) => ({ code: c.tran_Id, name: c.tran_NombreCompleto }))))
                        .catch(error => console.error(error))

                    axios.get(Global.url + 'Viajes/Buscar?id=' + id)
                        .then((r) => {

                            setTransportista({ code: r.data.tran_Id, name: r.data.tran_NombreCompleto })
                            setSucursal({ code: r.data.sucu_Id, name: r.data.sucu_Nombre })
                            
                            var fecha = new Date(r.data.viaj_FechaViaje)
                            setFechaViaje(fecha);

                            DatosTabla(id)
                            Pago()
                            
                        })
                        .catch((e) => {
                            console.log(e);
                            localStorage.setItem('Colaborador', '400');
                            router.push('./Viajes_index')
                        })
                }
                else {
                    router.push('/');
                }
            })

    }, []);

    const header = (
        <div className="table-header">
            <div className="grid p-fluid">
                <div className="col-3">
                    <Button type="button" label="Finalizar" severity="info" icon="pi pi-upload" onClick={() => router.push('./Viajes_index')} />
                </div>

                <div className="col-3">
                    <Button type="button" label={PagoTransportista + " LPS"} severity="info" />
                </div>

                <div className="col-6">
                    <span className="block p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText type="text" value={searchText} onChange={e => setSearchText(e.target.value)} placeholder="Buscar..." />
                    </span>
                </div>
            </div>
        </div>
    );

    //mandar datos de ingresar a la api
    const EditarViajes = (e) => {

        if (!Sucursal || !FechaViaje || !Transportista) {
            setSubmitted(true);
        }
        else {
            let payload = {
                viaj_Id: parseInt(id),
                tran_Id: Transportista.code,
                sucu_Id: Sucursal.code,
                viaj_FechaViaje: FechaViaje,
                viaj_UsuModificacion: parseInt(localStorage.getItem('usuID'))
            }
            axios.post(Global.url + 'Viajes/Editar', payload)
                .then((r) => {
                    if (r.data.data.messageStatus == '1') {
                        ColaboradoresDDl(ViajeId)
                        setForm1Activado(true);
                        setForm2Activado(false)
                        toast.current.show({ severity: 'success', summary: 'Accion Exitosa', detail: 'Registro Editado Correctamente', life: 2000 });
                    }
                })
                .catch((e) => {
                    console.log(e)
                    toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Ups, algo salió mal. ¡Inténtalo nuevamente!', life: 2000 });
                })
        }
    }

    const ColaboradoresDDl = (Id) => {
        axios.get(Global.url + 'Colaborador/DisponiblesViajar?Id=' + parseInt(Id))
            .then(response => response.data)
            .then((data) => setColaboradoresDDL(data.data.map((c) => ({ code: c.cola_Id, name: c.cola_NombreCompleto }))))
            .catch(error => console.error(error))
    }

    const ColaboradorKilometraje = (cola_Id) => {
        axios.get(Global.url + 'Sucursal/Kilometraje?sucu_Id=' + parseInt(Sucursal.code) + '&' + 'cola_Id=' + parseInt(cola_Id.code))
            .then((response) => {
                setKilometraje(response.data.data[0].cosu_DistanciaSucursal)
            })
            .catch(error => console.error(error))
    }

    const DatosTabla = (Id) => {
        axios.get(Global.url + 'Viajes/ListadoDetalles?Id=' + parseInt(Id))
            .then((response) => {
                setPosts(response.data.data)
            })
            .catch(error => console.error(error))
    }

    const IngresarViajesDeatlles = (e) => {

        if (!Colaborador) {
            setSubmitted2(true);
        }
        else {

            if ((KilometrajeTotal + Kilometraje) > 100) {
                toast.current.show({ severity: 'warn', summary: 'Advertancia', detail: 'Limite sobrepasado', life: 2000 });
            }
            else {
                let payload = {
                    viaj_Id: parseInt(ViajeId),
                    cola_Id: Colaborador.code,
                    vide_UsuCreacion: parseInt(localStorage.getItem('usuID'))
                }
                axios.post(Global.url + 'Viajes/InsertarDetalles', payload)
                    .then((r) => {
                        if (r.data.data.messageStatus == '1') {
                            setKilometrajeTotal(KilometrajeTotal + Kilometraje)
                            setKilometraje(0);
                            setColaborador("");
                            Pago()
                            DatosTabla(ViajeId)
                            ColaboradoresDDl(ViajeId)
                            toast.current.show({ severity: 'success', summary: 'Accion Exitosa', detail: 'Registro Ingresado Correctamente', life: 2000 });
                        }
                    })
                    .catch((e) => {
                        console.log(e)
                        toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Ups, algo salió mal. ¡Inténtalo nuevamente!', life: 2000 });
                    })
            }

        }
    }


    /* MODAL ELIMINAR */
    //abrir modal eliminar
    const OpenDeleteModal = (id, cola_Id) => {
        setColaboradorDelete(cola_Id)
        setvide_Id(id);
        setDeleteModal(true);
    }

    //cerrar modal eliminar
    const hideDeleteModal = () => {
        setvide_Id("");
        setDeleteModal(false);
    };

    const EliminarDetalles = (e) => {

        let payloadDelete = {
            vide_Id: parseInt(vide_Id),
        }
        axios.post(Global.url + 'Viajes/EliminarDetalles', payloadDelete)
            .then((r) => {

                if (r.data.data.messageStatus == '1') {

                    axios.get(Global.url + 'Sucursal/Kilometraje?sucu_Id=' + parseInt(Sucursal.code) + '&' + 'cola_Id=' + parseInt(ColaboradorDelete))
                        .then((response) => {
                            setKilometrajeTotal(KilometrajeTotal - (response.data.data[0].cosu_DistanciaSucursal))
                        })
                        .catch(error => console.error(error))

                    hideDeleteModal();
                    setvide_Id("");
                    Pago()
                    DatosTabla(ViajeId);
                    ColaboradoresDDl(ViajeId);
                    toast.current.show({ severity: 'success', summary: 'Accion Exitosa', detail: 'Registro Eliminado Correctamente', life: 2000 });
                }
            })
            .catch((e) => {
                console.log(e)
                toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Ups, algo salió mal. ¡Inténtalo nuevamente!', life: 2000 });
            })
    }

    const Pago = () => {
        axios.get(Global.url + 'Viajes/PagoTransportista?id=' + parseInt(ViajeId))
            .then((response) => {
                console.log(response)
                setPagoTransportista(response.data.data[0].Pago)
                setKilometrajeTotal(response.data.data[0].Kilometraje)
            })
            .catch(error => console.error(error))
    }

    return (
        <div className='col-12'>
            <Toast ref={toast} />

            <div className="grid p-fluid">
                <div className='col-12'>
                    <div className="card" style={{ background: `rgb(105,101,235)`, height: '100px', width: '100%' }}>
                        <div className="row text-center d-flex align-items-center">
                            <h2 style={{ color: 'white' }}>Ingresar Viajes</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid p-fluid">
                <div className='col-6'>
                    <div className='card'>
                        <div className="grid p-fluid">

                            <div className='col-6'>
                                <div className="field">
                                    <label htmlFor="Sexo">Sucursal</label><br />
                                    <Dropdown optionLabel="name" placeholder="Selecionar" options={Sucursal_DDL} value={Sucursal} onChange={(e) => setSucursal(e.value)} disabled={Form1Activado} className={classNames({ 'p-invalid': submitted && !Sucursal })} />
                                    {submitted && !Sucursal && <small className="p-invalid" style={{ color: 'red' }}>Seleccione una opcion.</small>}
                                </div>
                            </div>

                            <div className='col-6'>
                                <div className="field">
                                    <label htmlFor="Sexo">Transportista</label><br />
                                    <Dropdown optionLabel="name" placeholder="Selecionar" options={Transportista_DDL} value={Transportista} onChange={(e) => setTransportista(e.value)} disabled={Form1Activado} className={classNames({ 'p-invalid': submitted && !Transportista })} />
                                    {submitted && !Transportista && <small className="p-invalid" style={{ color: 'red' }}>Seleccione una opcion.</small>}
                                </div>
                            </div>


                            <div className="col-6">
                                <div className="field">
                                    <label htmlFor="calendar">Fecha del Viaje</label>
                                    <Calendar inputId="calendar" disabled={Form1Activado} showIcon value={FechaViaje} onChange={(e) => setFechaViaje(e.target.value)} className={classNames({ 'p-invalid': submitted && !FechaViaje })} />
                                    {submitted && !FechaViaje && <small className="p-invalid" style={{ color: 'red' }}>El campo es requerido.</small>}
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="field">
                                </div>
                            </div>



                            <div className='col-6'>
                                <div className="field">
                                    <Button label="Cancelar" disabled={Form1Activado} icon="pi pi-times" severity="danger" onClick={() => router.push('./Viajes_index')} />
                                </div>
                            </div>

                            <div className='col-6'>
                                <div className="field">
                                    <Button label="Editar" disabled={Form1Activado} icon="pi pi-check" severity="success" onClick={EditarViajes} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className='col-6'>
                    <div className='card'>
                        <div className="grid p-fluid">

                            <div className='col-6'>
                                <div className="field">
                                    <label htmlFor="Sexo">Colaborador</label><br />
                                    <Dropdown optionLabel="name" placeholder="Selecionar" options={ColaboradoresDDL} value={Colaborador} onChange={(e) => { setColaborador(e.value); ColaboradorKilometraje(e.value) }} disabled={Form2Activado} className={classNames({ 'p-invalid': submitted2 && !Colaborador })} />
                                    {submitted2 && !Colaborador && <small className="p-invalid" style={{ color: 'red' }}>Seleccione una opcion.</small>}
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="field">
                                    <label htmlFor="inputtext">Kilometraje</label><br />
                                    <InputText type="text" disabled={true} value={Kilometraje} />
                                </div>
                            </div>


                            <div className='col-6'>
                                <div className="field">
                                    <Button label="Cancelar" disabled={Form2Activado} icon="pi pi-times" severity="danger" onClick={() => router.push('./Viajes_index')} />
                                </div>
                            </div>

                            <div className='col-6'>
                                <div className="field">
                                    <Button label="Guardar" disabled={Form2Activado} icon="pi pi-check" severity="success" onClick={IngresarViajesDeatlles} />
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className='col-12' style={{ marginTop: "-2rem" }}>
                        <div className="card" style={{ background: `rgb(105,101,235)`, height: '89px', width: '100%' }}>
                            <div className="row text-center d-flex align-items-center">
                                <h2 style={{ color: 'white' }}>{KilometrajeTotal} Km</h2>
                            </div>
                        </div>
                    </div>
                </div>



                <div className='col-12'>
                    <div className='card'>

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
                            header={header}
                            value={posts.filter((post) =>
                                post.cola_NombreCompleto.toLowerCase().includes(searchText.toLowerCase()) ||
                                post.cola_Identidad.toLowerCase().includes(searchText.toLowerCase())
                            )}
                        >
                            <Column field="cola_NombreCompleto" header="Nombre" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }} />
                            <Column field="cola_Identidad" header="Identidad" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }} />

                            <Column
                                field="acciones"
                                header="Acciones"
                                headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }}
                                style={{ minWidth: '300px' }}
                                body={rowData => (
                                    <div>
                                        <Button label="Eliminar" severity="danger" icon="pi pi-trash" outlined style={{ fontSize: '0.8rem' }} onClick={() => OpenDeleteModal(rowData.vide_Id, rowData.cola_Id)} />
                                    </div>
                                )}
                            />
                        </DataTable>
                    </div>
                </div>

                {/*modal para Eliminar Registros*/}
                <Dialog visible={DeleteModal} style={{ width: '450px' }} header="Eliminar Sucursales" onHide={hideDeleteModal} modal footer={
                    <>
                        <Button label="Cancelar" icon="pi pi-times" severity="danger" onClick={hideDeleteModal} />
                        <Button label="Confirmar" icon="pi pi-check" severity="success" onClick={EliminarDetalles} />
                    </>
                }>
                    <div className="flex align-items-center justify-content-center">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        <span>
                            ¿Desea eliminar este registro?
                        </span>
                    </div>
                </Dialog>
            </div>
        </div>
    )
}

export default App;