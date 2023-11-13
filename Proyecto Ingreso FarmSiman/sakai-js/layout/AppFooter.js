import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext);

    return (
        <div className="layout-footer">
            <img src={`https://i.pinimg.com/564x/44/8f/67/448f67cce58679194f8ed6d7a2fa8699.jpg`} alt="Logo" height="20" className="mr-2" />
            Por
            <span className="font-medium ml-2">Servicios Publicitarios Monsoon</span>
        </div>
    );
};

export default AppFooter;
