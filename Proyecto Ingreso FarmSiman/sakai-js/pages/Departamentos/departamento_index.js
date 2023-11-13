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
import { useRouter } from 'next/router';


const App = () => {

    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [searchText, setSearchText] = useState(''); //para la barra de busqueda

    const [CreateModal, setCreateModal] = useState(false); // abrir el modal crear
    const [DeleteModal, setDeleteModal] = useState(false); //abrir el modal eliminar
    const [EditModal, setEditModal] = useState(false);//abrir el modal editar

    const [submitted, setSubmitted] = useState(false);

    const toast = useRef(null); //para los toas

    const [DepartamentoId, setDepartamentoId] = useState("");
    const [Departamento, setDepartamento] = useState("");


    const [loading, setLoading] = useState(true);

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

        axios.put(Global.url + `Pantalla/AccesoPantalla?esAdmin=${admin}&role_Id=${role_Id}&pant_Id=${pant_Id}`)
            .then((r) => {


                if (r.data[0][""] == 1) {

                    const url = Global.url + 'Departamento/Listado';

                    if (loading) {
                        fetch(url)
                            .then(response => response.json())
                            .then(data => {
                                setPosts(data.data);
                                setLoading(false);
                            });
                    }
                }
                else {
                    router.push('/');
                }
            })
    }, [loading]);

    //cerrar modal crear
    const hideDialog = () => {
        setSubmitted(false);
        setDepartamento('');
        setCreateModal(false);
    };

    //mandar datos de ingresar a la api
    const IngresarDepartamentos = (e) => {

        if (!Departamento) {
            setSubmitted(true);
        }
        else {
            let payload = {
                depa_Nombre: Departamento,
                depa_UsuCreacion: 1
            }
            axios.post(Global.url + 'Departamento/Insertar', payload)
                .then((r) => {

                    if (r.data.data.codeStatus == 2) {
                        toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Ya existe un Departamento con ese nombre!', life: 2000 });
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
        setDepartamentoId(id);
        setDeleteModal(true);
    }

    //cerrar modal eliminar
    const hideDeleteModal = () => {
        setDepartamentoId("");
        setDeleteModal(false);
    };

    //mandar datos del eliminar a la api
    const EliminarDepartamentos = (e) => {

        let payloadDelete = {
            depa_Id: parseInt(DepartamentoId),
        }
        axios.post(Global.url + 'Departamento/Eliminar', payloadDelete)
            .then((r) => {
                setLoading(true);
                hideDeleteModal();
                setDepartamentoId("");
                toast.current.show({ severity: 'success', summary: 'Accion Exitosa', detail: 'Registro Eliminado Correctamente', life: 1500 });
            })
            .catch((e) => {
                toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Ups, algo salió mal. ¡Inténtalo nuevamente!', life: 2000 });
            })
    }

    /* MODAL EDITAR */
    //traer los datos para el editar
    const LlamarDatosEdit = (id) => {
        axios.get(Global.url + 'Departamento/Buscar?id=' + id)
            .then((r) => {
                return r.data; // La respuesta ya está en formato JSON
            })
            .then((data) => {
                setDepartamento(data.depa_Nombre)
                setDepartamentoId(id);

                setEditModal(true)
            })
            .catch(error => console.error(error))
    }


    //cerrar modal Editar
    const hideEditModal = () => {
        setDepartamentoId('');
        setDepartamento('');
        setSubmitted(false);
        setEditModal(false);
    };


    //Mandar la categoria ya editada a la api
    const DatosEditados = (e) => {

        if (!Departamento) {
            setSubmitted(true);
        }
        else {

            let payloadEdit = {
                depa_Id: parseInt(DepartamentoId),
                depa_Nombre: Departamento,
                depa_UsuCreacion: 1
            }
            console.log(payloadEdit)
            axios.post(Global.url + 'Departamento/Editar', payloadEdit)
                .then((r) => {

                    if (r.data.data.codeStatus == 2) {
                        toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Ya existe un Departamento con ese nombre!', life: 2000 });
                    }
                    else {
                        hideEditModal(false);
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
                        <h2 style={{ color: 'white' }}>Departamentos</h2>
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
                            post.depa_Codigo.toLowerCase().includes(searchText.toLowerCase()) ||
                            post.depa_Nombre.toLowerCase().includes(searchText.toLowerCase())
                        )}

                    >
                        <Column field="depa_Codigo" header="Codigo" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }} />
                        <Column field="depa_Nombre" header="Nombre" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }} />
                        <Column
                            field="acciones"
                            header="Acciones"
                            headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }}
                            style={{ minWidth: '300px' }}
                            body={rowData => (
                                <div>
                                    <Button label="Detalles" severity="info" icon="pi pi-eye" outlined style={{ fontSize: '0.8rem' }} /> .
                                    <Button label="Editar" severity="warning" icon="pi pi-upload" outlined style={{ fontSize: '0.8rem' }} onClick={() => LlamarDatosEdit(rowData.depa_Id)} /> .
                                    <Button label="Eliminar" severity="danger" icon="pi pi-trash" outlined style={{ fontSize: '0.8rem' }} onClick={() => OpenDeleteModal(rowData.depa_Id)} />
                                </div>
                            )}
                        />
                    </DataTable>

                    {/*modal para Ingresar datos*/}
                    <Dialog
                        visible={CreateModal}
                        style={{ width: '400px' }}
                        header="Ingresar Departamentos"
                        modal
                        className="p-fluid"
                        onHide={hideDialog}
                        footer={
                            <div>
                                <Button label="Cancelar" icon="pi pi-times" severity="danger" onClick={hideDialog} />
                                <Button label="Guardar" icon="pi pi-check" severity="success" onClick={IngresarDepartamentos} />
                            </div>
                        }
                    >
                        <div className="col-12">
                            <div className="grid p-fluid">
                                <div className="col-12">
                                    <div className="field">
                                        <label htmlFor="inputtext">Nombre</label><br />
                                        <InputText type="text" id="inputtext" value={Departamento} onChange={(e) => setDepartamento(e.target.value)} className={classNames({ 'p-invalid': submitted && !Departamento })} />
                                        {submitted && !Departamento && <small className="p-invalid" style={{ color: 'red' }}>El campo es requerido.</small>}
                                    </div>
                                </div>
                            </div>


                        </div>
                    </Dialog>

                    {/*modal para editar datos*/}
                    <Dialog
                        visible={EditModal}
                        style={{ width: '500px' }}
                        header="Editar Departamentos"
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
                                <div className="col-12">
                                    <div className="field">
                                        <label htmlFor="inputtext">Nombre</label><br />
                                        <InputText type="text" id="inputtext" value={Departamento} onChange={(e) => setDepartamento(e.target.value)} className={classNames({ 'p-invalid': submitted && !Departamento })} />
                                        {submitted && !Departamento && <small className="p-invalid" style={{ color: 'red' }}>El campo es requerido.</small>}
                                    </div>
                                </div>
                            </div>


                        </div>
                    </Dialog>



                    {/*modal para Eliminar Registros*/}
                    <Dialog visible={DeleteModal} style={{ width: '450px' }} header="Eliminar Sucursales" onHide={hideDeleteModal} modal footer={
                        <>
                            <Button label="Cancelar" icon="pi pi-times" severity="danger" onClick={hideDeleteModal} />
                            <Button label="Confirmar" icon="pi pi-check" severity="success" onClick={EliminarDepartamentos} />
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

