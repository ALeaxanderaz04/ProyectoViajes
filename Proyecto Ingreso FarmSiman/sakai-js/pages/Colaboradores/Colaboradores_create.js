import React, { useState, useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { RadioButton } from 'primereact/radiobutton';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import Global from '../api/Global';
import axios from 'axios'
import { useRouter } from 'next/router'
import { InputMask } from 'primereact/inputmask';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';


const App = () => {

    const router = useRouter();
    const toast = useRef(null); //para los toast

    const [submitted, setSubmitted] = useState(false);  //validar campos vacios
    const [MunicipioSubmited, setMunicipioSubmited] = useState(false); //validar si municipio esta vacio

    const [Nombres, setNombres] = useState('');
    const [Apellidos, setApellidos] = useState('');
    const [Identidad, setIdentidad] = useState('');
    const [FechaNac, setFechaNac] = useState('');
    const [Sexo, setSexo] = useState('');
    const [Dirrecion, setDirrecion] = useState('');
    const [Telefono, setTelefono] = useState('');

    const [EstadosCivilesDDL, setEstadosCivilesDDL] = useState([]); //ddl estados civiles
    const [EstadoCivil, setEstadoCivil] = useState(''); //almacena el valor seleccionado del ddl 

    const [DepartaemntoDDL, setDepartamentoDDL] = useState([]);//ddl Departemento 
    const [Deparatemento, setDepartamento] = useState('');//almacena el valor seleccionado del ddl 

    const [MunicipioDDL, setMunicipioDDL] = useState([]);//ddl Municipios
    const [Municipio, setMunicipio] = useState(''); // alamcena el valor del ddl
    const [MunicipioActivated, setMunicipioActivated] = useState(true);// almacena si el ddl esta activado



    //cargar ddl Cargos
    useEffect(() => {

        var admin = 0;
        var pant_Id = 4;
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

                    axios.get(Global.url + 'EstadoCivil/Listado')
                        .then(response => response.data)
                        .then((data) => setEstadosCivilesDDL(data.data.map((c) => ({ code: c.eciv_Id, name: c.eciv_Descripcion }))))
                        .catch(error => console.error(error))

                    axios.get(Global.url + 'Departamento/Listado')
                        .then(response => response.data)
                        .then((data) => setDepartamentoDDL(data.data.map((c) => ({ code: c.depa_Id, name: c.depa_Nombre }))))
                        .catch(error => console.error(error))
                }
                else {
                    router.push('/');
                }
            })

    }, []);

    const ActivarMunicipioDDl = (depa_Id) => {
        setMunicipioActivated(false);
        setMunicipio('');
        axios.get(Global.url + 'Municipio/Municipios_DDL?id=' + depa_Id)
            .then(response => response.data)
            .then((data) => setMunicipioDDL(data.data.map((c) => ({ code: c.muni_Id, name: c.muni_Nombre }))))
            .catch(error => console.error(error))
    }

    const Insetar = (e) => {

        if (!Nombres.trim() || !Apellidos.trim() || !Identidad.trim() || !FechaNac || !Sexo ||
            !EstadoCivil || !Deparatemento || !Municipio || !Dirrecion.trim() ||
            !Telefono.trim() ) {

            setSubmitted(true);

            if (Deparatemento && !Municipio) {
                setMunicipioSubmited(true);
            }
        }
        else {


            let Colaborador = {
                cola_Nombres: Nombres.trim(),
                cola_Apellidos: Apellidos.trim(),
                cola_Identidad: Identidad.trim(),
                cola_FechaNacimiento: FechaNac,
                cola_Sexo: Sexo,
                eciv_Id: EstadoCivil.code,
                muni_Id: Municipio.code,
                cola_DireccionExacta: Dirrecion.trim(),
                cola_Telefono: Telefono.trim(),
                cola_UsuCreacion: parseInt(localStorage.getItem('usuID'))
            }

            axios.post(Global.url + 'Colaborador/Insertar', Colaborador)
                .then((r) => {

                    if (r.data.data.messageStatus == '1') {
                        localStorage.setItem('Colaborador', '1');
                        router.push('./Colaboradores_index')
                    }
                    else if (r.data.data.messageStatus.includes("UNIQUE KEY")) {
                        toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Ya existe un registro con este DNI', life: 2000 });
                    }
                })
                .catch((e) => {
                    toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Ups, algo salió mal. ¡Inténtalo nuevamente!', life: 2000 });
                })
        }
    }


    return (
        <div className='col-12'>
            <Toast ref={toast} />
            <div className="card" style={{ background: `rgb(105,101,235)`, height: '100px', width: '100%' }}>
                <div className="row text-center d-flex align-items-center">
                    <h2 style={{ color: 'white' }}>Ingresar Colaboradores</h2>
                </div>
            </div>

            <div className="card">
                <div className="grid p-fluid">

                    <div className="col-6">
                        <div className="field mt-3">
                            <label htmlFor="inputtext">Nombres</label><br />
                            <InputText type="text" id="inputtext" value={Nombres} onChange={(e) => setNombres(e.target.value)} className={classNames({ 'p-invalid': submitted && !Nombres.trim() })} />
                            {submitted && !Nombres.trim() && <small className="p-invalid" style={{ color: 'red' }}>El campo es requerido.</small>}
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="field mt-3">
                            <label htmlFor="inputtext">Apellidos</label><br />
                            <InputText type="text" id="inputtext" value={Apellidos} onChange={(e) => setApellidos(e.target.value)} className={classNames({ 'p-invalid': submitted && !Apellidos.trim() })} />
                            {submitted && !Apellidos.trim() && <small className="p-invalid" style={{ color: 'red' }}>El campo es requerido.</small>}
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="field">
                            <label htmlFor="inputtext">Identidad</label><br />
                            <InputMask id="inputmaskIdentidad" mask="9999-9999-99999" slotChar="0000-0000-00000" value={Identidad} onChange={(e) => setIdentidad(e.target.value)} className={classNames({ 'p-invalid': submitted && !Identidad })} />
                            {submitted && !Identidad.trim() && <small className="p-invalid" style={{ color: 'red' }}>El campo es requerido.</small>}
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="field">
                            <label htmlFor="calendar">Fecha Nacimiento</label>
                            <Calendar inputId="calendar" showIcon value={FechaNac} onChange={(e) => setFechaNac(e.target.value)} className={classNames({ 'p-invalid': submitted && !FechaNac })} />
                            {submitted && !FechaNac && <small className="p-invalid" style={{ color: 'red' }}>El campo es requerido.</small>}
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="field">
                            <label htmlFor="Sexo">Sexo</label><br />
                            <div className="grid">
                                <div className="col-12 md:col-4">
                                    <div className="field-radiobutton">
                                        <RadioButton inputId="option1" name="option" value="F" checked={Sexo === 'F'} onChange={(e) => setSexo(e.value)} className={classNames({ 'p-invalid': submitted && !Sexo })} />
                                        <label htmlFor="option1">Femenino</label>
                                    </div>
                                </div>
                                <div className="col-12 md:col-4">
                                    <div className="field-radiobutton">
                                        <RadioButton inputId="option2" name="option" value="M" checked={Sexo === 'M'} onChange={(e) => setSexo(e.value)} className={classNames({ 'p-invalid': submitted && !Sexo })} />
                                        <label htmlFor="option2">Masulino</label>
                                    </div>
                                </div>

                            </div>
                            {submitted && !Sexo && <small className="p-invalid" style={{ color: 'red' }}>El campo es requerido.</small>}
                        </div>
                    </div>

                    <div className='col-6'>
                        <div className="field">
                            <label htmlFor="Sexo">Estado Civil</label><br />
                            <Dropdown optionLabel="name" placeholder="Selecionar" options={EstadosCivilesDDL} value={EstadoCivil} onChange={(e) => setEstadoCivil(e.value)} className={classNames({ 'p-invalid': submitted && !EstadoCivil })} />
                            {submitted && !EstadoCivil && <small className="p-invalid" style={{ color: 'red' }}>Seleccione una opcion.</small>}
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="field">
                            <label htmlFor="inputtext">Telefono</label><br />
                            <InputMask id="inputmaskTelefono" mask="9999-9999" slotChar="0000-0000" value={Telefono} onChange={(e) => setTelefono(e.target.value)} className={classNames({ 'p-invalid': submitted && !Telefono })} />
                            {submitted && !Telefono && <small className="p-invalid" style={{ color: 'red' }}>El campo es requerido.</small>}
                        </div>
                    </div>

                    

                   

                    <div className='col-6'>
                        <div className="field">
                            <label htmlFor="Sexo">Departamento</label><br />
                            <Dropdown optionLabel="name" placeholder="Seleccionar" options={DepartaemntoDDL} value={Deparatemento} onChange={(e) => { setDepartamento(e.value); ActivarMunicipioDDl(e.value.code); }} className={classNames({ 'p-invalid': submitted && !Deparatemento })} />
                            {submitted && !Deparatemento && <small className="p-invalid" style={{ color: 'red' }}>Seleccione una opcion.</small>}
                        </div>
                    </div>

                    <div className='col-6'>
                        <div className="field">
                            <label htmlFor="Sexo">Municipio</label><br />
                            <Dropdown optionLabel="name" placeholder="Selecionar" options={MunicipioDDL} value={Municipio} onChange={(e) => setMunicipio(e.value)} disabled={MunicipioActivated} className={classNames({ 'p-invalid': MunicipioSubmited && !Municipio })} />
                            {MunicipioSubmited && !Municipio && <small className="p-invalid" style={{ color: 'red' }}>Seleccione una opcion.</small>}
                        </div>
                    </div>

                    <div className='col-12'>
                        <div className="field">
                            <label htmlFor="Sexo">Direccion</label><br />
                            <InputTextarea placeholder="" autoResize rows="3" cols="30" value={Dirrecion} onChange={(e) => setDirrecion(e.target.value)} className={classNames({ 'p-invalid': submitted && !Dirrecion.trim() })} />
                            {submitted && !Dirrecion && <small className="p-invalid" style={{ color: 'red' }}>El campo es requerido.</small>}
                        </div>
                    </div>

                    <div className='col-6'>
                        <div className="grid p-fluid">

                            <div className='col-6'>
                                <Button label="Crear" severity="success" onClick={() => Insetar()} />
                            </div>

                            <div className='col-6'>
                                <Button label="Cancelar" severity="default" onClick={() => router.push('./Colaboradores_index')} />
                            </div>


                        </div>
                    </div>

                </div>

            </div>
        </div>

    )
}

export default App;