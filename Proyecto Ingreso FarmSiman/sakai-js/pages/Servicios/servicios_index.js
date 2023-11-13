import React, { useState, useEffect, useRef } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { FileUpload } from 'primereact/fileupload';
import { DataTable } from 'primereact/datatable';
import axios from 'axios';
import { Column } from 'primereact/column';
import Global from '../api/Global';
import { Toast } from 'primereact/toast';
import { useRouter } from 'next/router'

const Servicios = () => {
    const [dataViewValue, setDataViewValue] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filteredValue, setFilteredValue] = useState(null);
    const [layout, setLayout] = useState('grid');
    const [sortOrder, setSortOrder] = useState(null);
    const [sortField, setSortField] = useState(null);
    const [InsumosDialog, setInsumosDialog] = useState(false);
    const [Insumo, setInsumo] = useState([]);
    const [DeleteModal, setDeleteModal] = useState(false);
    const [ServicioId, setServicioId] = useState("");
    const toast = useRef(null);

    const router = useRouter();

    const [loading, setLoading] = useState(true);
    useEffect(() => {

        var admin = 0;
        var pant_Id = 16;
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
                    fetch(Global.url + 'Servicio/Listado', { headers: { 'Cache-Control': 'no-cache' } })
                        .then((res) => res.json())
                        .then((d) => d.data)
                        .then((data) => {
                            setLoading(false);
                            setDataViewValue(data)
                        }),
                        setGlobalFilterValue('');
                }
                else {
                    router.push('/');
                }
            })
    }, [loading]);


    const onFilter = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
        if (value.length === 0) {
            setFilteredValue(null);
        } else {
            const filtered = dataViewValue.filter((servicio) => {
                return servicio.name.toLowerCase().includes(value);
            });
            setFilteredValue(filtered);
        }
    };


    const dataViewHeader = (
        <div className="flex flex-column md:flex-row md:justify-content-between gap-2">
            <Button label="Nuevo" icon="pi pi-plus" severity="sucess" className="mr-2" onClick={() => router.push('./servicios_create')} />
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText value={globalFilterValue} onChange={onFilter} placeholder="Buscar" />
            </span>
            <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
        </div>
    );


    const cerrarInsumos = () => {
        setInsumosDialog(false);
    };

    const insumosDialogFooter = (
        <>
            <Button label="Cerrar" icon="pi pi-times" text onClick={cerrarInsumos} />
        </>
    );

    const OpenDeleteModal = (id) => {
        console.log(id)
        setServicioId(id);
        setDeleteModal(true);
    }

    const hideDeleteModal = () => {
        setServicioId("");
        setDeleteModal(false);
    };

    const EliminarServicio = (e) => {

        let payload = {
            serv_Id: ServicioId,
        }
        axios.post(Global.url + 'Servicio/Eliminar', payload)
            .then((r) => {
                hideDeleteModal();
                setLoading(true);
                setServicioId("");
                toast.current.show({ severity: 'success', summary: 'Accion Exitosa', detail: 'Registro Eliminado Correctamente', life: 1500 });
            });
    }

    const IDSelect = (serv_Id) => {
        let serv = {
            insu_Id: 0,
            insu_Nombre: "string",
            cate_Id: 0,
            insu_Precio: 0,
            prov_Id: 0,
            insu_UsuCreacion: 0,
            insu_FechaCreacion: "2023-05-15T04:33:10.725Z",
            insu_UsuModificacion: 0,
            insu_FechaModificacion: "2023-05-15T04:33:10.725Z",
            insu_Estado: true,
            inse_Id: 0,
            serv_Id: parseInt(serv_Id),
            inse_UsuCreacion: 0,
            inse_FechaCreacion: "2023-05-15T04:33:10.725Z",
            inse_UsuModificacion: 0,
            inse_FechaModificacion: "2023-05-15T04:33:10.725Z",
            inse_Estado: true
        }
        axios.put(Global.url + 'InsumosPorServicio/Listado', serv)
            .then(data => data.data)
            .then(data => setInsumo(data.data))
            .catch(error => console.error(error)),
            setInsumosDialog(true)
    };

    const dataviewListItem = (data) => {

        return (
            <div className="col-12">
                <div className="flex flex-column md:flex-row align-items-center p-3 w-full">

                    <div className="flex-1 flex flex-column align-items-center text-center md:text-left">
                        <img src={data.serv_url} alt={data.serv_Nombre} className="w-9 shadow-2 my-3 mx-0" />
                        <div className="font-bold text-2xl">{data.serv_Nombre}</div>
                    </div>
                    <div className="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0">
                        <span className="text-2xl font-semibold mb-2 align-self-center md:align-self-end">Lps. {data.serv_Precio} por servicio</span>
                        <Button className='p-button p-button-danger' icon="p-menuitem-icon pi pi-trash" onClick={() => OpenDeleteModal(data.serv_Id)}></Button>.
                        <Button icon="p-menuitem-icon pi pi-fw pi-list" className="mb-2 p-button-sm" onClick={() => IDSelect(data.serv_Id)}></Button>
                    </div>
                </div>
            </div>
        );
    };


    const dataviewGridItem = (data) => {
        return (
            <div className="col-12 lg:col-4">
                <div className="card m-3 border-1 surface-border">
                    <div className="flex flex-wrap gap-2 align-items-center justify-content-between mb-2">
                        <div className="flex align-items-center">
                            <i className="pi pi-tag mr-2" onClick={() => router.push({ pathname: './servicios_edit', query: { id: data.serv_Id } })} />
                            <span className="font-semibold">{data.serv_Nombre}</span>
                        </div>
                    </div>
                    <div className="flex flex-column align-items-center text-center mb-3">
                        <img src={data.serv_url} alt={data.serv_Nombre} className="w-9 shadow-2 my-3 mx-0" />
                        <div className="text-2xl font-bold">{data.serv_Nombre}</div>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">Lps. {data.serv_Precio} por servicio</span>
                        <Button className='p-button p-button-danger' icon="p-menuitem-icon pi pi-trash" onClick={() => OpenDeleteModal(data.serv_Id)}></Button>.
                        <Button icon="p-menuitem-icon pi pi-fw pi-list" onClick={() => IDSelect(data.serv_Id)}></Button>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (data, layout) => {
        if (!data) {
            return;
        }

        if (layout === 'list') {
            return dataviewListItem(data);
        } else if (layout === 'grid') {
            return dataviewGridItem(data);
        }
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <br></br>
                    <Toast ref={toast} />
                    <div className="surface-0 text-700 text-center">
                        <div className="text-900 text-primary font-bold text-5xl mb-3">Nuestros servicios</div>
                        <div className="text-700 text-black text-2xl mb-5">Los mejores servicios publicitarios del país</div>
                        <br></br>
                        <DataView value={filteredValue || dataViewValue} layout={layout} paginator rows={9} sortOrder={sortOrder} sortField={sortField} itemTemplate={itemTemplate} header={dataViewHeader}></DataView>
                        <Dialog visible={InsumosDialog} header="Insumos por servicio" style={{ width: '450px' }} modal className="p-fluid" footer={insumosDialogFooter} onHide={cerrarInsumos}>
                            <DataTable value={Insumo} >
                                <Column field="insu_Id" header="ID" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }}></Column>
                                <Column field="insu_Nombre" header="Insumo" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }}></Column>
                                <Column field="insu_Precio" header="Precio" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }}></Column>
                            </DataTable>
                        </Dialog>
                        <Dialog visible={DeleteModal} style={{ width: '450px' }} header="Eliminar Servicios" onHide={hideDeleteModal} modal footer={
                            <>
                                <Button label="Cancelar" icon="pi pi-times" severity="danger" onClick={hideDeleteModal} />
                                <Button label="Confirmar" icon="pi pi-check" severity="success" onClick={EliminarServicio} />
                            </>
                        }>
                            <div className="flex align-items-center justify-content-center">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                                <span>
                                    ¿Desea eliminar este servicio?
                                </span>
                            </div>
                        </Dialog>

                    </div>
                </div>
            </div>
        </div>

    );
};

export default Servicios;
