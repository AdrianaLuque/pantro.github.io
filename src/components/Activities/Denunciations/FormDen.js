import React, {useState, useContext, useEffect} from 'react';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import {Calendar} from 'primereact/calendar';//Fecha
import 'primereact/resources/themes/nova-light/theme.css';//Fecha
import 'primereact/resources/primereact.min.css';//Fecha
import 'primeicons/primeicons.css';//Fecha
import {FileUpload} from 'primereact/fileupload';//Imagen
import { useForm } from "react-hook-form";//Validar

import AlertContext from '../../../context/alert/AlertContext';
import AuthenticationContext from "../../../context/authentication/AuthenticationContext";
import DenunciationContext from '../../../context/denunciation/DenunciationContext';
import MyModal from "../../Modal/MyModal";
//Recursos
import { es, provincias_aqp, distritos_aqp, DateFull, initDenunciation } from "../../../resources";

//Formulario de denuncia
const FormDen = (props) => {
    //Extraer los valores del context
    const AlertsContext = useContext(AlertContext);
    const { alert } = AlertsContext;
    //Variables de usuario
    const AuthenticationsContext = useContext(AuthenticationContext);
    const { user } = AuthenticationsContext;
    //Obtener variables de denuncias
    const DenunciationsContext = useContext(DenunciationContext);
    const { valueEditDen, statusBtnEdit, statusBtnAdd, AddDenunciation, EditDenunciation } = DenunciationsContext;
    
    //validacion
    const { register, handleSubmit, errors, reset } = useForm();
    //State para denuncias
    const [currentDenunciation, setCurrentDenunciation] = useState( initDenunciation );
    
    useEffect(() => {
        if ( statusBtnEdit ) {
            setCurrentDenunciation(valueEditDen);
        } else if ( statusBtnAdd ) {
            setCurrentDenunciation(initDenunciation);
            reset(initDenunciation);
        }
        // eslint-disable-next-line
    }, [statusBtnEdit, statusBtnAdd, valueEditDen]);
    //Poner usuario y microred
    currentDenunciation.usu_cuenta = user.USU_CUENTA.toUpperCase();
    currentDenunciation.usu_microred = user.USU_MICRORED;
    //Extraer de usuario
    const {  
        den_id_custom,
        den_fecha_recepcion,
        den_medio, 
        den_agente_nombre,
        den_tipo,
        den_insecto,
        den_insecto_otro,
        den_habitante_nombre,
        den_habitante_telefono1,
        den_otro_telefono,
        den_habitante_telefono2,
        den_provincia,
        den_distrito,
        den_localidad,
        den_direccion,
        den_referencia,
        den_fecha_probable_inspeccion
    } = currentDenunciation;
    
    const OnChange = e => {
        console.log(e.target.name);
        console.log(e.target.value);
        setCurrentDenunciation({
            ...currentDenunciation,
            [e.target.name] : e.target.value
        });
    };

    const OnChangeCheck = e => {
        setCurrentDenunciation({
            ...currentDenunciation,
            [e.target.name] : e.target.checked
        });
    };

    //Funcion para obtener los datos de fecha de probable inspeccion
    const DateSome = ( arrayDate ) => {
        let result = 'NA';
        if ( arrayDate!== null) {
            result = DateFull(arrayDate[0]);
            if (arrayDate.length > 1) {
                for (let i = 1; i < arrayDate.length; i++) {
                    result = result +'&'+ DateFull(arrayDate[i]);
                }
            }
        }
        return (result);
    };

    const MyUploader = () => {
        console.log("se subio la imagen");
    };

    const OnSubmit = () => {
        debugger;
        //Obteniendo solo la fecha en campos calendar
        currentDenunciation.den_fecha_recepcion = DateFull(new Date(currentDenunciation.den_fecha_recepcion));
        //currentDenunciation.den_fecha_probable_inspeccion = DateSome(currentDenunciation.den_fecha_probable_inspeccion);
        //Verificar si es ADD o EDIT
        if ( statusBtnEdit ) {
            EditDenunciation(currentDenunciation);
        } else if ( statusBtnAdd ) {
            AddDenunciation(currentDenunciation);
            setCurrentDenunciation(initDenunciation);
        }
        props.ChangeModal();
    };
    
    return (
        <MyModal modal={props.modal} ChangeModal={props.ChangeModal} formTitle={props.formTitle}>
            { alert ? (<Alert className='alert' variant='danger'>{alert.msg}</Alert>) : null }
            <Form
                onSubmit={handleSubmit(OnSubmit)}
            >
                <Form.Group controlId="den_id_custom">
                    <Form.Label >Identificador de denuncia</Form.Label>
                    <Form.Control 
                        readOnly
                        type='text'
                        name='den_id_custom'
                        value={den_id_custom}
                        //onChange={OnChange}
                    />
                </Form.Group>
                {/* DEN_FECHA_RECEPCION */}
                <Form.Group controlId="den_fecha_recepcion">
                    <Form.Label>Fecha de recepción: </Form.Label>
                    <Calendar 
                        showIcon={true} 
                        locale={es} 
                        dateFormat="yy-mm-dd" 
                        name = 'den_fecha_recepcion'
                        value={new Date(den_fecha_recepcion)} 
                        onChange={OnChange}
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
                        ref={register({ required: true })}
                    >
                        <option value="">Seleccione...</option>
                        <option value="establecimiento">En establecimiento</option>
                        <option value="calle">En la calle</option>
                        <option value="telefono">Por teléfono</option>
                        <option value="agente">A través de agente</option>
                        <option value="whatsapp">Whatsapp</option>
                    </Form.Control>
                    {errors.den_medio && <span className='alert-custom'>*Campo obligatorio</span>}
                </Form.Group>

                { den_medio==="agente" ? (
                    <>
                        {/* DEN_AGENTE_NOMBRE */}
                        <Form.Group controlId="den_agente_nombre">
                            <Form.Label >Nombre del agente*</Form.Label>
                            <Form.Control 
                                type="text"
                                name= 'den_agente_nombre'
                                defaultValue= {den_agente_nombre}
                                onChange= {OnChange}
                                ref={register({ required: true })}
                            />
                            {errors.den_agente_nombre && <span className='alert-custom'>*Campo obligatorio</span>}
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
                            value="verbal"
                            checked={ den_tipo=== "verbal"}
                            onChange= {OnChange}
                            ref={register({ required: true })}
                        />
                        <Form.Check
                            type="radio"
                            label="Con insecto"
                            name="den_tipo"
                            value="con_insecto"
                            checked={ den_tipo=== "con_insecto"}
                            onChange= {OnChange}
                            ref={register({ required: true })}
                        />
                    </Col>
                    {errors.den_tipo && <span className='alert-custom'>*Campo obligatorio</span>}
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
                                value="chinches_cama"
                                checked={ den_insecto=== "chinches_cama"}
                                onChange= {OnChange}
                                ref={register({ required: true })}
                            />
                            <Form.Check
                                type="radio"
                                name="den_insecto"
                                label="Chirimachas"
                                value="chirimachas"
                                checked={ den_insecto=== "chirimachas"}
                                onChange= {OnChange}
                                ref={register({ required: true })}
                            />
                            <Form.Check
                                type="radio"
                                name="den_insecto"
                                label="Garrapatas"
                                value="garrapatas"
                                checked={ den_insecto=== "garrapatas"}
                                onChange= {OnChange}
                                ref={register({ required: true })}
                            />
                            <Form.Check
                                type="radio"
                                name="den_insecto"
                                label="Mosquitos"
                                value="mosquitos"
                                checked={ den_insecto=== "mosquitos"}
                                onChange= {OnChange}
                                ref={register({ required: true })}
                            />
                            <Form.Check
                                type="radio"
                                name="den_insecto"
                                label="Fitófagos"
                                value="fitofagos"
                                checked={ den_insecto=== "fitofagos"}
                                onChange= {OnChange}
                                ref={register({ required: true })}
                            />
                            <Form.Check
                                type="radio"
                                name="den_insecto"
                                label="Grillos"
                                value="grillos"
                                checked={ den_insecto=== "grillos"}
                                onChange= {OnChange}
                                ref={register({ required: true })}
                            />
                            <Form.Check
                                type="radio"
                                name="den_insecto"
                                label="Cucarachas"
                                value="cucarachas"
                                checked={ den_insecto=== "cucarachas"}
                                onChange= {OnChange}
                                ref={register({ required: true })}
                            />
                            <Form.Check
                                type="radio"
                                name="den_insecto"
                                label="Escarabajos"
                                value="escarabajos"
                                checked={ den_insecto=== "escarabajos"}
                                onChange= {OnChange}
                                ref={register({ required: true })}
                            />
                            <Form.Check
                                type="radio"
                                name="den_insecto"
                                label="Pulgones"
                                value="pulgones"
                                checked={ den_insecto=== "pulgones"}
                                onChange= {OnChange}
                                ref={register({ required: true })}
                            />
                            <Form.Check
                                type="radio"
                                name="den_insecto"
                                label="Pulgas"
                                value="pulgas"
                                checked={ den_insecto=== "pulgas"}
                                onChange= {OnChange}
                                ref={register({ required: true })}
                            />
                            <Form.Check
                                type="radio"
                                name="den_insecto"
                                label="Hitas"
                                value="hitas"
                                checked={ den_insecto=== "hitas"}
                                onChange= {OnChange}
                                ref={register({ required: true })}
                            />
                            <Form.Check
                                type="radio"
                                name="den_insecto"
                                label="Otro"
                                value="otro"
                                checked={ den_insecto=== "otro"}
                                onChange= {OnChange}
                                ref={register({ required: true })}
                            />
                        </Col>
                        {errors.den_insecto && <span className='alert-custom'>*Campo obligatorio</span>}
                    </Form.Group>
                    {den_insecto==="otro"? (
                        <>
                            {/* DEN_INSECTO_OTRO */}
                            <Form.Group controlId="den_insecto_otro">
                                <Form.Control 
                                    type="text"
                                    name= 'den_insecto_otro'
                                    defaultValue= {den_insecto_otro}
                                    placeholder = "Especificar ..."
                                    onChange= {OnChange}
                                    ref={register({ required: true })}
                                />
                                {errors.den_insecto_otro && <span className='alert-custom'>*Campo obligatorio</span>}
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
                {/* DEN_HABITANTE_NOMBRE*/}
                <Form.Group controlId="den_habitante_nombre">
                    <Form.Label>Nombre del habitante*</Form.Label>
                    <Form.Control 
                        type='text'
                        name='den_habitante_nombre'
                        defaultValue={den_habitante_nombre}
                        onChange={OnChange}
                        ref={register({ required: true })}
                    />
                    {errors.den_habitante_nombre && <span className='alert-custom'>*Campo obligatorio</span>}
                </Form.Group>
                {/* DEN_HABITANTE_TELEFONO1 */}
                <Form.Group controlId="den_habitante_telefono1">
                    <Form.Label>Teléfono del Habitante</Form.Label>
                    <Form.Control 
                        type='number'
                        name='den_habitante_telefono1'
                        defaultValue={den_habitante_telefono1}
                        onChange={OnChange}
                    />
                </Form.Group>
                <Form.Group controlId="den_otro_telefono">
                    <Form.Check
                        type="checkbox"
                        name='den_otro_telefono'
                        label='Otro teléfono adicional'
                        checked={ den_otro_telefono }
                        onChange={OnChangeCheck}
                    />
                </Form.Group>
                {den_otro_telefono? 
                    (<>
                        {/* DEN_HABITANTE_TELEFONO2 */}
                        <Form.Group controlId="den_habitante_telefono2">
                            <Form.Control 
                                type='number'
                                name='den_habitante_telefono2'
                                defaultValue={den_habitante_telefono2}
                                onChange={OnChange}
                                ref={register({ required: true, maxLength: 9 })}
                            />
                            {errors.den_habitante_telefono2?.type === 'required' && <span className='alert-custom'>*Campo obligatorio</span>}
                            {errors.den_habitante_telefono2?.type === 'maxLength' && <span className='alert-custom'>*Maximo 9 numeros</span>}
                        </Form.Group>
                    </>):null
                }
                {/* DEN_PROVINCIA */}
                <Form.Group controlId="den_provincia">
                    <Form.Label >Provincia</Form.Label>
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
                    <Form.Label >Distrito</Form.Label>
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
                        defaultValue={den_localidad}
                        onChange={OnChange}
                    />
                </Form.Group>
                {/* DEN_DIRECCION*/}
                <Form.Group controlId="den_direccion">
                    <Form.Label >Dirección*</Form.Label>
                    <Form.Control 
                        type='text'
                        name='den_direccion'
                        defaultValue={den_direccion}
                        onChange={OnChange}
                        ref={register({ required: true })}
                    />
                    {errors.den_direccion && <span className='alert-custom'>*Campo obligatorio</span>}
                </Form.Group>
                {/* DEN_REFERENCIA*/}
                <Form.Group controlId="den_referencia">
                    <Form.Label>Referencia*</Form.Label>
                    <Form.Control 
                        type='text'
                        name='den_referencia'
                        defaultValue={den_referencia}
                        onChange={OnChange}
                        ref={register({ required: true })}
                    />
                    {errors.den_referencia && <span className='alert-custom'>*Campo obligatorio</span>}
                </Form.Group>
                {/* DEN_FECHA_PROBABLE_INSPECCION*/}
                <Form.Group controlId="den_fecha_probable_inspeccion">
                    <Form.Label >Fecha probable de inspección: </Form.Label>
                    <Calendar 
                        minDate = { new Date() }
                        maxDateCount = {3}
                        showIcon={true} 
                        locale={es} 
                        dateFormat="dd/mm/yy" 
                        value={den_fecha_probable_inspeccion} 
                        name= 'den_fecha_probable_inspeccion'
                        onChange={ OnChange } 
                        selectionMode="multiple" 
                        readOnlyInput={true} 
                    />
                </Form.Group>
                <Button type='submit'>Guardar</Button> 
            </Form>
        </MyModal>
    );
}

export default FormDen;