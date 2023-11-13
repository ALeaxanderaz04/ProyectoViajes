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
import { InputMask } from 'primereact/inputmask';
import { useRouter } from 'next/router';



const App = () => {

    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [searchText, setSearchText] = useState(''); //para la barra de busqueda

    const [CreateModal, setCreateModal] = useState(false); // abrir el modal crear
    const [DeleteModal, setDeleteModal] = useState(false); //abrir el modal eliminar
    const [EditModal, setEditModal] = useState(false);//abrir el modal editar

    const toast = useRef(null); //para los toast
    const [submitted, setSubmitted] = useState(false);

    const [MunicipioId, setMunicipioId] = useState("");
    const [Municipio, setMunicipio] = useState("");
    const [CodigoMuni, setCodigoMuni] = useState("");

    const [DepartaemntoDDL, setDepartamentoDDL] = useState([]);//ddl Departemento 
    const [Deparatemento, setDepartamento] = useState('');//almacena el valor seleccionado del ddl 

    const [loading, setLoading] = useState(true);

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

        axios.put(Global.url + `Pantalla/AccesoPantalla?esAdmin=${admin}&role_Id=${role_Id}&pant_Id=${pant_Id}`)
            .then((r) => {

                if (r.data[0][""] == 1) {

                    const url = Global.url + 'Municipio/Listado/';

                    if (loading) {
                        fetch(url)
                            .then(response => response.json())
                            .then(data => {
                                setPosts(data.data);
                                setLoading(false);
                            });
                    }

                }
                else{
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

        setDepartamento('');
        setMunicipio('');
        setCodigoMuni('');
        setCreateModal(false);
    };

    //mandar datos de ingresar a la api
    const IngresarMunicipio = (e) => {

        if (!CodigoMuni || !Deparatemento || !Municipio) {
            setSubmitted(true);
        }
        else {
            let payload = {
                muni_Nombre: Municipio,
                muni_Codigo: CodigoMuni,
                depa_Id: Deparatemento.code,
                muni_UsuCreacion: 1
            }
            axios.post(Global.url + 'Municipio/Insertar', payload)
                .then((r) => {

                    if (r.data.data.codeStatus == 2) {
                        toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Ya existe un Municipio con ese Codigo!', life: 2000 });
                    }
                    else {

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


    /* MODAL ELIMINAR */
    //abrir modal eliminar
    const OpenDeleteModal = (id) => {
        setMunicipioId(id);
        setDeleteModal(true);
    }

    //cerrar modal eliminar
    const hideDeleteModal = () => {
        setMunicipioId("");
        setDeleteModal(false);
    };

    //mandar datos del eliminar a la api
    const EliminarMunicipios = (e) => {

        let payloadDelete = {
            muni_Id: MunicipioId,
        }
        axios.post(Global.url + 'Municipio/Eliminar', payloadDelete)
            .then((r) => {
                setLoading(true);
                hideDeleteModal();
                setMunicipioId("");
                toast.current.show({ severity: 'success', summary: 'Accion Exitosa', detail: 'Registro Eliminado Correctamente', life: 1500 });
            })
            .catch((e) => {
                toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Ups, algo salió mal. ¡Inténtalo nuevamente!', life: 2000 });
            })
    }

    /* MODAL EDITAR */
    //traer los datos para el editar
    const LlamarDatosEdit = (id) => {
        axios.get(Global.url + 'Municipio/Buscar?id=' + id)
            .then((r) => {
                return r.data; // La respuesta ya está en formato JSON
            })
            .then((data) => {
                setMunicipioId(data.muni_Id);
                setMunicipio(data.muni_Nombre);
                setCodigoMuni(data.muni_Codigo);

                var codeDepto = { code: data.depa_Id, name: data.muni_UsuCreacion }
                setDepartamento(codeDepto);

                setEditModal(true)

            })
            .catch(error => console.error(error))
    }

    //cerrar modal Editar
    const hideEditModal = () => {
        setSubmitted(false);

        setDepartamento('');
        setMunicipio('');
        setCodigoMuni('');
        setMunicipioId('');
        setEditModal(false);
    };


    //Mandar la categoria ya editada a la api
    const DatosEditados = (e) => {

        if (!CodigoMuni || !Deparatemento || !Municipio) {
            setSubmitted(true);

        }
        else {

            let payloadEdit = {
                muni_Id: parseInt(MunicipioId),
                muni_Nombre: Municipio,
                muni_Codigo: CodigoMuni,
                depa_Id: Deparatemento.code,
                muni_UsuModificacion: 1
            }
            console.log(payloadEdit)
            axios.post(Global.url + 'Municipio/Editar', payloadEdit)
                .then((r) => {

                    if (r.data.data.codeStatus == 2) {
                        toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Ya existe un Municipio con ese Codigo!', life: 2000 });
                    }
                    else {
                        hideEditModal();
                        setLoading(true);
                        toast.current.show({ severity: 'success', summary: 'Accion Exitosa', detail: 'Registro Editado Correctamente', life: 1500 });
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
                        <h2 style={{ color: 'white' }}>Municipios</h2>
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
                            post.muni_Codigo.toLowerCase().includes(searchText.toLowerCase()) ||
                            post.muni_Nombre.toLowerCase().includes(searchText.toLowerCase()) ||
                            post.muni_UsuCreacion.toLowerCase().includes(searchText.toLowerCase())
                        )}

                    >
                        <Column field="muni_Codigo" header="Nombre" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }} />
                        <Column field="muni_Nombre" header="Municipio" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }} />
                        <Column field="muni_UsuCreacion" header="Departamento" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }} />

                        <Column
                            field="acciones"
                            header="Acciones"
                            headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }}
                            style={{ minWidth: '300px' }}
                            body={rowData => (
                                <div>
                                    <Button label="Detalles" severity="info" icon="pi pi-eye" outlined style={{ fontSize: '0.8rem' }} /> .
                                    <Button label="Editar" severity="warning" icon="pi pi-upload" outlined style={{ fontSize: '0.8rem' }} onClick={() => LlamarDatosEdit(rowData.muni_Id)} /> .
                                    <Button label="Eliminar" severity="danger" icon="pi pi-trash" outlined style={{ fontSize: '0.8rem' }} onClick={() => OpenDeleteModal(rowData.muni_Id)} />
                                </div>
                            )}
                        />
                    </DataTable>

                    {/*modal para Ingresar datos*/}
                    <Dialog
                        visible={CreateModal}
                        style={{ width: '500px' }}
                        header="Ingresar Municipios"
                        modal
                        className="p-fluid"
                        onHide={hideDialog}
                        footer={
                            <div>
                                <Button label="Cancelar" icon="pi pi-times" severity="danger" onClick={hideDialog} />
                                <Button label="Guardar" icon="pi pi-check" severity="success" onClick={IngresarMunicipio} />
                            </div>
                        }
                    >
                        <div className="col-12">
                            <div className="grid p-fluid">

                                <div className="col-6">
                                    <div className="field">
                                        <label htmlFor="inputtext">Codigo</label><br />
                                        <InputMask id="inputmaskIdentidad" mask="9999" value={CodigoMuni} onChange={(e) => setCodigoMuni(e.target.value)} className={classNames({ 'p-invalid': submitted && !CodigoMuni })} />
                                        {submitted && !CodigoMuni && <small className="p-invalid" style={{ color: 'red' }}>El campo es requerido.</small>}
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="field">
                                        <label htmlFor="inputtext">Nombre</label><br />
                                        <InputText type="text" id="inputtext" value={Municipio} onChange={(e) => setMunicipio(e.target.value)} className={classNames({ 'p-invalid': submitted && !Municipio })} />
                                        {submitted && !Municipio && <small className="p-invalid" style={{ color: 'red' }}>El campo es requerido.</small>}
                                    </div>
                                </div>


                                <div className='col-6'>
                                    <div className="field">
                                        <label htmlFor="Sexo">Departamento</label><br />
                                        <Dropdown optionLabel="name" placeholder="Seleccionar" options={DepartaemntoDDL} value={Deparatemento} onChange={(e) => { setDepartamento(e.value) }} className={classNames({ 'p-invalid': submitted && !Deparatemento })} />
                                        {submitted && !Deparatemento && <small className="p-invalid" style={{ color: 'red' }}>Seleccione una opcion.</small>}
                                    </div>
                                </div>

                            </div>


                        </div>
                    </Dialog>

                    {/*modal para editar datos*/}
                    <Dialog
                        visible={EditModal}
                        style={{ width: '500px' }}
                        header="Editar Municipios"
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
                                        <label htmlFor="inputtext">Codigo</label><br />
                                        <InputMask id="inputmaskIdentidad" mask="9999" value={CodigoMuni} onChange={(e) => setCodigoMuni(e.target.value)} className={classNames({ 'p-invalid': submitted && !CodigoMuni })} />
                                        {submitted && !CodigoMuni && <small className="p-invalid" style={{ color: 'red' }}>El campo es requerido.</small>}
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="field">
                                        <label htmlFor="inputtext">Nombre</label><br />
                                        <InputText type="text" id="inputtext" value={Municipio} onChange={(e) => setMunicipio(e.target.value)} className={classNames({ 'p-invalid': submitted && !Municipio })} />
                                        {submitted && !Municipio && <small className="p-invalid" style={{ color: 'red' }}>El campo es requerido.</small>}
                                    </div>
                                </div>


                                <div className='col-6'>
                                    <div className="field">
                                        <label htmlFor="Sexo">Departamento</label><br />
                                        <Dropdown optionLabel="name" placeholder="Seleccionar" options={DepartaemntoDDL} value={Deparatemento} onChange={(e) => { setDepartamento(e.value) }} className={classNames({ 'p-invalid': submitted && !Deparatemento })} />
                                        {submitted && !Deparatemento && <small className="p-invalid" style={{ color: 'red' }}>Seleccione una opcion.</small>}
                                    </div>
                                </div>
                            </div>


                        </div>
                    </Dialog>



                    {/*modal para Eliminar Registros*/}
                    <Dialog visible={DeleteModal} style={{ width: '450px' }} header="Eliminar Sucursales" onHide={hideDeleteModal} modal footer={
                        <>
                            <Button label="Cancelar" icon="pi pi-times" severity="danger" onClick={hideDeleteModal} />
                            <Button label="Confirmar" icon="pi pi-check" severity="success" onClick={EliminarMunicipios} />
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

