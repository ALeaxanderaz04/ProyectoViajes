import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Menu } from 'primereact/menu';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ProductService } from '../demo/service/ProductService';
import { LayoutContext } from '../layout/context/layoutcontext';
import Link from 'next/link';
import { Chart } from 'primereact/chart';
import axios from 'axios'
import 'chartjs-plugin-datalabels';


//Pagina  HOME
const Dashboard = () => {
  

  useEffect(() => {
    
  }, []);

  
  return (
    <div className="grid">
      

    </div>
  );
};

export default Dashboard;



