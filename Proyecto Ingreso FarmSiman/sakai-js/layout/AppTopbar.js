import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef, useState,useEffect } from 'react';
import { LayoutContext } from './context/layoutcontext';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useRoute } from 'next/router'


const AppTopbar = forwardRef((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);
    const [CerrarSesion, setCerrarSesion] = useState(false)
    const [confirmar, setconfirmar] = useState(false)
    const router = useRouter();


    useEffect(() => {
        if (confirmar) {
            setconfirmar(false);
            localStorage.clear();
            router.push('/auth/login');
        }
      }, [confirmar]);


   

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

    return (
        <div className="layout-topbar">
            <Link href="/" className="layout-topbar-logo">
                <img src={`https://i.pinimg.com/564x/44/8f/67/448f67cce58679194f8ed6d7a2fa8699.jpg`} width="47.22px" height={'35px'} widt={'true'} alt="logo" />
                <span>Servicios Monsoon</span>
            </Link>

            <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>

            <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                <button type="button" className="p-link layout-topbar-button">
                    <i className="pi pi-calendar"></i>
                    <span>Calendar</span>
                </button>
                <button type="button" className="p-link layout-topbar-button">
                    <i className="pi pi-sign-out" onClick={() => setCerrarSesion(true)}></i>
                    <span>Profile</span>
                </button>
            </div>

            <Dialog header="Cerrar Sesion" visible={CerrarSesion} style={{ width: '30vw' }} onHide={() => setCerrarSesion(false)} modal footer={
                <>
                    <Button label="Cancelar" icon="pi pi-times" severity="danger" onClick={() => setCerrarSesion(false)} />
                    <Button label="Confirmar" icon="pi pi-check" severity="success" onClick={() => setconfirmar(true)}/>
                </>
            }>
                <div className="contenido-dialog">
                    <div className='col-12'>
                        <div className='grid p-fluid'>
                            <div className='col-12'>
                                <div className="flex align-items-center justify-content-center">
                                    <i className="pi pi-sign-out mr-2" style={{ fontSize: '1.5rem' }} />
                                    <span>¿Estás seguro de que deseas cerrar la sesión?</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>


        </div>
    );
});

export default AppTopbar;
