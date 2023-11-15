import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Global from '../api/Global';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import axios from 'axios'
import { useRouter } from 'next/router'

const App = () => {
    const [posts, setPosts] = useState([]); //alamcenar los registros
    const [searchText, setSearchText] = useState(''); //para la barra de busqueda
    const [DeleteModal, setDeleteModal] = useState(false); //abrir el modal eliminar
    const [ViajeId, setViajeId] = useState("");//almecenar el id del empleado
    const toast = useRef(null); //para los toast
    const router = useRouter();
    const [loading, setLoading] = useState(true);

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

                    if (localStorage.getItem('Viaje') == '1') {
                        toast.current.show({ severity: 'success', summary: 'Accion Exitosa', detail: 'Registro Ingresado Correctamente', life: 2000 });
                        setLoading(true);
                    }
                    else if (localStorage.getItem('Viaje') == '2') {
                        toast.current.show({ severity: 'success', summary: 'Accion Exitosa', detail: 'Registro Editado Correctamente', life: 2000 });
                        setLoading(true);
                    }
                    else if (localStorage.getItem('Viaje') == '400') {
                        toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Ups, algo salió mal. ¡Inténtalo nuevamente!', life: 2000 });
                    }
                    localStorage.removeItem('Viaje');

                    if (loading) {
                        axios.get(Global.url + 'Viajes/Listado')
                            .then(response => response.data)
                            .then(data => {
                                setLoading(false);
                                setPosts(data.data)
                            })
                            .catch(error => console.error(error))
                    }
                }
                else {
                    router.push('/');
                }
            })

    }, [loading]);

    const header = (
        <div className="table-header flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <div className="grid">
                <div className="col-12">
                    <Button type="button" label="Nuevo" severity="success" outlined icon="pi pi-upload" onClick={() => router.push('./Viajes_create')} />
                </div>
            </div>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="text" value={searchText} onChange={e => setSearchText(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    /*------ MODAL ELIMINAR -------*/

    //abrir modal eliminar
    const OpenDeleteModal = (id) => {
        setViajeId(id);
        setDeleteModal(true);
    }

    //cerrar modal eliminar
    const hideDeleteModal = () => {
        setViajeId("");
        setDeleteModal(false);
    };

    //mandar datos del eliminar a la api
    const EliminarViajes = (e) => {

        let payload = {
            viaj_id: parseInt(ViajeId),
        }
        axios.post(Global.url + 'Viajes/Eliminar', payload)
            .then((r) => {
                if (r.data.data.messageStatus == '1') {
                    toast.current.show({ severity: 'success', summary: 'Accion Exitosa', detail: 'Registro Eliminado Correctamente', life: 2000 });
                }
                else if (r.data.data.messageStatus.includes("DELETE statement conflicted")) {
                    toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'El Registro Esta en Uso en Otra Tabla', life: 2000 });
                }
                setLoading(true);
                hideDeleteModal();
                setViajeId("");
            })
            .catch((e) => {
                console.log(e)
                toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Ups, algo salió mal. ¡Inténtalo nuevamente!', life: 2000 });
            })
    }

    return (
        <div className="grid">
            <div className="col-12">

                <div className="card" style={{ background: `rgb(105,101,235)`, height: '100px', width: '100%' }}>
                    <div className="row text-center d-flex align-items-center">
                        <h2 style={{ color: 'white' }}>Viajes</h2>
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
                        dataKey="cate_Id"
                        filterDisplay="menu"
                        responsiveLayout="scroll"
                        emptyMessage="No se encontrron registros."
                        filterMode="filter"
                        header={header}
                        value={posts.filter((post) =>
                            post.tran_NombreCompleto.toLowerCase().includes(searchText.toLowerCase()) ||
                            post.sucu_Nombre.toLowerCase().includes(searchText.toLowerCase()) 
                        )}

                    >
                        <Column field="tran_NombreCompleto" header="Nombre Transportista" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }} />
                        <Column field="sucu_Nombre" header="Sucursal" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }} />

                        <Column
                            field="acciones"
                            header="Acciones"
                            headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }}
                            style={{ minWidth: '300px' }}
                            body={rowData => (
                                <div>
                                    <Button label="Detalles" severity="info" icon="pi pi-eye" outlined style={{ fontSize: '0.8rem' }}     onClick={() => router.push({ pathname: './Viajes_details', query: { id: rowData.viaj_Id } })}/> .
                                    <Button label="Editar" severity="warning" icon="pi pi-upload" outlined style={{ fontSize: '0.8rem' }} onClick={() => router.push({ pathname: './Viajes_edit', query: { id: rowData.viaj_Id } })} /> .
                                    <Button label="Eliminar" severity="danger" icon="pi pi-trash" outlined style={{ fontSize: '0.8rem' }} onClick={() => OpenDeleteModal(rowData.viaj_Id)} />
                                </div>
                            )}
                        />
                    </DataTable>

                    {/*modal para Eliminar Registros*/}
                    <Dialog visible={DeleteModal} style={{ width: '450px' }} header="Eliminar Empleados" onHide={hideDeleteModal} modal footer={
                        <>
                            <Button label="Cancelar" icon="pi pi-times" severity="danger" onClick={hideDeleteModal} />
                            <Button label="Confirmar" icon="pi pi-check" severity="success" onClick={EliminarViajes} />
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