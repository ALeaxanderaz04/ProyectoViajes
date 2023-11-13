import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { InputNumber } from 'primereact/inputnumber';
import { DataTable } from 'primereact/datatable';
import axios from 'axios';
import { Column } from 'primereact/column';
import Global from '../api/Global';
import { Toast } from 'primereact/toast';
import { useRouter } from 'next/router'
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';

const Servicios = () => {
    const router = useRouter();
    const id = router.query.id;

    const [submitted, setsubmitted] = useState(false);
    const [submitted2, setsubmitted2] = useState(false);
    const [Insumo, setInsumo] = useState([]);
    const toast = useRef(null);

    const [ServicioName, setServicioName] = useState('');
    const [Precio, setPrecio] = useState('');

    const [servicio, setservicio] = useState(false);
    const [insum, setinsum] = useState(true);

    const [CategoriaDDL, setCategoriaDDL] = useState([]);
    const [Categoria, setCategoria] = useState('');

    const [InsumoDDL, setInsumoDDL] = useState([]);
    const [Insumoval, setInsumoval] = useState('');
    const [InsumoActivated, setInsumoActivated] = useState(true);
    const [InsumoSubmited, setInsumoSubmited] = useState(false);
    const [ServicioID, setServivioID] = useState('');

    const [InsumoId, setInsumoId] = useState('');
    const [DeleteModal, setDeleteModal] = useState(false);


    useEffect(() => {

        axios.get(Global.url + 'Servicio/Buscar?id=' + id)
            .then((r) => {
                setServivioID(id)
                setServicioName(r.data.serv_Nombre);
                setPrecio(r.data.serv_Precio);

                var codeCate = { code: r.data.cate_Id, name: r.data.cate_Descripcion }
                setCategoria(codeCate);

                AsiganrlevalorInsumoDDL(codeCate.code, r.data)

            })
            .catch((e) => {

                localStorage.setItem('Serviciosindex', '400');
                router.push('./servicios_index');
            })

        axios.get(Global.url + 'Categoria/Listado')
            .then(response => response.data)
            .then((data) => setCategoriaDDL(data.data.map((c) => ({ code: c.cate_Id, name: c.cate_Descripcion }))))
            .catch(error => console.error(error))

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
            serv_Id: parseInt(ServicioID),
            inse_UsuCreacion: 0,
            inse_FechaCreacion: "2023-05-15T04:33:10.725Z",
            inse_UsuModificacion: 0,
            inse_FechaModificacion: "2023-05-15T04:33:10.725Z",
            inse_Estado: true
        }
        axios.put(Global.url + 'InsumosPorServicio/Listado', serv)
            .then(data => data.data)
            .then(data => {setInsumo(data.data)
                  
            })
            .catch(error => console.error(error))
    }, []);

    const AsiganrlevalorInsumoDDL = (cate_Id, datos) => {
        setInsumoActivated(false);
        axios.put(Global.url + 'Insumo/InsumoDDL?id=' + cate_Id)
            .then(response => response.data)
            .then((data) => setInsumoDDL(data.data.map((c) => ({ code: c.insu_Id, name: c.insu_Descripcion }))))
            .catch(error => console.error(error))

        var codeInsu = { code: datos.insu_Id, name: datos.insu_Descripcion }
        setInsumo(codeInsu);
    }


    const ActivarInsumoDDl = (cate_Id) => {
        setInsumoActivated(false);
        axios.put(Global.url + 'Insumo/InsumoDDL?id=' + cate_Id)
            .then(response => response.data)
            .then((data) => setInsumoDDL(data.data.map((c) => ({ code: c.insu_Id, name: c.insu_Nombre }))))
            .catch(error => console.error(error))
    }


    const EditarServicio = () => {
        if (ServicioName !== "" && ServicioName != null && Precio !== "" && Precio !== null) {

            let servicio = {
                serv_Id: ServicioID,
                serv_Nombre: ServicioName,
                serv_Precio: parseInt(Precio),
                serv_url: string,
                serv_UsuCreacion: 0,
                serv_FechaCreacion: "2023-05-11T19:57:32.534Z",
                serv_UsuModificacion: 1,
                serv_FechaModificacion: "2023-05-11T19:57:32.534Z",
                serv_Estado: true
            }

            axios.post(Global.url + 'Servicio/Editar', servicio)
                .then((r) => {
                    setservicio(true);
                    setinsum(false);
                    toast.current.show({ severity: 'success', summary: 'Accion Exitosa', detail: 'Registro editado correctamente', life: 1500 });
                });
        }
        else {
            setsubmitted(true);
        }
    };

    const NuevoInsumo = () => {
        if (Categoria !== "" && Categoria != null && Insumoval !== "" && Insumoval !== null) {

            let insum = {
                insu_Id: Insumoval.code,
                insu_Nombre: "string",
                cate_Id: 0,
                insu_Precio: 0,
                prov_Id: 0,
                insu_UsuCreacion: 0,
                insu_FechaCreacion: "2023-05-14T21:59:05.631Z",
                insu_UsuModificacion: 0,
                insu_FechaModificacion: "2023-05-14T21:59:05.631Z",
                insu_Estado: true,
                inse_Id: 0,
                serv_Id: ServicioID,
                inse_UsuCreacion: 1,
                inse_FechaCreacion: "2023-05-14T21:59:05.631Z",
                inse_UsuModificacion: 0,
                inse_FechaModificacion: "2023-05-14T21:59:05.631Z",
                inse_Estado: true
            }

            axios.post(Global.url + 'InsumosPorServicio/Insertar', insum)
                .then((r) => {
                    toast.current.show({ severity: 'success', summary: 'Accion Exitosa', detail: 'Registro Ingresado correctamente', life: 1500 });
                });
        }
        else {
            setsubmitted2(true)
            if (Categoria && !Insumoval) {
                setInsumoSubmited(true);
            }
        }
    };

    const EliminarInsumo = (e) => {
        console.log(InsumoId)
        let payload = {
            insu_Id: 0,
            insu_Nombre: "string",
            cate_Id: 0,
            insu_Precio: 0,
            prov_Id: 0,
            insu_UsuCreacion: 0,
            insu_FechaCreacion: "2023-05-15T05:23:09.357Z",
            insu_UsuModificacion: 0,
            insu_FechaModificacion: "2023-05-15T05:23:09.357Z",
            insu_Estado: true,
            inse_Id: parseInt(InsumoId),
            serv_Id: 0,
            inse_UsuCreacion: 0,
            inse_FechaCreacion: "2023-05-15T05:23:09.357Z",
            inse_UsuModificacion: 0,
            inse_FechaModificacion: "2023-05-15T05:23:09.357Z",
            inse_Estado: true
        }
        axios.post(Global.url + 'InsumosPorServicio/Eliminar', payload)
            .then((r) => {
                hideDeleteModal();
                setInsumoId("");
                toast.current.show({ severity: 'success', summary: 'Accion Exitosa', detail: 'Registro Eliminado Correctamente', life: 1500 });
            });
    }

    const OpenDeleteModal = (id) => {
        console.log(id)
        setInsumoId(id);
        setDeleteModal(true);
    }

    const hideDeleteModal = () => {
        setInsumoId("");
        setDeleteModal(false);
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <br></br>
                    <Toast ref={toast} />
                    <div className="surface-0 text-700 text-center">
                        <div className="text-900 text-primary font-bold text-5xl mb-3">Crea un servicio</div>
                        <br></br>
                        <div className="p-fluid formgrid grid">
                            <div className="field col-12 md:col-6">
                                <label htmlFor="name">Nombre del servicio</label>
                                <InputText id="name" value={ServicioName} onChange={(e) => { setServicioName(e.target.value); }} className={classNames({ 'p-invalid': submitted && !ServicioName })} />
                                {submitted && !ServicioName && <small className="p-invalid">Este campo es requerido.</small>}
                            </div>

                            <div className="field col-12 md:col-6">
                                <label htmlFor="price" >Precio</label>
                                <InputNumber id="price" value={Precio} onValueChange={(e) => { setPrecio(e.value); }} className={classNames({ 'p-invalid': submitted && !Precio })} mode="currency" currency="USD" locale="en-US" />
                                {submitted && !Precio && <small className="p-invalid">Este campo es requerido.</small>}
                            </div>

                        </div>

                        <Button label='Editar Servicio' icon="pi pi-plus" type='submit' onClick={EditarServicio}></Button>


                    </div>
                </div>
                <div className='col-12'>
                    <div className='card'>
                        <div className="surface-0 text-700 text-center">
                            <div className="text-900 text-primary font-bold text-5xl mb-3">Agrega insumos</div>
                            <div className="p-fluid formgrid grid">
                                <div className='field col-12 md:col-4'>
                                    <Dropdown optionLabel="name" placeholder="Seleccionar una categoria" options={CategoriaDDL} value={Categoria} onChange={(e) => { setCategoria(e.value); ActivarInsumoDDl(e.value.code); }} className={classNames({ 'p-invalid': submitted && !Categoria })} />
                                    {submitted2 && !Categoria && <small className="p-invalid" style={{ color: 'red' }}>Seleccione una opcion.</small>}
                                </div>
                                <div className='field col-12 md:col-4'>
                                    <div className="field">
                                        <Dropdown optionLabel="name" placeholder="Selecionar un insumo" options={InsumoDDL} value={Insumoval} onChange={(e) => setInsumoval(e.value)} disabled={InsumoActivated} className={classNames({ 'p-invalid': InsumoSubmited && !Insumoval })} />
                                        {InsumoSubmited && !Insumoval && <small className="p-invalid" style={{ color: 'red' }}>Seleccione una opcion.</small>}
                                    </div>
                                </div>
                                <div className='field col-12 md:col-4'>
                                    <Button label="Agregar" id='btnNuevoInsumo' icon="pi pi-plus" severity="primary" onClick={NuevoInsumo} className="mr-2" disabled={insum} />
                                </div>
                            </div>

                            <DataTable value={Insumo} id="DataTableInsumos" emptyMessage="Aún no se han agregado insumos.">
                                <Column field="insu_Id" header="ID" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }}></Column>
                                <Column field="insu_Nombre" header="Insumo" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }}></Column>
                                <Column field="insu_Precio" header="Precio" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }}></Column>
                                <Column
                                    field="acciones"
                                    header="Acciones"
                                    headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }}
                                    style={{ minWidth: '300px' }}
                                    body={rowData => (
                                        <div>
                                            <Button label="Eliminar" severity="danger" icon="pi pi-trash" outlined style={{ fontSize: '0.8rem' }} onClick={() => OpenDeleteModal(rowData.inse_Id)} />
                                        </div>
                                    )}
                                />
                            </DataTable>
                            <br></br><br></br>
                            <Button label="Regresar" severity="primary" onClick={() => router.push('./servicios_index')} className="mr-2" />
                        </div>
                        <Dialog visible={DeleteModal} style={{ width: '450px' }} header="Eliminar Insumos" onHide={hideDeleteModal} modal footer={
                            <>
                                <Button label="Cancelar" icon="pi pi-times" severity="danger" onClick={hideDeleteModal} />
                                <Button label="Confirmar" icon="pi pi-check" severity="success" onClick={EliminarInsumo} />
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