import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Global from '../api/Global';
import { InputText } from 'primereact/inputtext';
import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import axios from 'axios'
import { useRouter } from 'next/router'

const App = () => {

  const [posts, setPosts] = useState([]); //alamcenar los registros
  const [searchText, setSearchText] = useState(''); //para la barra de busqueda
  const toast = useRef(null); //para los toast
  const router = useRouter();


  useEffect(() => {

    var admin = 0;
    var pant_Id = 10;
    var role_Id = 0;

    if (localStorage.getItem('role_Id') != null) {
      role_Id = localStorage.getItem('role_Id');
    }

    if (localStorage.getItem('user_EsAdmin') == 'true') {
      admin = 1;
    }

    if (localStorage.getItem('FacturaCreate') == '1') {
      toast.current.show({ severity: 'success', summary: 'Accion Exitosa', detail: 'Registro Ingresado Correctamente', life: 2000 });
      localStorage.setItem('FacturaCreate', '');
    }

    axios.put(Global.url + `Pantalla/AccesoPantalla?esAdmin=${admin}&role_Id=${role_Id}&pant_Id=${pant_Id}`)
      .then((r) => {
        if (r.data[0][""] == 1) {
        axios.get(Global.url + 'Factura/Listado')
          .then(response => response.data)
          .then(data => setPosts(data.data))
          .catch(error => console.error(error))
        }
        else{
          router.push('/');
        }
      })
  }, []);



  const header = (
    <div className="table-header flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <div className="grid">
        <div className="col-12">
          <Button type="button" label="Nuevo" severity="success" outlined icon="pi pi-upload" onClick={() => router.push('./factura_create')} />
        </div>
      </div>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="text" value={searchText} onChange={e => setSearchText(e.target.value)} placeholder="Buscar..." />
      </span>
    </div>
  );



  const Editar = () => {
    toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'No se puede editar, la factura ya fue cerrada', life: 1500 });
  }

  const Eliminar = () => {
    toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'No se puede Eliminar, la factura ya fue cerrada', life: 1500 });
  }

  return (
    <div className="grid">
      <div className="col-12">

        <div className="card" style={{ background: `rgb(105,101,235)`, height: '100px', width: '100%' }}>
          <div className="row text-center d-flex align-items-center">
            <h2 style={{ color: 'white' }}>Factura</h2>
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
              post.clie_NombreCompleto.toLowerCase().includes(searchText.toLowerCase()) ||
              post.empe_NombreCompleto.toLowerCase().includes(searchText.toLowerCase()) ||
              post.fact_FechaCompra.toLowerCase().includes(searchText.toLowerCase())
            )}

          >
            <Column field="clie_NombreCompleto" header="Cliente" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }} />
            <Column field="empe_NombreCompleto" header="Empleado" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }} />
            <Column field="fact_FechaCompra" header="Fecha" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }} />


            <Column
              field="acciones"
              header="Acciones"
              headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }}
              style={{ minWidth: '300px' }}
              body={rowData => (
                <div>
                  <Button label="Detalles" severity="info" icon="pi pi-eye" outlined style={{ fontSize: '0.8rem' }} onClick={() => router.push({ pathname: './factura_details', query: { id: rowData.fact_Id } })} /> .
                  <Button label="Editar" severity="warning" icon="pi pi-upload" outlined style={{ fontSize: '0.8rem' }} onClick={() => Editar()} /> .
                  <Button label="Eliminar" severity="danger" icon="pi pi-trash" outlined style={{ fontSize: '0.8rem' }} onClick={() => Eliminar()} />
                </div>
              )}
            />
          </DataTable>

        </div>
      </div>
    </div>
  )
}



export default App;

