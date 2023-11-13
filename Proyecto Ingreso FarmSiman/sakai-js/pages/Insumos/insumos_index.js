import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Global from '../api/Global';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';


const InsumosIn = () => {

  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [DeleteModal, setDeleteModal] = useState(false);
  const [InsumoId, setInsumoId] = useState("");
  const toast = useRef(null);
  const router = useRouter();
  const [InsumosDialog, setInsumosDialog] = useState(false);

  const [InsumoName, setInsumoName] = useState("");
  const [Precio, setPrecio] = useState("");

  const [CategoriaDDL, setCategoriaDDL] = useState([]);
  const [Categoria, setCategoria] = useState('');

  const [ProveedorDDL, setProveedorDDL] = useState([]);
  const [Proveedor, setProveedor] = useState('');

  const [submitted, setSubmitted] = useState(false);

  const [InsumosEditDialog, setInsumosEditDialog] = useState(false);
  const [edit, setedit] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    var admin = 0;
    var pant_Id = 13;
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

          if (loading) {

            axios.get(Global.url + 'Insumo/Listado')
              .then(response => response.data)
              .then(data => {
                setLoading(false)
                setPosts(data.data)
              })
              .catch(error => console.error(error))

            axios.get(Global.url + 'Categoria/Listado')
              .then(response => response.data)
              .then((data) => setCategoriaDDL(data.data.map((c) => ({ code: c.cate_Id, name: c.cate_Descripcion }))))
              .catch(error => console.error(error))

            axios.get(Global.url + 'Proveedor/Listado')
              .then(response => response.data)
              .then((data) => setProveedorDDL(data.data.map((c) => ({ code: c.prov_Id, name: c.prov_Nombre }))))
              .catch(error => console.error(error))
          }
        }
        else{
          router.push('/');
        }
      })
  }, [loading]);

  const EditInsumo = (insu_Id) => {
    axios.get(Global.url + 'Insumo/Buscar?id=' + insu_Id)
      .then((r) => {
        var codeProv = { code: r.data.prov_Id, name: r.data.prov_Nombre }
        setProveedor(codeProv)
        var codeCat = { code: r.data.cate_Id, name: r.data.cate_Descripcion }
        setCategoria(codeCat)
        setInsumoName(r.data.insu_Nombre)
        setPrecio(r.data.insu_Precio)
        setInsumoId(insu_Id)
        setedit(r.data)
      })
      .catch(error => console.error(error))

    setInsumosEditDialog(true)

  };

  const hideeditDialog = () => {
    setProveedor('')
    setCategoria('')
    setInsumoName('')
    setPrecio('')
    setInsumoId('')
    setedit('')
    setSubmitted(false);
    setInsumosEditDialog(false);
  };

  const EditarP = (e) => {

    if (!InsumoName || !Precio || !Categoria || !Proveedor) {
      setSubmitted(true);

    }
    else {

      let insumoe = {
        insu_Id: parseInt(InsumoId),
        insu_Nombre: InsumoName,
        cate_Id: Categoria.code,
        insu_Precio: parseInt(Precio),
        prov_Id: Proveedor.code,
        prov_UsuModificacion: 1
      }

      axios.post(Global.url + 'Insumo/Editar', insumoe)
        .then((r) => {
          hideeditDialog();
          setLoading(true);
          toast.current.show({ severity: 'success', summary: 'Accion Exitosa', detail: 'Registro Editado correctamente', life: 1500 });
        })
        .catch((e) => {
          toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Ups, algo salió mal. ¡Inténtalo nuevamente!', life: 2000 });
        })
    }
  }


  const editDialogFooter = (
    <>
      <Button label="Cancelar" severity="danger" icon="pi pi-times" onClick={hideeditDialog} />
      <Button label="Guardar" severity="success" icon="pi pi-check" onClick={() => EditarP()} />
    </>
  );

  const openNew = () => {
    setInsumosDialog(true);
  };

  const hideDialog = () => {
    setInsumoName("");
    setPrecio("");
    setCategoria("");
    setSubmitted(false);
    setProveedor('');
    setInsumosDialog(false);
  };

  const Agregar = (e) => {

    if (!InsumoName || !Precio || !Proveedor || !Categoria) {
      setSubmitted(true);
    }
    else {

      let insumo = {
        insu_Nombre: InsumoName,
        cate_Id: Categoria.code,
        insu_Precio: parseInt(Precio),
        prov_Id: Proveedor.code,
        insu_UsuCreacion: 1
      }

      axios.post(Global.url + 'Insumo/Insertar', insumo)
        .then((r) => {
          setLoading(true);
          hideDialog();
          toast.current.show({ severity: 'success', summary: 'Accion Exitosa', detail: 'Registro agregado correctamente', life: 1500 });
        })
        .catch((e) => {
          toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Ups, algo salió mal. ¡Inténtalo nuevamente!', life: 2000 });
        })
    }
  };

  const insumosDialogFooter = (
    <>
      <Button label="Cancelar" severity="danger" icon="pi pi-times" onClick={hideDialog} />
      <Button label="Guardar" severity="success" icon="pi pi-check" onClick={() => Agregar()} />
    </>
  );

  const header = (
    <div className="table-header flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <div className="grid">
        <div className="col-12">
          <Button type="button" label="Nuevo" severity="success" outlined icon="pi pi-upload" onClick={openNew} />
        </div>
      </div>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="text" value={searchText} onChange={e => setSearchText(e.target.value)} placeholder="Buscar..." />
      </span>
    </div>
  );


  const OpenDeleteModal = (id) => {
    setInsumoId(id);
    setDeleteModal(true);
  }

  const hideDeleteModal = () => {
    setInsumoId("");
    setDeleteModal(false);
  };

  const EliminarInsumos = (e) => {

    let payload = {
      insu_Id: InsumoId,
    }
    axios.post(Global.url + 'Insumo/Eliminar', payload)
      .then((r) => {
        hideDeleteModal();
        setLoading(true);
        setInsumoId("");
        toast.current.show({ severity: 'success', summary: 'Accion Exitosa', detail: 'Registro Eliminado Correctamente', life: 1500 });
      })
      .catch((e) => {
        toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Ups, algo salió mal. ¡Inténtalo nuevamente!', life: 2000 });
      })
  }


  return (
    <div className="grid">
      <div className="col-12">

        <div className="card" style={{ background: `rgb(105,101,235)`, height: '100px', width: '100%' }}>
          <div className="row text-center d-flex align-items-center">
            <h2 style={{ color: 'white' }}>Insumos</h2>
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
            dataKey="insu_Id"
            filterDisplay="menu"
            responsiveLayout="scroll"
            emptyMessage="No se encontraron registros."
            filterMode="filter"
            value={posts}
            header={header}

          >
            <Column field="insu_Id" header="ID" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }} />
            <Column field="insu_Nombre" header="Insumo" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }} />
            <Column field="cate_Descripcion" header="Categoria" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }} />
            <Column field="insu_Precio" header="Precio" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }} />
            <Column field="prov_Nombre" header="Proveedor" headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }} />

            <Column
              field="acciones"
              header="Acciones"
              headerStyle={{ background: `rgb(105,101,235)`, color: '#fff' }}
              style={{ minWidth: '350px' }}
              body={rowData => (
                <div>
                  <Button label="Detalles" severity="info" icon="pi pi-eye" outlined style={{ fontSize: '0.8rem' }} />
                  <Button label="Editar" severity="warning" icon="pi pi-upload" outlined style={{ fontSize: '0.8rem' }} onClick={() => EditInsumo(rowData.insu_Id)} />
                  <Button label="Eliminar" severity="danger" icon="pi pi-trash" outlined style={{ fontSize: '0.8rem' }} onClick={() => OpenDeleteModal(rowData.insu_Id)} />
                </div>
              )}
            />
          </DataTable>

          <Dialog visible={DeleteModal} style={{ width: '450px' }} header="Eliminar Insumos" onHide={hideDeleteModal} modal footer={
            <>
              <Button label="Cancelar" icon="pi pi-times" severity="danger" onClick={hideDeleteModal} />
              <Button label="Confirmar" icon="pi pi-check" severity="success" onClick={EliminarInsumos} />
            </>
          }>
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
              <span>
                ¿Desea eliminar este registro?
              </span>
            </div>
          </Dialog>

          <Dialog visible={InsumosDialog} style={{ width: '500px' }} header="Nuevo Insumo" modal className="p-fluid" footer={insumosDialogFooter} onHide={hideDialog}>
            <div className="p-fluid formgrid grid">
              <div className="field col-12 md:col-6">
                <label htmlFor="insumo">Insumo</label>
                <InputText optionLabel="insumo" value={InsumoName} onChange={(e) => setInsumoName(e.target.value)} className={classNames({ 'p-invalid': submitted && !InsumoName })} />
                {submitted && !InsumoName && <small className="p-invalid" style={{ color: 'red' }}>El campo es requerido.</small>}
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="Precio">Precio</label>
                <InputText type='number' optionLabel="Precio" value={Precio} onChange={(e) => setPrecio(e.target.value)} className={classNames({ 'p-invalid': submitted && !Precio })} />
                {submitted && !Precio && <small className="p-invalid" style={{ color: 'red' }}>El campo es requerido.</small>}
              </div>
            </div>
            <div className="p-fluid formgrid grid">
              <div className="field col-12 md:col-6">
                <label htmlFor="name">Categoria</label>
                <Dropdown optionLabel="name" placeholder="Seleccionar" options={CategoriaDDL} value={Categoria} onChange={(e) => { setCategoria(e.value); }} className={classNames({ 'p-invalid': submitted && !Categoria })} />
                {submitted && !Categoria && <small className="p-invalid" style={{ color: 'red' }}>Seleccione una opcion.</small>}
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="name">Proveedor</label>
                <Dropdown optionLabel="name" placeholder="Seleccionar" options={ProveedorDDL} value={Proveedor} onChange={(e) => { setProveedor(e.value); }} className={classNames({ 'p-invalid': submitted && !Proveedor })} />
                {submitted && !Proveedor && <small className="p-invalid" style={{ color: 'red' }}>Seleccione una opcion.</small>}
              </div>
            </div>
          </Dialog>

          <Dialog visible={InsumosEditDialog} style={{ width: '500px' }} header="Editar Insumo" modal className="p-fluid" footer={editDialogFooter} onHide={hideDialog}>
            <div className="p-fluid formgrid grid">
              <div className="field col-12 md:col-6">
                <label htmlFor="insumo">Insumo</label>
                <InputText optionLabel="insumo" value={InsumoName} onChange={(e) => setInsumoName(e.target.value)} className={classNames({ 'p-invalid': submitted && !InsumoName })} />
                {submitted && !InsumoName && <small className="p-invalid" style={{ color: 'red' }}>El campo es requerido.</small>}
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="Precio">Precio</label>
                <InputText type='number' optionLabel="Precio" value={Precio} onChange={(e) => setPrecio(e.target.value)} className={classNames({ 'p-invalid': submitted && !Precio })} />
                {submitted && !Precio && <small className="p-invalid" style={{ color: 'red' }}>El campo es requerido.</small>}
              </div>
            </div>
            <div className="p-fluid formgrid grid">
              <div className="field col-12 md:col-6">
                <label htmlFor="name">Categoria</label>
                <Dropdown optionLabel="name" placeholder="Seleccionar" options={CategoriaDDL} value={Categoria} onChange={(e) => { setCategoria(e.value); }} className={classNames({ 'p-invalid': submitted && !Categoria })} />
                {submitted && !Categoria && <small className="p-invalid" style={{ color: 'red' }}>Seleccione una opcion.</small>}
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="name">Proveedor</label>
                <Dropdown optionLabel="name" placeholder="Seleccionar" options={ProveedorDDL} value={Proveedor} onChange={(e) => { setProveedor(e.value); }} className={classNames({ 'p-invalid': submitted && !Proveedor })} />
                {submitted && !Proveedor && <small className="p-invalid" style={{ color: 'red' }}>Seleccione una opcion.</small>}
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  )
}


export default InsumosIn;

