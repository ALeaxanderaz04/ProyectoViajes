import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import Global from '../api/Global';
import axios from 'axios'
import { useRouter } from 'next/router'
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { PickList } from 'primereact/picklist';
import { Toolbar } from 'primereact/toolbar';


const RolesUpdate = () => {

    const router = useRouter();

    const [RolId, setRolId] = useState(router.query.id); //id del rol recien ingresado

    const toast = useRef(null); //para los toast

    const [submitted, setSubmitted] = useState(false);  //validar campos vacios

    const [Pantallas, setPantallas] = useState([]); //listaado de pantallas 
    const [PantallasSeleccionadas, setPantallasSeleccionadas] = useState([]); //optiene las pantallas seleccionadas
    const [Rol, setRol] = useState(''); //nombre del rol recien ingresado

    const [RolActivate, setRolActivate] = useState(false); //activa o desactiva campos

    useEffect(() => {

        var admin = 0;
        var pant_Id = 2;
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

                    axios.get(Global.url + 'Rol/Buscar?id=' + RolId)
                        .then((r) => {
                            setRol(r.data.role_Nombre);
                        })
                        .catch((e) => {
                            localStorage.setItem('RolInsert', '400');
                            router.push('./roles_index')
                        })

                    axios.get(Global.url + 'PantallaPorRol/BuscarPantallasdisponibles?id=' + RolId)
                        .then(response => response.data)
                        .then((data) => setPantallas(data.data.map((c) => ({ code: c.pant_Id, name: c.pant_Nombre }))))
                        .catch(error => console.error(error))

                    axios.get(Global.url + 'PantallaPorRol/Buscar?id=' + RolId)
                        .then(response => response.data)
                        .then((data) => setPantallasSeleccionadas(data.data.map((c) => ({ code: c.pant_Id, name: c.pant_Nombre }))))
                        .catch(error => console.error(error))

                }
                else {
                    router.push('/');
                }
            })
    }, []);




    const EnviarRol = () => {

        if (!Rol.trim()) {
            setSubmitted(true);
        }
        else {

            let rolModificado = {
                role_Id: parseInt(RolId),
                role_Nombre: Rol.trim(),
                role_UsuModificacion: 1
            }

            axios.post(Global.url + 'Rol/Editar', rolModificado)
                .then((r) => {

                    console.log(r.data.data.codeStatus);

                    if (r.data.data.codeStatus == 2) {
                        toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Ya existe un registro con este nombre', life: 2000 });
                    }
                    else if (r.data.data.codeStatus == 0) {

                        toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Ups algo salio mal', life: 2000 });
                    }
                    else {
                        EliminarRolesPantallas();
                    }
                })
                .catch((e) => {
                    toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Ups, algo salió mal. ¡Inténtalo nuevamente!', life: 2000 });
                })
        }
    }

    const EliminarRolesPantallas = () => {

        let eliminarPantallas = {
            role_Id: parseInt(RolId),
        }

        axios.post(Global.url + 'PantallaPorRol/Eliminar', eliminarPantallas)
            .then((r) => {
                console.log(r)
                if (r.data.data.codeStatus == 1) {

                    IngresarRolesporPantalla();
                }
            })
            .catch(error => console.error(error))
    }



    const IngresarRolesporPantalla = () => {

        PantallasSeleccionadas.map((pantalla, index) => {
            let rolespanntallaciclo = {
                role_Id: parseInt(RolId),
                pant_Id: pantalla.code,
                prol_UsuCreacion: 1
            }

            axios.post(Global.url + 'PantallaPorRol/Insertar', rolespanntallaciclo)
                .then((r) => {
                    console.log(r.data.data.codeStatus)
                })
                .catch((e) => {
                    toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Ups, algo salió mal. ¡Inténtalo nuevamente!', life: 2000 });
                })
        });

        localStorage.setItem('RolInsert', '2');
        router.push('./roles_index')
    }

    const toolbarLeftTemplate = () => {
        return (
            <>

                <div className='col-10'>
                    <label>Nombre</label>
                    <InputText type="text" id="inputtext" value={Rol} onChange={(e) => setRol(e.target.value)} disabled={RolActivate} className={classNames({ 'p-invalid': submitted && !Rol })} />
                    {submitted && !Rol.trim() && <small className="p-invalid" style={{ color: 'red' }}>El campo es requerido.</small>}
                </div>
            </>
        );
    };

    return (
        <div className="grid">
            <div className="col-12">
                <Toast ref={toast} />
                <div className="card" style={{ background: `rgb(105,101,235)`, height: '100px', width: '100%' }}>
                    <div className="row text-center d-flex align-items-center">
                        <h2 style={{ color: 'white' }}>Editar Roles</h2>
                    </div>
                </div>

                <div className="grid p-fluid">


                    <div className='col-12'>
                        <div className='card'>

                            <div className="grid p-fluid">
                                <div className='col-1'></div>
                                <div className='col-10'>
                                    <Toolbar left={toolbarLeftTemplate} ></Toolbar>
                                </div>
                            </div>

                            <PickList
                                source={Pantallas}
                                target={PantallasSeleccionadas}
                                sourceHeader="Pantallas Disponibles"
                                targetHeader="Pantallas Seleccionadas"
                                itemTemplate={(item) => <div>{item.name}</div>}
                                onChange={(e) => {
                                    setPantallas(e.source);
                                    setPantallasSeleccionadas(e.target);
                                }}
                                sourceStyle={{ height: '200px' }}
                                targetStyle={{ height: '200px' }}
                            ></PickList>


                            <div className='grid p-fluid mt-3'>
                                <div className='col-1'>

                                </div>
                                <div className='col-4'>

                                </div>
                                <div className='col-3'>
                                    <Button label="Guardar" severity="success" onClick={() => EnviarRol()} icon="pi pi-plus" style={{ marginRight: '.5em' }} />
                                </div>
                                <div className='col-3'>
                                    <Button label="Cancelar" severity="default" onClick={() => router.push('./roles_index')} icon="pi pi-times" />
                                </div>
                                <div className='col-1'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RolesUpdate;