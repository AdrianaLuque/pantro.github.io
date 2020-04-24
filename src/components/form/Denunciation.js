import React, {useState, useContext, useEffect} from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
//Fecha
import {Calendar} from 'primereact/calendar';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
//Imagen
import {FileUpload} from 'primereact/fileupload';

import authContext from "../../context/auth/authContext";
import alertaContext from '../../context/alertas/alertaContext';

const es = {
    firstDayOfWeek: 1,
    dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
    monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
    monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
};

const provincias_aqp =[
    { provinciaId:"Arequipa", provinciaName:"Arequipa"},
    { provinciaId:"Camana", provinciaName:"Camaná"},
    { provinciaId:"Caraveli", provinciaName:"Caravelí"},
    { provinciaId:"Castilla", provinciaName:"Castilla"},
    { provinciaId:"Caylloma", provinciaName:"Caylloma"},
    { provinciaId:"Condesuyos", provinciaName:"Condesuyos"},
    { provinciaId:"Islay", provinciaName:"Islay"},
    { provinciaId:"La Union", provinciaName:"La Unión"}
];
const distritos_aqp = {
    "":[],
    "Arequipa":[
        {distritoId:"Alto Selva Alegre", distritoName:"Alto Selva Alegre"},
        {distritoId:"Cercado", distritoName:"Arequipa(Cercado)"},
        {distritoId:"Cayma", distritoName:"Cayma"},
        {distritoId:"Cerro Colorado", distritoName:"Cerro Colorado"},
        {distritoId:"Characato", distritoName:"Characato"},
        {distritoId:"Chiguata", distritoName:"Chiguata"},
        {distritoId:"Jacobo Hunter", distritoName:"Jacobo Hunter"},
        {distritoId:"Jose Luis Bustamante y Rivero", distritoName:"José Luis Bustamante y Rivero"},
        {distritoId:"La Joya", distritoName:"La Joya"},
        {distritoId:"Mariano Melgar", distritoName:"Mariano Melgar"},
        {distritoId:"Miraflores", distritoName:"Miraflores"},
        {distritoId:"Mollebaya", distritoName:"Mollebaya"},
        {distritoId:"Paucarpata", distritoName:"Paucarpata"},
        {distritoId:"Pocsi", distritoName:"Pocsi"},
        {distritoId:"Polobaya", distritoName:"Polobaya"},
        {distritoId:"Quequenha", distritoName:"Quequeña"},
        {distritoId:"Sabandia", distritoName:"Sabandía"},
        {distritoId:"Sachaca", distritoName:"Sachaca"},
        {distritoId:"San Juan de Siguas", distritoName:"San Juan de Siguas"},
        {distritoId:"San Juan de Tarucani", distritoName:"San Juan de Tarucani"},
        {distritoId:"Santa Isabel de Siguas", distritoName:"Santa Isabel de Siguas"},
        {distritoId:"Santa Rita de Siguas", distritoName:"Santa Rita de Siguas"},
        {distritoId:"Socabaya", distritoName:"Socabaya"},
        {distritoId:"Tiabaya", distritoName:"Tiabaya"},
        {distritoId:"Uchumayo", distritoName:"Uchumayo"},
        {distritoId:"Vitor", distritoName:"Vítor"},
        {distritoId:"Yanahuara", distritoName:"Yanahuara"},
        {distritoId:"Yarabamba", distritoName:"Yarabamba"},
        {distritoId:"Yura", distritoName:"Yura"}
    ],
    "Camana":[
        {distritoId:"Camana", distritoName:"Camaná"},
        {distritoId:"Jose Maria Quimper", distritoName:"José María Quimper"},
        {distritoId:"Mariano Nicolas Valcarcel", distritoName:"Mariano Nicolás Valcárcel"},
        {distritoId:"Mariscal Caceres", distritoName:"Mariscal Cáceres"},
        {distritoId:"Nicolas de Pierola", distritoName:"Nicolás de Piérola"},
        {distritoId:"Oconha", distritoName:"Ocoña"},
        {distritoId:"Quilca", distritoName:"Quilca"},
        {distritoId:"Samuel Pastor", distritoName:"Samuel Pastor"}
    ],
    "Caraveli":[
        {distritoId:"Acari", distritoName:"Acarí"},
        {distritoId:"Atico", distritoName:"Atico"},
        {distritoId:"Atiquipa", distritoName:"Atiquipa"},
        {distritoId:"Bella Union", distritoName:"Bella Unión"},
        {distritoId:"Cahuacho", distritoName:"Cahuacho"},
        {distritoId:"Caraveli", distritoName:"Caravelí"},
        {distritoId:"Chala", distritoName:"Chala"},
        {distritoId:"Chaparra", distritoName:"Chaparra"},
        {distritoId:"Huanuhuanu", distritoName:"Huanuhuanu"},
        {distritoId:"Jaqui", distritoName:"Jaqui"},
        {distritoId:"Lomas", distritoName:"Lomas"},
        {distritoId:"Quicacha", distritoName:"Quicacha"},
        {distritoId:"Yauca", distritoName:"Yauca"},
    ],
    "Castilla":[
        {distritoId:"Andahua", distritoName:"Andahua"},
        {distritoId:"Aplao", distritoName:"Aplao"},
        {distritoId:"Ayo", distritoName:"Ayo"},
        {distritoId:"Chachas", distritoName:"Chachas"},
        {distritoId:"Chilcaymarca", distritoName:"Chilcaymarca"},
        {distritoId:"Choco", distritoName:"Choco"},
        {distritoId:"Huancarqui", distritoName:"Huancarqui"},
        {distritoId:"Machaguay", distritoName:"Machaguay"},
        {distritoId:"Orcopampa", distritoName:"Orcopampa"},
        {distritoId:"Pampacolca", distritoName:"Pampacolca"},
        {distritoId:"Tipan", distritoName:"Tipán"},
        {distritoId:"Unhon", distritoName:"Uñón"},
        {distritoId:"Uraca", distritoName:"Uraca"},
        {distritoId:"Viraco", distritoName:"Viraco"}        
    ],
    "Caylloma":[
        {distritoId:"Achoma", distritoName:"Achoma"},
        {distritoId:"Cabanaconde", distritoName:"Cabanaconde"},
        {distritoId:"Callalli", distritoName:"Callalli"},
        {distritoId:"Caylloma", distritoName:"Caylloma"},
        {distritoId:"Chivay", distritoName:"Chivay"},
        {distritoId:"Coporaque", distritoName:"Coporaque"},
        {distritoId:"Huambo", distritoName:"Huambo"},
        {distritoId:"Huanca", distritoName:"Huanca"},
        {distritoId:"Ichupampa", distritoName:"Ichupampa"},
        {distritoId:"Lari", distritoName:"Lari"},
        {distritoId:"Lluta", distritoName:"Lluta"},
        {distritoId:"Maca", distritoName:"Maca"},
        {distritoId:"Madrigal", distritoName:"Madrigal"},
        {distritoId:"Majes", distritoName:"Majes"},
        {distritoId:"San Antonio de Chuca", distritoName:"San Antonio de Chuca"},
        {distritoId:"Sibayo", distritoName:"Sibayo"},
        {distritoId:"Tapay", distritoName:"Tapay"},
        {distritoId:"Tisco", distritoName:"Tisco"},
        {distritoId:"Tuti", distritoName:"Tuti"},
        {distritoId:"Yanque", distritoName:"Yanque"},
    ],
    "Condesuyos":[
        {distritoId:"Andaray", distritoName:"Andaray"},
        {distritoId:"Cayarani", distritoName:"Cayarani"},
        {distritoId:"Chichas", distritoName:"Chichas"},
        {distritoId:"Chuquibamba", distritoName:"Chuquibamba"},
        {distritoId:"Iray", distritoName:"Iray"},
        {distritoId:"Rio Grande", distritoName:"Río Grande"},
        {distritoId:"Salamanca", distritoName:"Salamanca"},
        {distritoId:"Yanaquihua", distritoName:"Yanaquihua"}
    ],
    "Islay":[
        {distritoId:"Cocachacra", distritoName:"Cocachacra"},
        {distritoId:"Dean Valdivia", distritoName:"Deán Valdivia"},
        {distritoId:"Islay", distritoName:"Islay"},
        {distritoId:"Mejia", distritoName:"Mejía"},
        {distritoId:"Mollendo", distritoName:"Mollendo"},
        {distritoId:"Punta de Bombon", distritoName:"Punta de Bombón"}
    ],
    "La Union":[
        {distritoId:"Alca", distritoName:"Alca"},
        {distritoId:"Charcana", distritoName:"Charcana"},
        {distritoId:"Cotahuasi", distritoName:"Cotahuasi"},
        {distritoId:"Huaynacotas", distritoName:"Huaynacotas"},
        {distritoId:"Pampamarca", distritoName:"Pampamarca"},
        {distritoId:"Puyca", distritoName:"Puyca"},
        {distritoId:"Quechualla", distritoName:"Quechualla"},
        {distritoId:"Sayla", distritoName:"Sayla"},
        {distritoId:"Tauria", distritoName:"Tauría"},
        {distritoId:"Tomepampa", distritoName:"Tomepampa"},
        {distritoId:"Toro", distritoName:"Toro"}
    ]
};

