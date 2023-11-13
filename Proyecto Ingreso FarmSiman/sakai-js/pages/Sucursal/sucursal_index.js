import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Global from '../api/Global';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import axios from 'axios'
import { classNames } from 'primereact/utils';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { useRouter } from 'next/router';

const App = () => {

    const router = useRouter();

    const [posts, setPosts] = useState([]);
    const [searchText, setSearchText] = useState(''); //para la barra de busqueda

    const [CreateModal, setCreateModal] = useState(false); // abrir el modal crear
    const [DeleteModal, setDeleteModal] = useState(false); //abrir el modal eliminar
    const [EditModal, setEditModal] = useState(false);//abrir el modal editar

    const [submitted, setSubmitted] = useState(false);
    const [MunicipioSubmited, setMunicipioSubmited] = useState(false); //validar si municipio esta vacio

    const toast = useRef(null); //para los toast

    const [error, setError] = useState('');

    const [SucursalId, setSucursalId] = useState("");
    const [Sucursal, setSucursal] = useState("");

    const [DepartaemntoDDL, setDepartamentoDDL] = useState([]);//ddl Departemento 
    const [Deparatemento, setDepartamento] = useState('');//almacena el valor seleccionado del ddl 

    const [MunicipioDDL, setMunicipioDDL] = useState([]);//ddl Municipios
    const [Municipio, setMunicipio] = useState(''); // alamcena el valor del ddl
    const [MunicipioActivated, setMunicipioActivated] = useState(true);// almacena si el ddl esta activado

    const [Direccion, setDireccion] = useState(''); //almecena la direccion

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        var admin = 0;
        var pant_Id = 11;
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
                    const url = Global.url + 'Sucursal/Listado';

                    if (loading) {
                        fetch(url)
                            .then(response => response.json())
                            .then(data => {
                                setPosts(data.data);
                                setLoading(false);
                            })
                            .catch((e) => {
                                toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Ups, algo salió mal. ¡Inténtalo nuevamente!', life: 2000 });
                            })
                    }
                }
                else {
                    router.push('/');
                }

            })
    }, [loading]);


    //cargar ddl Departamento
    useEffect(() => {
        axios.get(Global.url + 'Departamento/Listado')
            .then(response => response.data)
            .then((data) => setDepartamentoDDL(data.data.map((c) => ({ code: c.depa_Id, name: c.depa_Nombre }))))
            .catch(error => console.error(error))
    }, []);


    //cerrar modal crear
    const hideDialog = () => {
        setSubmitted(false);
        setMunicipioSubmited(false);
        setSucursal('');
        setDireccion('');
        setDepartamento('');
        setMunicipio('');
        setCreateModal(false);
    };

    //mandar datos de ingresar a la api
    const IngresarSucursal = (e) => {

        if (!Sucursal.trim() || !Deparatemento || !Municipio || !Direccion.trim()) {
            setSubmitted(true);

            if (Deparatemento && !Municipio) {
                setMunicipioSubmited(true);
            }

        }
        else {
            let payload = {
                sucu_Nombre: Sucursal.trim(),
                muni_Id: Municipio.code,
                sucu_Direccion: Direccion.trim(),
                sucu_UsuCreacion: parseInt(localStorage.getItem('usuID'))
            }
            axios.post(Global.url + 'Sucursal/Insertar', payload)
                .then((r) => {
                    if (r.data.data.messageStatus == '1') {
                        hideDialog();
                        setLoading(true);
                        toast.current.show({ severity: 'success', summary: 'Accion Exitosa', detail: 'Registro Ingresado Correctamente', life: 2000 });
                    }
                })
                .catch((e) => {
                    toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Ups, algo salió mal. ¡Inténtalo nuevamente!', life: 2000 });
                })
        }


    }

    //activa el municipio cuando cambia de departamento
    const ActivarMunicipioDDl = (depa_Id) => {
        console.log(depa_Id)
        setMunicipio('');
        setMunicipioActivated(false);
        axios.get(Global.url + 'Municipio/Municipios_DDL?id=' + depa_Id)
            .then(response => response.data)
            .then((data) => setMunicipioDDL(data.data.map((c) => ({ code: c.muni_Id, name: c.muni_Nombre }))))
            .catch(error => console.error(error))
    }

    /* MODAL ELIMINAR */
    //abrir modal eliminar
    const OpenDeleteModal = (id) => {
        setSucursalId(id);
        setDeleteModal(true);
    }

    //cerrar modal eliminar
    const hideDeleteModal = () => {
        setSucursal("");
        setDeleteModal(false);
    };

    //mandar datos del eliminar a la api
    const EliminarCategorias = (e) => {

        let payloadDelete = {
            sucu_Id: SucursalId,
        }
        axios.post(Global.url + 'Sucursal/Eliminar', payloadDelete)
            .then((r) => {
                if(r.data.data.messageStatus == '1'){
                    hideDeleteModal();
                    setSucursalId("");
                    setLoading(true);
                    toast.current.show({ severity: 'success', summary: 'Accion Exitosa', detail: 'Registro Eliminado Correctamente', life: 2000 });
                }
            })
            .catch((e) => {
                toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Ups, algo salió mal. ¡Inténtalo nuevamente!', life: 2000 });
            })
    }

    /* MODAL EDITAR */
    //traer los datos para el editar
    const LlamarDatosEdit = (id) => {
        axios.get(Global.url + 'Sucursal/Buscar?id=' + id)
            .then((r) => {
                return r.data; // La respuesta ya está en formato JSON
            })
            .then((data) => {
                setSucursal(data.sucu_Nombre)

                var codeDepto = { code: data.depa_Id, name: data.depa_Nombre }
                setDepartamento(codeDepto);

                AsiganrlevalorMunicipioDDL(codeDepto.code, data)

                setDireccion(data.sucu_Direccion)

                setEditModal(true)
                setSucursalId(id);
            })
            .catch(error => console.error(error))
    }

    //cargar MunicipioDDL
    const AsiganrlevalorMunicipioDDL = (depa_Id, datos) => {
        setMunicipioActivated(false);
        axios.put(Global.url + 'Municipio/Municipios_DDL?id=' + depa_Id)
            .then(response => response.data)
            .then((data) => setMunicipioDDL(data.data.map((c) => ({ code: c.muni_Id, name: c.muni_Nombre }))))
            .catch(error => console.error(error))

        var codeMuni = { code: datos.muni_Id, name: datos.muni_Nombre }
        setMunicipio(codeMuni);
    }

    //cerrar modal Editar
    const hideEditModal = () => {
        setSucursal('');
        setDepartamento('');
        setMunicipio('');
        setDireccion('');
        setSubmitted(false);
        setMunicipioSubmited(false);
        setEditModal(false);
    };


    //Mandar la categoria ya editada a la api
    const DatosEditados = (e) => {

        if (!Sucursal.trim() || !Deparatemento || !Municipio || !Direccion.trim()) {
            setSubmitted(true);

            if (Deparatemento && !Municipio) {
                setMunicipioSubmited(true);
            }
        }
        else {

            let payloadEdit = {
                sucu_Id: parseInt(SucursalId),
                sucu_Nombre: Sucursal.trim(),
                muni_Id: Municipio.code,
                sucu_Direccion: Direccion.trim(),
                sucu_UsuModificacion: parseInt(localStorage.getItem('usuID'))
            }
            axios.post(Global.url + 'Sucursal/Editar', payloadEdit)
                .then((r) => {
                    if(r.data.data.messageStatus == '1'){
                        hideEditModal();
                        setLoading(true);
                        toast.current.show({ severity: 'success', summary: 'Accion Exitosa', detail: 'Registro Editado Correctamente', life: 2000 });
                    }
                })
                .catch((e) => {
                    toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Ups, algo salió mal. ¡Inténtalo nuevamente!', life: 2000 });
                })
        }
    }



    const header = (
        <div className="table-header flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <div className="grid">
                <div className="col-12">
                    <Button type="button" label="Nuevo" severity="success" outlined icon="pi pi-upload" onClick={() => setCreateModal(true)} />
                </div>
            </div>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="text" value={searchText} onChange={e => setSearchText(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    return (
        <div className="grid">
            <div className="col-12">

                <div className="card" style={{ background: `rgb(105,101,235)`, height: '100px', width: '100%' }}>
                    <div className="row text-center d-flex align-items-center">
                        <h2 style={{ color: 'white' }}>Sucursales</h2>
                    </div>
                </div>


                <div className="card">
                    <Toast ref={toast} />
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
                            post.sucu_Nombre.toLowerCase().includes(searchText.toLowerCase()) ||
                            post.muni_Nombre.toLowerCase().includes(searchText.toLowerCase()) ||
                            post.depa_Nombre.toLowerCase().includes(searchText.toLowerCase())

                        )}

                    >
                        <Column field="sucu_Nombre" header="Nombre" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }} />
                        <Column field="muni_Nombre" header="Municipio" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }} />
                        <Column field="depa_Nombre" header="Departamento" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }} />

                        <Column
                            field="acciones"
                            header="Acciones"
                            headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }}
                            style={{ minWidth: '300px' }}
                            body={rowData => (
                                <div>
                                    <Button label="Detalles" severity="info" icon="pi pi-eye" outlined style={{ fontSize: '0.8rem' }} /> .
                                    <Button label="Editar" severity="warning" icon="pi pi-upload" outlined style={{ fontSize: '0.8rem' }} onClick={() => LlamarDatosEdit(rowData.sucu_Id)} /> .
                                    <Button label="Eliminar" severity="danger" icon="pi pi-trash" outlined style={{ fontSize: '0.8rem' }} onClick={() => OpenDeleteModal(rowData.sucu_Id)} />
                                </div>
                            )}
                        />
                    </DataTable>

                    {/*modal para Ingresar datos*/}
                    <Dialog
                        visible={CreateModal}
                        style={{ width: '500px' }}
                        header="Ingresar Sucursal"
                        modal
                        className="p-fluid"
                        onHide={hideDialog}
                        footer={
                            <div>
                                <Button label="Cancelar" icon="pi pi-times" severity="danger" onClick={hideDialog} />
                                <Button label="Guardar" icon="pi pi-check" severity="success" onClick={IngresarSucursal} />
                            </div>
                        }
                    >
                        <div className="col-12">
                            <div className="grid p-fluid">
                                <div className="col-6">
                                    <div className="field">
                                        <label htmlFor="inputtext">Nombre</label><br />
                                        <InputText type="text" id="inputtext" value={Sucursal} onChange={(e) => setSucursal(e.target.value)} className={classNames({ 'p-invalid': submitted && !Sucursal })} />
                                        {submitted && !Sucursal.trim() && <small className="p-invalid" style={{ color: 'red' }}>El campo es requerido.</small>}
                                    </div>
                                </div>

                                <div className='col-6'>
                                    <div className="field">
                                        <label htmlFor="Sexo">Departamento</label><br />
                                        <Dropdown optionLabel="name" placeholder="Seleccionar" options={DepartaemntoDDL} value={Deparatemento} onChange={(e) => { setDepartamento(e.value); ActivarMunicipioDDl(e.value.code); }} className={classNames({ 'p-invalid': submitted && !Deparatemento })} />
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
                                        <InputTextarea placeholder="" autoResize rows="3" cols="30" value={Direccion} onChange={(e) => setDireccion(e.target.value)} className={classNames({ 'p-invalid': submitted && !Direccion })} />
                                        {submitted && !Direccion.trim() && <small className="p-invalid" style={{ color: 'red' }}>El campo es requerido.</small>}
                                    </div>
                                </div>
                            </div>


                        </div>
                    </Dialog>

                    {/*modal para editar datos*/}
                    <Dialog
                        visible={EditModal}
                        style={{ width: '500px' }}
                        header="Editar Sucursal"
                        modal
                        className="p-fluid"
                        onHide={hideEditModal}
                        footer={
                            <div>
                                <Button label="Cancelar" icon="pi pi-times" severity="danger" onClick={hideEditModal} />
                                <Button label="Guardar" icon="pi pi-check" severity="success" onClick={DatosEditados} />
                            </div>
                        }
                    >
                        <div className="col-12">
                            <div className="grid p-fluid">
                                <div className="col-6">
                                    <div className="field">
                                        <label htmlFor="inputtext">Nombre</label><br />
                                        <InputText type="text" id="inputtext" value={Sucursal} onChange={(e) => setSucursal(e.target.value)} className={classNames({ 'p-invalid': submitted && !Sucursal })} />
                                        {submitted && !Sucursal.trim() && <small className="p-invalid" style={{ color: 'red' }}>El campo es requerido.</small>}
                                    </div>
                                </div>

                                <div className='col-6'>
                                    <div className="field">
                                        <label htmlFor="Sexo">Departamento</label><br />
                                        <Dropdown optionLabel="name" placeholder="Seleccionar" options={DepartaemntoDDL} value={Deparatemento} onChange={(e) => { setDepartamento(e.value); ActivarMunicipioDDl(e.value.code); }} className={classNames({ 'p-invalid': submitted && !Deparatemento })} />
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
                                        <InputTextarea placeholder="" autoResize rows="3" cols="30" value={Direccion} onChange={(e) => setDireccion(e.target.value)} className={classNames({ 'p-invalid': submitted && !Direccion })} />
                                        {submitted && !Direccion.trim() && <small className="p-invalid" style={{ color: 'red' }}>El campo es requerido.</small>}
                                    </div>
                                </div>
                            </div>


                        </div>
                    </Dialog>



                    {/*modal para Eliminar Registros*/}
                    <Dialog visible={DeleteModal} style={{ width: '450px' }} header="Eliminar Sucursales" onHide={hideDeleteModal} modal footer={
                        <>
                            <Button label="Cancelar" icon="pi pi-times" severity="danger" onClick={hideDeleteModal} />
                            <Button label="Confirmar" icon="pi pi-check" severity="success" onClick={EliminarCategorias} />
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
        </div>
    )
}

export default App;

