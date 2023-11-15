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


const App = () => {

    const router = useRouter();
    const toast = useRef(null); //para los toast
    const id = router.query.id; // optiene el id del resgitro a editar

    const [DeleteModal, setDeleteModal] = useState(false); //abrir el modal eliminar

    const [posts, setPosts] = useState([]);
    const [searchText, setSearchText] = useState(''); //para la barra de busqueda

    const [submitted, setSubmitted] = useState(false);
    const [submitted2, setSubmitted2] = useState(false);
    const [MunicipioSubmited, setMunicipioSubmited] = useState(false); //validar si municipio esta vacio

    const [SucursalId, setSucursalId] = useState(router.query.id);
    const [Sucursal, setSucursal] = useState("");
    const [DistanciaSucursal, setDistanciaSucursal] = useState('');
    const [cosu_Id, setcosu_Id] = useState("");

    const [DepartaemntoDDL, setDepartamentoDDL] = useState([]);//ddl Departemento 
    const [Deparatemento, setDepartamento] = useState('');//almacena el valor seleccionado del ddl 

    const [MunicipioDDL, setMunicipioDDL] = useState([]);//ddl Municipios
    const [Municipio, setMunicipio] = useState(''); // alamcena el valor del ddl
    const [MunicipioActivated, setMunicipioActivated] = useState(true);// almacena si el ddl esta activado

    const [ColaboradoresDDL, setColaboradoresDDL] = useState([]);
    const [Colaborador, setColaborador] = useState('')

    const [Direccion, setDireccion] = useState(''); //almecena la direccion

    const [Form1Activado, setForm1Activado] = useState(false)
    const [Form2Activado, setForm2Activado] = useState(true)

    useEffect(() => {

        var admin = 0;
        var pant_Id = 6;
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

                    axios.get(Global.url + 'Departamento/Listado')
                        .then(response => response.data)
                        .then((data) => setDepartamentoDDL(data.data.map((c) => ({ code: c.depa_Id, name: c.depa_Nombre }))))
                        .catch(error => console.error(error))

                    axios.get(Global.url + 'Sucursal/Buscar?id=' + id)
                        .then((r) => {
                            
                            setSucursal(r.data.sucu_Nombre);
                            setDireccion(r.data.sucu_Direccion);
                            setDepartamento({ code: r.data.depa_Id, name: r.data.depa_Nombre });
                            AsiganrlevalorMunicipioDDL(r.data.depa_Id, r.data);
                            ColaboradoresDDl(id)
                            DatosColaboradoresTabla(SucursalId)
                        })
                        .catch((e) => {
                            localStorage.setItem('Colaborador', '400');
                            router.push('./Colaboradores_index')
                        })
                }
                else {
                    router.push('/');
                }
            })

    }, []);

    //cargar
    const AsiganrlevalorMunicipioDDL = (depa_Id, datos) => {
        setMunicipioActivated(false);
        axios.get(Global.url + 'Municipio/Municipios_DDL?id=' + depa_Id)
            .then(response => response.data)
            .then((data) => setMunicipioDDL(data.data.map((c) => ({ code: c.muni_Id, name: c.muni_Nombre }))))
            .catch(error => console.error(error))

        setMunicipio({ code: datos.muni_Id, name: datos.muni_Nombre });
    }

    //activa el municipio cuando cambia de departamento
    const ActivarMunicipioDDl = (depa_Id) => {
        setMunicipio('');
        setMunicipioActivated(false);
        axios.get(Global.url + 'Municipio/Municipios_DDL?id=' + depa_Id)
            .then(response => response.data)
            .then((data) => setMunicipioDDL(data.data.map((c) => ({ code: c.muni_Id, name: c.muni_Nombre }))))
            .catch(error => console.error(error))
    }

    //mandar datos de ingresar a la api
    const EditarSucursal = (e) => {

        if (!Sucursal.trim() || !Deparatemento || !Municipio || !Direccion.trim()) {
            setSubmitted(true);

            if (Deparatemento && !Municipio) {
                setMunicipioSubmited(true);
            }
        }
        else {
            let payload = {
                sucu_Id: parseInt(id),
                sucu_Nombre: Sucursal.trim(),
                muni_Id: Municipio.code,
                sucu_Direccion: Direccion.trim(),
                sucu_UsuModificacion: parseInt(localStorage.getItem('usuID'))
            }
            axios.post(Global.url + 'Sucursal/Editar', payload)
                .then((r) => {
                    if (r.data.data.messageStatus == '1') {
                        setMunicipioActivated(true);
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

    const IngresarColaboradorPorSucursal = (e) => {

        if (!Colaborador || !DistanciaSucursal || DistanciaSucursal > 50 || DistanciaSucursal <= 0) {
            setSubmitted2(true);
        }
        else {
            let payload = {
                sucu_Id: parseInt(SucursalId),
                cola_Id: Colaborador.code,
                cosu_DistanciaSucursal: DistanciaSucursal,
                cosu_UsuCreacion: parseInt(localStorage.getItem('usuID'))
            }
            axios.post(Global.url + 'Sucursal/InsertarColaboradoresPorSucursal', payload)
                .then((r) => {
                    if (r.data.data.messageStatus == "1") {
                        setColaboradoresDDL([]);
                        setSubmitted2(false);
                        setColaborador("");
                        setDistanciaSucursal("");
                        ColaboradoresDDl(SucursalId)
                        DatosColaboradoresTabla(SucursalId)
                        toast.current.show({ severity: 'success', summary: 'Accion Exitosa', detail: 'Registro Ingresado Correctamente', life: 2000 });
                    }
                })
                .catch((e) => {
                    console.log(e)
                    toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Ups, algo salió mal. ¡Inténtalo nuevamente!', life: 2000 });
                })
        }
    }

    //activa el municipio cuando cambia de departamento
    const ColaboradoresDDl = (Id) => {
        axios.get(Global.url + 'Colaborador/Disponibles?Id=' + parseInt(Id))
            .then(response => response.data)
            .then((data) => setColaboradoresDDL(data.data.map((c) => ({ code: c.cola_Id, name: c.cola_NombreCompleto }))))
            .catch(error => console.error(error))
    }

    const DatosColaboradoresTabla = (Id) => {
        axios.get(Global.url + 'Sucursal/ListadoColaboradoresPorSucursal?Id=' + parseInt(Id))
            .then(response => response.data)
            .then(data => { setPosts(data.data) })
            .catch(error => console.error(error))
    }

    const header = (
        <div className="table-header">
            <div className="grid p-fluid">
                <div className="col-3">
                    <Button type="button" label="Finalizar" severity="info" icon="pi pi-upload" onClick={() => router.push('./sucursal_index')} />
                </div>

                <div className="col-9">
                    <span className="block p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText type="text" value={searchText} onChange={e => setSearchText(e.target.value)} placeholder="Buscar..." />
                    </span>
                </div>
            </div>


        </div>
    );


    /* MODAL ELIMINAR */
    //abrir modal eliminar
    const OpenDeleteModal = (id) => {
        setcosu_Id(id);
        setDeleteModal(true);
    }

    //cerrar modal eliminar
    const hideDeleteModal = () => {
        setcosu_Id(id);
        setDeleteModal(false);
    };

    const EliminarColaboradoresPorSucursal = (e) => {

        let payloadDelete = {
            cosu_Id: parseInt(cosu_Id),
        }
        axios.post(Global.url + 'Sucursal/EliminarColaboradoresPorSucursal', payloadDelete)
            .then((r) => {
                if (r.data.data.messageStatus == '1') {
                    hideDeleteModal();
                    setcosu_Id("");
                    DatosColaboradoresTabla(SucursalId);
                    ColaboradoresDDl(SucursalId);
                    toast.current.show({ severity: 'success', summary: 'Accion Exitosa', detail: 'Registro Eliminado Correctamente', life: 2000 });
                }
            })
            .catch((e) => {
                console.log(e)
                toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Ups, algo salió mal. ¡Inténtalo nuevamente!', life: 2000 });
            })
    }

    return (
        <div className='col-12'>
            <Toast ref={toast} />

            <div className="grid p-fluid">
                <div className='col-12'>
                    <div className="card" style={{ background: `rgb(105,101,235)`, height: '100px', width: '100%' }}>
                        <div className="row text-center d-flex align-items-center">
                            <h2 style={{ color: 'white' }}>Ingresar Sucursales</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid p-fluid">
                <div className='col-7'>
                    <div className='card'>
                        <div className="grid p-fluid">

                            <div className="col-6">
                                <div className="field">
                                    <label htmlFor="inputtext">Nombres</label><br />
                                    <InputText type="text" disabled={Form1Activado} value={Sucursal} onChange={(e) => setSucursal(e.target.value)} className={classNames({ 'p-invalid': submitted && !Sucursal.trim() })} />
                                    {submitted && !Sucursal.trim() && <small className="p-invalid" style={{ color: 'red' }}>El campo es requerido.</small>}
                                </div>
                            </div>

                            <div className='col-6'>
                                <div className="field">
                                    <label htmlFor="Sexo">Departamento</label><br />
                                    <Dropdown optionLabel="name" disabled={Form1Activado} placeholder="Seleccionar" options={DepartaemntoDDL} value={Deparatemento} onChange={(e) => { setDepartamento(e.value); ActivarMunicipioDDl(e.value.code); }} className={classNames({ 'p-invalid': submitted && !Deparatemento })} />
                                    {submitted && !Deparatemento && <small className="p-invalid" style={{ color: 'red' }}>Seleccione una opcion.</small>}
                                </div>
                            </div>

                            <div className='col-6'>
                                <div className="field">
                                    <label htmlFor="Sexo">Municipio</label><br />
                                    <Dropdown optionLabel="name" placeholder="Selecionar" options={MunicipioDDL} value={Municipio} onChange={(e) => setMunicipio(e.value)} disabled={MunicipioActivated} className={classNames({ 'p-invalid': MunicipioSubmited && !Municipio })} />
                                    {MunicipioSubmited && !Municipio && <small className="p-invalid" style={{ color: 'red' }}>Seleccione una opcion.</small>}
                                </div>
                            </div>

                            <div className='col-12'>
                                <div className="field">
                                    <label htmlFor="Sexo">Direccion</label><br />
                                    <InputText placeholder="" disabled={Form1Activado} autoResize rows="3" cols="30" value={Direccion} onChange={(e) => setDireccion(e.target.value)} className={classNames({ 'p-invalid': submitted && !Direccion })} />
                                    {submitted && !Direccion.trim() && <small className="p-invalid" style={{ color: 'red' }}>El campo es requerido.</small>}
                                </div>
                            </div>

                            <div className='col-6'>
                                <div className="field">
                                    <Button label="Cancelar" disabled={Form1Activado} icon="pi pi-times" severity="danger" onClick={() => router.push('./sucursal_index')} />
                                </div>
                            </div>

                            <div className='col-6'>
                                <div className="field">
                                    <Button label="Guardar" disabled={Form1Activado} icon="pi pi-check" severity="success" onClick={EditarSucursal} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className='col-5'>
                    <div className='card'>
                        <div className="grid p-fluid">

                            <div className='col-12 mt-6'>
                                <div className="field">
                                    <label htmlFor="Sexo">Colaborador</label><br />
                                    <Dropdown optionLabel="name" placeholder="Selecionar" options={ColaboradoresDDL} value={Colaborador} onChange={(e) => setColaborador(e.value)} disabled={Form2Activado} className={classNames({ 'p-invalid': submitted2 && !Colaborador })} />
                                    {submitted2 && !Colaborador && <small className="p-invalid" style={{ color: 'red' }}>Seleccione una opcion.</small>}
                                </div>
                            </div>

                            <div className='col-12 mt-7'>
                                <div className="field">
                                    <label htmlFor="Sexo">Distancia Sucursal (en Kilometros)</label><br />
                                    <InputText
                                        type="text"
                                        id="inputtext"
                                        value={DistanciaSucursal}
                                        disabled={Form2Activado}
                                        onChange={(e) => setDistanciaSucursal(e.target.value)}
                                        onKeyPress={(event) => {
                                            if (!/[.0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }}
                                        className={classNames({ 'p-invalid': submitted2 && !DistanciaSucursal })}
                                    />
                                    {submitted2 && !DistanciaSucursal.trim() && <small className="p-invalid" style={{ color: 'red' }}>El campo es requerido.</small>}
                                    {parseInt(DistanciaSucursal) > 50 && <small className="p-invalid" style={{ color: 'red' }}>La distancia no pueder ser  mayor a 50 Km.</small>}
                                    {parseInt(DistanciaSucursal) <= 0 && <small className="p-invalid" style={{ color: 'red' }}>La distancia no pueder ser 0 Km.</small>}
                                </div>
                            </div>

                            <div className='col-6'>
                                <div className="field">
                                    <Button label="Cancelar" disabled={Form2Activado} icon="pi pi-times" severity="danger" onClick={() => router.push('./sucursal_index')} />
                                </div>
                            </div>

                            <div className='col-6'>
                                <div className="field">
                                    <Button label="Agregar" disabled={Form2Activado} icon="pi pi-check" severity="success" onClick={IngresarColaboradorPorSucursal} />
                                </div>
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
                                post.cola_identidad.toLowerCase().includes(searchText.toLowerCase())
                            )}

                        >
                            <Column field="cola_NombreCompleto" header="Nombre" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }} />
                            <Column field="cola_identidad" header="Identidad" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }} />
                            <Column field="cosu_DistanciaSucursal" header="Distancia (KM)" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }} />

                            <Column
                                field="acciones"
                                header="Acciones"
                                headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }}
                                style={{ minWidth: '300px' }}
                                body={rowData => (
                                    <div>
                                        <Button label="Eliminar" severity="danger" icon="pi pi-trash" outlined style={{ fontSize: '0.8rem' }} onClick={() => OpenDeleteModal(rowData.cosu_Id)} />
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
                        <Button label="Confirmar" icon="pi pi-check" severity="success" onClick={EliminarColaboradoresPorSucursal} />
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