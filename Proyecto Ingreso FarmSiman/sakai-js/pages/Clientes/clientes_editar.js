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
import moment from 'moment';


const EditarCliente = () => {

    const router = useRouter();
    const id = router.query.id; // optiene el id del resgitro a editar

    const [submitted, setSubmitted] = useState(false);
    const [MunicipioSubmited, setMunicipioSubmited] = useState(false);

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
    const [ide, setide] = useState('');

    //cargar ddl Cargos
    useEffect(() => {

        var admin = 0;
        var pant_Id = 12;
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

                    axios.get(Global.url + 'EstadoCivil/Listado')
                        .then(response => response.data)
                        .then((data) => setEstadosCivilesDDL(data.data.map((c) => ({ code: c.eciv_Id, name: c.eciv_Descripcion }))))
                        .catch(error => console.error(error))

                    axios.get(Global.url + 'Departamento/Listado')
                        .then(response => response.data)
                        .then((data) => setDepartamentoDDL(data.data.map((c) => ({ code: c.depa_Id, name: c.depa_Nombre }))))
                        .catch(error => console.error(error))


                    axios.get(Global.url + 'Cliente/Buscar?id=' + id)
                        .then((r) => {

                            setide(id);
                            setNombres(r.data.clie_Nombres);
                            setApellidos(r.data.clie_Apellidos);
                            setIdentidad(r.data.clie_Identidad);

                            var fecha = new Date(r.data.clie_FechaNacimiento)
                            setFechaNac(fecha);

                            setSexo(r.data.clie_Sexo);

                            var codeEsatdoCivil = { code: r.data.eciv_Id, name: r.data.eciv_Descripcion }
                            setEstadoCivil(codeEsatdoCivil);

                            setTelefono(r.data.clie_Telefono);

                            var codeDepto = { code: r.data.depa_Id, name: r.data.depa_Nombre }
                            setDepartamento(codeDepto);

                            AsiganrlevalorMunicipioDDL(codeDepto.code, r.data)

                            setDirrecion(r.data.clie_DireccionExacta);

                            //return r.data; // La respuesta ya está en formato JSON
                        })
                        .catch((e) => {

                            localStorage.setItem('ClienteInsert', '400');
                            router.push('./clientes_index');
                        })
                }
                else{
                    router.push('/');
                }
            })


    }, []);

    //cargar
    const AsiganrlevalorMunicipioDDL = (depa_Id, datos) => {
        setMunicipioActivated(false);
        axios.put(Global.url + 'Municipio/MunicipioDDL?id=' + depa_Id)
            .then(response => response.data)
            .then((data) => setMunicipioDDL(data.data.map((c) => ({ code: c.muni_Id, name: c.muni_Nombre }))))
            .catch(error => console.error(error))

        var codeMuni = { code: datos.muni_Id, name: datos.muni_Nombre }
        setMunicipio(codeMuni);
    }


    //onchange
    const ActivarMunicipioDDl = (depa_Id) => {

        setMunicipioActivated(false);
        axios.put(Global.url + 'Municipio/MunicipioDDL?id=' + depa_Id)
            .then(response => response.data)
            .then((data) => setMunicipioDDL(data.data.map((c) => ({ code: c.muni_Id, name: c.muni_Nombre }))))
            .catch(error => console.error(error))
    }


    const Editar = (e) => {
        if (!Nombres || !Apellidos || !Identidad || !FechaNac || !Sexo ||
            !EstadoCivil || !Deparatemento || !Municipio || !Dirrecion || !Telefono) {
            setSubmitted(true);

            if (Deparatemento && !Municipio) {
                setMunicipioSubmited(true);
            }
        }
        else {

            const fechaOriginal = FechaNac;
            const fechaMoment = moment(fechaOriginal);
            const fechaFormateada = fechaMoment.format("YYYY-MM-DD");
            console.log(fechaFormateada); // Salida: "2023/05/18"


            let Cliente111 = {
                clie_Id: parseInt(id),
                clie_Nombres: Nombres,
                clie_Apellidos: Apellidos,
                clie_Identidad: Identidad,
                clie_FechaNacimiento: fechaFormateada,
                clie_Sexo: Sexo,
                eciv_Id: EstadoCivil.code,
                muni_Id: Municipio.code,
                clie_DireccionExacta: Dirrecion,
                clie_Telefono: Telefono,
                clie_UsuCreacion: 0,
                clie_FechaCreacion: "2023-05-10T19:30:48.392Z",
                clie_UsuModificacion: 1,
                clie_FechaModificacion: "2023-05-10T19:30:48.392Z",
                clie_Estado: true
            }

            axios.post(Global.url + 'Cliente/Editar', Cliente111)
                .then((r) => {
                    localStorage.setItem('ClienteInsert', '2');
                    router.push('./clientes_index')
                })
                .catch((error) => {
                    console.error(error);
                });

        }

    }

    return (
        <div className='col-12'>
            <div className="card" style={{ background: `rgb(105,101,235)`, height: '100px', width: '100%' }}>
                <div className="row text-center d-flex align-items-center">
                    <h2 style={{ color: 'white' }}>Editar Clientes</h2>
                </div>
            </div>

            <div className="card">
                <div className="grid p-fluid">

                    <div className="col-6">
                        <div className="field mt-3">
                            <label htmlFor="inputtext">Nombres</label><br />
                            <InputText type="text" id="inputtext" value={Nombres} onChange={(e) => setNombres(e.target.value)} className={classNames({ 'p-invalid': submitted && !Nombres })} />
                            {submitted && !Nombres && <small className="p-invalid" style={{ color: 'red' }}>El campo es requerido.</small>}
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="field mt-3">
                            <label htmlFor="inputtext">Apellidos</label><br />
                            <InputText type="text" id="inputtext" value={Apellidos} onChange={(e) => setApellidos(e.target.value)} className={classNames({ 'p-invalid': submitted && !Apellidos })} />
                            {submitted && !Apellidos && <small className="p-invalid" style={{ color: 'red' }}>El campo es requerido.</small>}
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="field">
                            <label htmlFor="inputtext">Identidad</label><br />
                            <InputMask id="inputmaskIdentidad" mask="9999-9999-99999" value={Identidad} onChange={(e) => setIdentidad(e.target.value)} className={classNames({ 'p-invalid': submitted && !Identidad })} />
                            {submitted && !Identidad && <small className="p-invalid" style={{ color: 'red' }}>El campo es requerido.</small>}
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
                            <InputMask id="inputmaskTelefono" mask="+999 9999-9999" value={Telefono} onChange={(e) => setTelefono(e.target.value)} className={classNames({ 'p-invalid': submitted && !Telefono })} />
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
                            <InputTextarea placeholder="" autoResize rows="3" cols="30" value={Dirrecion} onChange={(e) => setDirrecion(e.target.value)} className={classNames({ 'p-invalid': submitted && !Dirrecion })} />
                            {submitted && !Dirrecion && <small className="p-invalid" style={{ color: 'red' }}>El campo es requerido.</small>}
                        </div>
                    </div>

                    <div className='col-6'>
                        <div className="grid p-fluid">

                            <div className='col-6'>
                                <Button label="Guardar" severity="success" onClick={() => Editar()} />
                            </div>

                            <div className='col-6'>
                                <Button label="Cancelar" severity="default" onClick={() => router.push('./clientes_index')} />
                            </div>


                        </div>
                    </div>

                </div>

            </div>
        </div>

    )

}

export default EditarCliente;