//Formulario de denuncia
const Denunciation = (props) => {
  
    //Extraer los valores del context
    const alertasContext = useContext(alertaContext);
    const { alerta, MostrarAlerta } = alertasContext;

    const authsContext = useContext(authContext);
    const { mensaje } = authsContext;

    //En caso de que el passwors o usuario no exista
    /*useEffect(() => {
        
        if (mensaje) {
            MostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        //Para evitar que mande error por que sabemos que esta bien
        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history]);*/
    
    //State para iniciar sesión
    const [usuario, guardarUsuario] = useState({
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
        den_medio, 
        den_tipo,
        den_insecto,
        den_otro_telefono,
        den_provincia,
        den_distrito
    } = usuario;

    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        });
        //console.log(e.target.name);
        //console.log(e.target.value);
    }
    const OnChangeCheck = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.id
        });
    }

    const MyUploader = () => {
        console.log("se subio la imagen");
    }

    const onSubmit = e => {
        e.preventDefault();
        //Validar que no haya campos vacios
        //if (username.trim() === '' || password.trim() === '') {
        //    MostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
        //}
    }

    
    return (
        <>
            { alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null }
            <Form
                onSubmit={onSubmit}
            >
                <Form.Group controlId="den_id_custom">
                    <Form.Label >Identificador de denuncia</Form.Label>
                    <Form.Control 
                        readOnly
                        type='text'
                        name='den_id_custom'
                        //value={den_id_custom}
                        onChange={onChange}
                    />
                </Form.Group>
                {/* DEN_FECHA_RECEPCION */}
                <Form.Group controlId="den_fecha_recepcion">
                    <Form.Label >Fecha de recepción</Form.Label>
                    <Calendar showIcon={true} locale={es} dateFormat="dd/mm/yy" value={dates1} onChange={(e) => guardarUsuario({...usuario,dates1 : e.value})} readOnlyInput={true}/>
                </Form.Group>
                {/* DEN_MEDIO */}
                <Form.Group controlId="den_medio">
                    <Form.Label >Medio de denuncia*</Form.Label>
                    <Form.Control 
                        as="select"
                        name= 'den_medio'
                        value= {den_medio}
                        onChange= {onChange}
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
                                onChange= {onChange}
                            />
                        </Form.Group>
                    </>
                    ) : null
                }
                {/* DEN_TIPO */}
                <Form.Group as={Row}>
                    <Form.Label as="legend" column sm={2}>
                        Tipo de denuncia*
                    </Form.Label>
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
                                    onChange= {onChange}
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
                        onChange={onChange}
                    />
                </Form.Group>
                {/* DEN_HABITANTE_TELEFONO1 */}
                <Form.Group controlId="den_habitante_telefono1">
                    <Form.Label>Teléfono del Habitante*</Form.Label>
                    <Form.Control 
                        type='number'
                        name='den_habitante_telefono1'
                        //value={den_habitante_telefono1}
                        onChange={onChange}
                    />
                </Form.Group>
                <Form.Group controlId="den_otro_telefono">
                    <Form.Check 
                        type="checkbox" 
                        label="Otro teléfono adicional"
                        name="den_otro_telefono"
                        onChange={onChange}
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
                                onChange={onChange}
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
                        onChange= {onChange}
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
                        onChange= {onChange}
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
                        onChange={onChange}
                    />
                </Form.Group>
                {/* DEN_DIRECCION*/}
                <Form.Group controlId="den_direccion">
                    <Form.Label >Dirección*</Form.Label>
                    <Form.Control 
                        type='text'
                        name='den_direccion'
                        //value={den_direccion}
                        onChange={onChange}
                    />
                </Form.Group>
                {/* DEN_REFERENCIA*/}
                <Form.Group controlId="den_referencia">
                    <Form.Label>Referencia*</Form.Label>
                    <Form.Control 
                        type='text'
                        name='den_referencia'
                        //value={den_referencia}
                        onChange={onChange}
                    />
                </Form.Group>
                {/* DEN_FECHA_PROBABLE_INSPECCION*/}
                <Form.Group controlId="den_fecha_recepcion">
                    <Form.Label >Fecha probable de inspección</Form.Label>
                    <Calendar minDate={new Date()} showIcon={true} locale={es} dateFormat="dd/mm/yy" value={dates1} onChange={(e) => guardarUsuario({...usuario,dates1 : e.value})} selectionMode="multiple" readOnlyInput={true}/>
                </Form.Group>
                                
            </Form>
        </>
    );
}

export default Denunciation;