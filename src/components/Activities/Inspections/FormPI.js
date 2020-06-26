import React, {useState, useContext, useEffect} from 'react';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import {Calendar} from 'primereact/calendar';//Fecha
import 'primereact/resources/themes/nova-light/theme.css';//Fecha
import 'primereact/resources/primereact.min.css';//Fecha
import 'primeicons/primeicons.css';//Fecha
import { useForm } from "react-hook-form";//Validar

import AlertContext from '../../../context/alert/AlertContext';
import InspectionContext from '../../../context/inspection/InspectionContext';
import MyModal from "../../Modal/MyModal";
import { es, DateFull, initInspection } from "../../../resources";

//Formulario de denuncia
const FormHP = (props) => {
  
    //Extraer los valores del context
    const AlertsContext = useContext(AlertContext);
    const { alert, ShowAlert } = AlertsContext;

    //Extraer los valores del context
    const InspectionsContext = useContext(InspectionContext);
    const { inspection } = InspectionsContext;

    /*const authsContext = useContext(authContext);
    const { mensaje } = authsContext;*/
    
    //En caso de que el passwors o usuario no exista
    /*useEffect(() => {
        
        if (mensaje) {
            MostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        //Para evitar que mande error por que sabemos que esta bien
        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history]);*/
    
    //validacion
    const { register, handleSubmit, errors } = useForm();
    
    //State para denuncias
    const [currentDenunciation, setCurrentDenunciation] = useState( initInspection );
    
    //Extraer de usuario
    const {  
        visita_agente_fecha,
        visita_agente_motivo,
        visita_agente_motivo_llamado,
        visita_agente_motivo_llamado_otro,
        visita_agente_datos_nuevos
    } = currentDenunciation;
        
    const OnChange = e => {
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
    }

    const MyUploader = () => {
        console.log("se subio la imagen");
    };

    const OnSubmit = () => {
        //Obteniendo solo la fecha en campos calendar
        currentDenunciation.den_fecha_recepcion = DateFull(currentDenunciation.den_fecha_recepcion);
        currentDenunciation.den_fecha_probable_inspeccion = DateSome(currentDenunciation.den_fecha_probable_inspeccion);

        //AddDenunciation(currentDenunciation);
        props.ChangeModal();
    };
    
    return (
        <MyModal modal={props.modal} ChangeModal={props.ChangeModal} formTitle={props.formTitle}>
            { alert ? (<Alert className='alert' variant='danger'>{alert.msg}</Alert>) : null }
            <Form
                onSubmit={handleSubmit(OnSubmit)}
            >   
                {/* VISITA_AGENTE_FECHA */}
                <Form.Group controlId="visita_agente_fecha">
                    <Form.Label>Fecha de visita: </Form.Label>
                    <Calendar 
                        showIcon={true} 
                        locale={es} 
                        dateFormat="yy-mm-dd" 
                        name = 'visita_agente_fecha'
                        value={visita_agente_fecha} 
                        onChange={OnChange}
                    />
                </Form.Group>
                {/* VISITA_PS_MOTIVO */}
                <Form.Group>
                    <Form.Label>¿Cuál es el motivo de la visita?</Form.Label>
                    <Col sm={10}>
                        <Form.Check
                            type="radio"
                            label="Visita programada"
                            name="visita_agente_motivo"
                            value="visita_programada"
                            checked={ visita_agente_motivo=== "visita_programada"}
                            onChange= {OnChange}
                            ref={register({ required: true })}
                        />
                        <Form.Check
                            type="radio"
                            label="Llamado de agente"
                            name="visita_agente_motivo"
                            value="llamado_agente"
                            checked={ visita_agente_motivo=== "llamado_agente"}
                            onChange= {OnChange}
                            ref={register({ required: true })}
                        />
                    </Col>
                    {errors.visita_agente_motivo && <span className='alert-custom'>*Campo obligatorio</span>}
                </Form.Group>
                {visita_agente_motivo==="llamado_agente"? (
                <>
                    {/* VISITA_AGENTE_MOTIVO_LLAMADO */}
                    <Form.Group>
                        <Form.Label>¿Cuál fue el motivo de la llamada?</Form.Label>
                        <Col sm={10}>
                            <Form.Check
                                type="radio"
                                label="Reporte de chinches de cama"
                                name="visita_agente_motivo_llamado"
                                value="reporte_chinchescama"
                                checked={ visita_agente_motivo_llamado=== "reporte_chinchescama"}
                                onChange= {OnChange}
                                ref={register({ required: true })}
                            />
                            <Form.Check
                                type="radio"
                                label="Reporte de chirimachas"
                                name="visita_agente_motivo_llamado"
                                value="reporte_chirimachas"
                                checked={ visita_agente_motivo_llamado=== "reporte_chirimachas"}
                                onChange= {OnChange}
                                ref={register({ required: true })}
                            />
                            <Form.Check
                                type="radio"
                                label="Llamado para que haga recojo de datos"
                                name="visita_agente_motivo_llamado"
                                value="llamado_recojo_datos"
                                checked={ visita_agente_motivo_llamado=== "llamado_recojo_datos"}
                                onChange= {OnChange}
                                ref={register({ required: true })}
                            />
                            <Form.Check
                                type="radio"
                                label="Otro"
                                name="visita_agente_motivo_llamado"
                                value="otro"
                                checked={ visita_agente_motivo_llamado=== "otro"}
                                onChange= {OnChange}
                                ref={register({ required: true })}
                            />
                        </Col>
                        {errors.den_tipo && <span className='alert-custom'>*Campo obligatorio</span>}
                    </Form.Group>
                    {visita_agente_motivo_llamado==="otro"? (
                        <>
                            {/* VISITA_AGENTE_MOTIVO_LLAMADO_OTRO */}
                            <Form.Group controlId="visita_agente_motivo_llamado_otro">
                                <Form.Control 
                                    type="text"
                                    name= 'visita_agente_motivo_llamado_otro'
                                    value= {visita_agente_motivo_llamado_otro}
                                    placeholder = "¿Cuál? ..."
                                    onChange= {OnChange}
                                    ref={register({ required: true })}
                                />
                                {errors.visita_agente_motivo_llamado_otro && <span className='alert-custom'>*Campo obligatorio</span>}
                            </Form.Group>
                        </>
                    ):null}
                </>
                ):null}
                {/* VISITA_AGENTE_DATOS_NUEVOS */}
                <Form.Group>
                    <Form.Label>¿El agente tenía datos nuevos de visitas?</Form.Label>
                    <Col sm={10}>
                        <Form.Check
                            type="radio"
                            label="Si"
                            name="visita_agente_datos_nuevos"
                            value="1"
                            checked={ visita_agente_datos_nuevos=== "1"}
                            onChange= {OnChange}
                            ref={register({ required: true })}
                        />
                        <Form.Check
                            type="radio"
                            label="No"
                            name="visita_agente_datos_nuevos"
                            value="0"
                            checked={ visita_agente_datos_nuevos=== "0"}
                            onChange= {OnChange}
                            ref={register({ required: true })}
                        />
                    </Col>
                    {errors.visita_agente_datos_nuevos && <span className='alert-custom'>*Campo obligatorio</span>}
                </Form.Group>
                {visita_agente_datos_nuevos==="1"? (
                    <span>No se olvide de enviar la foto al grupo de whatsapp. Gracias</span>                        
                ):null}
                <br/>
                <br/>
                <Button disabled type='submit'>Guardar</Button> 
            </Form>
        </MyModal>
    );
}

export default FormHP;