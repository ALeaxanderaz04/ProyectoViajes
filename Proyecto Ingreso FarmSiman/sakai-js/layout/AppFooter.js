import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext);

    return (
        <div className="layout-footer">
            
            Por
            <span className="font-medium ml-2">Viajes FARM</span>
        </div>
    );
};

export default AppFooter;
