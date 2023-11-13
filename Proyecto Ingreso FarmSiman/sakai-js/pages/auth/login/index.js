import { useRouter } from 'next/router';
import React, { useContext, useState, useEffect } from 'react';
import AppConfig from '../../../layout/AppConfig';
import { Checkbox } from 'primereact/checkbox';
import { LayoutContext } from '../../../layout/context/layoutcontext';
import { classNames } from 'primereact/utils';
import axios from 'axios';
import { useRoute } from 'next/router'
import Global from '../../api/Global';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

function LoginPage() {

    const [usuario, setusuario] = useState("")

    const [clave, setclave] = useState("")

    const [validationErrors, setValidationErrors] = useState({});

    const [checked, setChecked] = useState(false);

    const { layoutConfig } = useContext(LayoutContext);

    const router = useRouter();

    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    const [submitted, setsubmitted] = useState(false);
    const [sub2, setsub2] = useState(false);

    useEffect(() => {

        if (localStorage.getItem('usuID') != "" && localStorage.getItem('usuID') != null) {
          router.push('/');
        }
       
    }, [])  



    const loginAction = (e) => {

        if (usuario == "" || usuario == null || clave == "" || clave == null) {
            setsubmitted(true)
        }
        else {
            setValidationErrors({})
            e.preventDefault();
            let payload = {
                user_NombreUsuario: usuario,
                user_Contrasena: clave,
            }

            axios.put(Global.url + 'Usuario/IniciarSesion', payload)
                .then((r) => {
                    console.log(r)
                    const data = r.data;
                    if (data != "" && data != null) {
                        localStorage.setItem('usuID', data.user_Id);
                        localStorage.setItem('user_NombreUsuario', data.user_NombreUsuario);
                        localStorage.setItem('role_Id', data.role_Id);
                        localStorage.setItem('user_EsAdmin', data.user_EsAdmin);

                        router.push('/');
                    }
                    else (
                        setsub2(true)
                    )
                })
                .catch((e) => {
                    
                });
        }

    }
    return (
        <div className={containerClassName}>
            <div className="surface-ground background-image flex flex-column align-items-center justify-content-center">
                <div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)' }}>
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <img src="/demo/images/login/prueba.pn" alt="Image" height="250" className="mb-3" hidden/>
                            <div className="text-900 text-3xl font-medium mb-3">Servicio de Transporte Viajes Farm</div>
                            <span className="text-600 font-medium"> Iniciar Sesión</span>
                        </div>
                        <div className='text-center'>
                            {sub2 && <small className="p-invalid" style={{ color: 'red' }}>Usuario o contraseña incorrectos.</small>}
                        </div>
                        <div>
                            <label htmlFor="usuario" className="block text-900 font-medium text-xl mb-2">
                                Usuario
                            </label>
                            {submitted && !usuario && <small className="p-invalid" style={{ color: 'red' }}>El campo es requerido.</small>}
                            <InputText value={usuario} onChange={(e) => { setusuario(e.target.value) }} placeholder='Ingrese su usuario' className={'w-full mb-5 p-inputtext p-component' + classNames({ 'p-invalid': submitted && !usuario })}></InputText>
                            <label htmlFor="clave" className="block text-900 font-medium text-xl mb-2">
                                Contraseña
                            </label>
                            {submitted && !clave && <small className="p-invalid" style={{ color: 'red' }}>El campo es requerido.</small>}
                            <input type='password' value={clave} onChange={(e) => setclave(e.target.value)}
                                placeholder="Ingrese su contraseña" className={'w-full mb-5 p-inputtext p-password-input p-component' + classNames({ 'p-invalid': submitted && !clave })} icon="pi pi-eye" />
                           
                            <button type="submit" className='p-button w-full mb-5 text-center' onClick={((e) => loginAction(e))}>Ingresar</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
LoginPage.getLayout = function getLayout(page) {
    return (
        <React.Fragment>
            {page}
            <AppConfig simple />
        </React.Fragment>
    );
};
export default LoginPage;