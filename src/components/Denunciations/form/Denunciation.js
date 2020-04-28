import React, {useState, useContext, useEffect} from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
//Fecha
import {Calendar} from 'primereact/calendar';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
//Imagen
import {FileUpload} from 'primereact/fileupload';

import authContext from "../../../context/auth/authContext";
import alertaContext from '../../../context/alertas/alertaContext';
import DenunciationContext from '../../../context/denunciation/DenunciationContext';
import {provincias_aqp, distritos_aqp} from './Ubigeo';

//Fecha en español
const es = {
    firstDayOfWeek: 1,
    dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
    monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
    monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
};

//Formulario de denuncia
const Denunciation = (props) => {
  
    //Extraer los valores del context
    const alertasContext = useContext(alertaContext);
    const { alerta, MostrarAlerta } = alertasContext;

    const authsContext = useContext(authContext);
    const { mensaje } = authsContext;

    //Obtener el state de Alerta
    const DenunciationsContext = useContext(DenunciationContext);
    const { AddDenunciation, EditDenunciation } = DenunciationsContext;
    

    //En caso de que el passwors o usuario no exista
    /*useEffect(() => {
        
        if (mensaje) {
            MostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        //Para evitar que mande error por que sabemos que esta bien
        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history]);*/
    
    //State para iniciar sesión
    const [denunciation, setDenunciation] = useState({
        den_id_custom: '',
        den_fecha_recepcion: '',dates1: null,//estos son juntos
        den_medio: '',
        den_agente_nombre:'',
        den_tipo: '',
        den_insecto: '',
        den_insecto_otro:'',
        den_habitante_nombre:'',
        den_habitante_telefono1:'',
        den_otro_telefono:false,
        den_habitante_telefono2:'',
        den_provincia: "",
        den_distrito:'',
        den_localidad:'',
        den_direccion:'',
        den_referencia:''
    });

    //Extraer de usuario
    const {  
        dates1, 
        den_fecha_recepcion,
        den_medio, 
        den_tipo,
        den_insecto,
        den_otro_telefono,
        den_provincia,
        den_distrito
    } = denunciation;

    const OnChange = e => {
        setDenunciation({
            ...denunciation,
            [e.target.name] : e.target.value
        });
        console.log(e.target.name);
        console.log(e.target.value);
    }
    const OnChangeCheck = e => {
        setDenunciation({
            ...denunciation,
            [e.target.name] : e.target.id
        });
    }

    const MyUploader = () => {
        console.log("se subio la imagen");
    }

    const OnSubmit = e => {
        e.preventDefault();
        //Validar que no haya campos vacios
        //if (username.trim() === '' || password.trim() === '') {
        //    MostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
        //}
        AddDenunciation(denunciation);
    }

    
    return (
        <>
            { alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null }
            <Form
                onSubmit={OnSubmit}
            >
                <Form.Group controlId="den_id_custom">
                    <Form.Label >Identificador de denuncia</Form.Label>
                    <Form.Control 
                        //readOnly
                        type='text'
                        name='den_id_custom'
                        //value={den_id_custom}
                        onChange={OnChange}
                    />
                </Form.Group>
                {/* DEN_FECHA_RECEPCION */}
                <Form.Group controlId="den_fecha_recepcion">
                    <Form.Label >Fecha de recepción</Form.Label>
                    <Calendar 
                        showIcon={true} 
                        locale={es} 
                        dateFormat="dd/mm/yy" 
                        name = 'den_fecha_recepcion'
                        value={den_fecha_recepcion} 
                        //OnChange={(e) => setDenunciation({...denunciation,dates1 : e.value})} 
                        onChange={OnChange}
                        readOnlyInput={true}
                    />
                </Form.Group>
                {/* DEN_MEDIO */}
                <Form.Group controlId="den_medio">
                    <Form.Label >Medio de denuncia*</Form.Label>
                    <Form.Control 
                        as="select"
                        name= 'den_medio'
                        value= {den_medio}
                        onChange= {OnChange}
                    >
                        <option>Seleccione...</option>
                        <option value="establecimiento">En establecimiento</option>
                        <option value="calle">En la calle</option>
                        <option value="telefono">Por teléfono</option>
                        <option value="agente">A través de agente</option>
                        <option value="whatsapp">Whatsapp</option>
                    </Form.Control>
                </Form.Group>
                { den_medio==="agente" ? (
                    <>
                        {/* DEN_AGENTE_NOMBRE */}
                        <Form.Group controlId="den_agente_nombre">
                            <Form.Label >Nombre del agente*</Form.Label>
                            <Form.Control 
                                type="text"
                                name= 'den_agente_nombre'
                                //value= {den_agente_nombre}
                                onChange= {OnChange}
                            />
                        </Form.Group>
                    </>
                    ) : null
                }
                {/* DEN_TIPO */}
                <Form.Group>
                    <Form.Label>Tipo de denuncia*</Form.Label>
                    <Col sm={10}>
                        <Form.Check
                            type="radio"
                            label="Verbal"
                            name="den_tipo"
                            id="verbal"
                            onChange= {OnChangeCheck}
                        />
                        <Form.Check
                            type="radio"
                            label="Con insecto"
                            name="den_tipo"
                            id="con_insecto"
                            onChange= {OnChangeCheck}
                        />
                    </Col>
                </Form.Group>
                {den_tipo==="verbal" || den_tipo==="con_insecto"?
                    (<>
                    {/* DEN_INSECTO */}
                    <Form.Group as={Row}>
                        <Form.Label as="legend" column sm={2}>
                            {den_tipo==="verbal"?"¿Qué cree que es?":"¿Qué insecto es?"}
                        </Form.Label>
                        <Col sm={10}> 
                            <Form.Check
                                type="radio"
                                label="Chinches de Cama"
                                name="den_insecto"
                                id="chinches_cama"
                                onChange= {OnChangeCheck}
                            />
                            <Form.Check
                                type="radio"
                                name="den_insecto"
                                label="Chirimachas"
                                id="chirimachas"
                                onChange= {OnChangeCheck}
                            />
                            <Form.Check
                                type="radio"
                                name="den_insecto"
                                label="Garrapatas"
                                id="garrapatas"
                                onChange= {OnChangeCheck}
                            />
                            <Form.Check
                                type="radio"
                                name="den_insecto"
                                label="Mosquitos"
                                id="mosquitos"
                                onChange= {OnChangeCheck}
                            />
                            <Form.Check
                                type="radio"
                                name="den_insecto"
                                label="Fitófagos"
                                id="fitofagos"
                                onChange= {OnChangeCheck}
                            />
                            <Form.Check
                                type="radio"
                                name="den_insecto"
                                label="Grillos"
                                id="grillos"
                                onChange= {OnChangeCheck}
                            />
                            <Form.Check
                                type="radio"
                                name="den_insecto"
                                label="Cucarachas"
                                id="cucarachas"
                                onChange= {OnChangeCheck}
                            />
                            <Form.Check
                                type="radio"
                                name="den_insecto"
                                label="Escarabajos"
                                id="escarabajos"
                                onChange= {OnChangeCheck}
                            />
                            <Form.Check
                                type="radio"
                                name="den_insecto"
                                label="Pulgones"
                                id="pulgones"
                                onChange= {OnChangeCheck}
                            />
                            <Form.Check
                                type="radio"
                                name="den_insecto"
                                label="Pulgas"
                                id="pulgas"
                                onChange= {OnChangeCheck}
                            />
                            <Form.Check
                                type="radio"
                                name="den_insecto"
                                label="Hitas"
                                id="hitas"
                                onChange= {OnChangeCheck}
                            />
                            <Form.Check
                                type="radio"
                                name="den_insecto"
                                label="Otro"
                                id="otro"
                                onChange= {OnChangeCheck}
                            />
                        </Col>
                    </Form.Group>
                    {den_insecto==="otro"? (
                        <>
                            {/* DEN_INSECTO_OTRO */}
                            <Form.Group controlId="den_insecto_otro">
                                <Form.Control 
                                    type="text"
                                    name= 'den_insecto_otro'
                                    //value= {den_insecto_otro}
                                    placeholder = "Especificar ..."
                                    onChange= {OnChange}
                                />
                            </Form.Group>
                        </>
                    ):null}
                    </>):null
                }
                { den_tipo==='con_insecto'? (
                    <>{/* DEN_INSECTO_IMAGEN */}
                        <Form.Group>
                            <Form.Label >Ingrese la imagen</Form.Label><br/>
                            <FileUpload name="demo"  url="./upload" mode="basic" chooseLabel="Subir imagen" accept="image/*"  customUpload={true} uploadHandler={MyUploader}/>
                        </Form.Group>
                    </>
                    ):null
                }
                {/* DEN_HABITANTE_NOMBRE */}
                <Form.Group controlId="den_habitante_nombre">
                    <Form.Label>Nombre del habitante*</Form.Label>
                    <Form.Control 
                        type='text'
                        name='den_habitante_nombre'
                        //value={den_habitante_nombre}
                        onChange={OnChange}
                    />
                </Form.Group>
                {/* DEN_HABITANTE_TELEFONO1 */}
                <Form.Group controlId="den_habitante_telefono1">
                    <Form.Label>Teléfono del Habitante*</Form.Label>
                    <Form.Control 
                        type='number'
                        name='den_habitante_telefono1'
                        //value={den_habitante_telefono1}
                        onChange={OnChange}
                    />
                </Form.Group>
                <Form.Group controlId="den_otro_telefono">
                    <Form.Check 
                        type="checkbox" 
                        label="Otro teléfono adicional"
                        name="den_otro_telefono"
                        onChange={OnChange}
                    />
                </Form.Group>
                {den_otro_telefono? 
                    (<>
                        {/* DEN_HABITANTE_TELEFONO2 */}
                        <Form.Group controlId="den_habitante_telefono2">
                            <Form.Control 
                                type='number'
                                name='den_habitante_telefono2'
                                //value={den_habitante_telefono2}
                                onChange={OnChange}
                            />
                        </Form.Group>
                    </>):null
                }
                {/* DEN_PROVINCIA */}
                <Form.Group controlId="den_provincia">
                    <Form.Label >Provincia*</Form.Label>
                    <Form.Control 
                        as="select"
                        name= 'den_provincia'
                        value= {den_provincia}
                        onChange= {OnChange}
                    >
                        <option>Seleccione Provincia</option>
                        {provincias_aqp.map((e, key) => {
                            return <option key={key} value={e.provinciaId}>{e.provinciaName}</option>;
                        })} 
                    </Form.Control>
                </Form.Group> 
                {/* DEN_DISTRITO */}
                <Form.Group controlId="den_distrito">
                    <Form.Label >Distrito*</Form.Label>
                    <Form.Control 
                        as="select"
                        name= 'den_distrito'
                        value= {den_distrito}
                        onChange= {OnChange}
                    >
                        <option>Seleccione Distrito</option>
                        {distritos_aqp[den_provincia].map((e, key) => {
                            return <option key={key} value={e.distritoId}>{e.distritoName}</option>;
                        })} 
                    </Form.Control>
                </Form.Group> 
                {/* DEN_LOCALIDAD */}
                <Form.Group controlId="den_localidad">
                    <Form.Label >Localidad</Form.Label>
                    <Form.Control 
                        type='text'
                        name='den_localidad'
                        //value={den_localidad}
                        onChange={OnChange}
                    />
                </Form.Group>
                {/* DEN_DIRECCION*/}
                <Form.Group controlId="den_direccion">
                    <Form.Label >Dirección*</Form.Label>
                    <Form.Control 
                        type='text'
                        name='den_direccion'
                        //value={den_direccion}
                        onChange={OnChange}
                    />
                </Form.Group>
                {/* DEN_REFERENCIA*/}
                <Form.Group controlId="den_referencia">
                    <Form.Label>Referencia*</Form.Label>
                    <Form.Control 
                        type='text'
                        name='den_referencia'
                        //value={den_referencia}
                        onChange={OnChange}
                    />
                </Form.Group>
                {/* DEN_FECHA_PROBABLE_INSPECCION*/}
                <Form.Group controlId="den_fecha_recepcion">
                    <Form.Label >Fecha probable de inspección</Form.Label>
                    <Calendar minDate={new Date()} showIcon={true} locale={es} dateFormat="dd/mm/yy" value={dates1} OnChange={(e) => setDenunciation({...denunciation,dates1 : e.value})} selectionMode="multiple" readOnlyInput={true}/>
                </Form.Group>
                <Button type='submit'>Guardar</Button> 
            </Form>
        </>
    );
}

export default Denunciation;