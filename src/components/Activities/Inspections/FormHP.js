import React, {useState, useContext} from 'react';
import { Col, Form, Button, Alert } from 'react-bootstrap';
import {Calendar} from 'primereact/calendar';//Fecha
import 'primereact/resources/themes/nova-light/theme.css';//Fecha
import 'primereact/resources/primereact.min.css';//Fecha
import 'primeicons/primeicons.css';//Fecha
import { useForm } from "react-hook-form";//Validar

import AlertContext from '../../../context/alert/AlertContext';
import InspectionContext from '../../../context/inspection/InspectionContext';
import MyModal from "../../Modal/MyModal";
import { es, DateFull } from "../../../resources";

//Formulario de denuncia
const FormHP = (props) => {
  
    //Extraer los valores del context
    const AlertsContext = useContext(AlertContext);
    const { alert, ShowAlert } = AlertsContext;

    //Extraer los valores del context
    const InspectionsContext = useContext(InspectionContext);
    const { inspection } = InspectionsContext;
    
    //validacion
    const { register, handleSubmit, errors } = useForm();
    
    //State para denuncias
    const [currentDenunciation, setCurrentDenunciation] = useState( inspection );
    
    //Extraer de usuario
    const {  
        visita_ps_fecha,
        visita_ps_motivo,
        visita_ps_motivo_otro,
        visita_ps_motivo_llamado,
        visita_ps_motivo_llamado_otro,
        visita_ps_nuevas_denuncias,
        visita_ps_quien_dio_informacion,
        visita_ps_quien_dio_informacion_otro,
        visita_ps_encontro_insecto
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
                {/* VISITA_PS_FECHA */}
                <Form.Group controlId="visita_ps_fecha">
                    <Form.Label>Fecha de visita: </Form.Label>
                    <Calendar 
                        showIcon={true} 
                        locale={es} 
                        dateFormat="yy-mm-dd" 
                        name = 'visita_ps_fecha'
                        value={visita_ps_fecha} 
                        onChange={OnChange}
                    />
                </Form.Group>
                {/* VISITA_PS_MOTIVO */}
                <Form.Group>
                    <Form.Label>¿Cuál es el motivo de la visita?</Form.Label>
                    <Col sm={10}>
                        <Form.Check
                            type="radio"
                            label="Visita mensual programada"
                            name="visita_ps_motivo"
                            value="visita_mensual_programada"
                            checked={ visita_ps_motivo=== "visita_mensual_programada"}
                            onChange= {OnChange}
                            ref={register({ required: true })}
                        />
                        <Form.Check
                            type="radio"
                            label="Llamado de inspector"
                            name="visita_ps_motivo"
                            value="llamado_inspector"
                            checked={ visita_ps_motivo=== "llamado_inspector"}
                            onChange= {OnChange}
                            ref={register({ required: true })}
                        />
                        <Form.Check
                            type="radio"
                            label="Otro"
                            name="visita_ps_motivo"
                            value="otro"
                            checked={ visita_ps_motivo=== "otro"}
                            onChange= {OnChange}
                            ref={register({ required: true })}
                        />
                    </Col>
                    {errors.den_tipo && <span className='alert-custom'>*Campo obligatorio</span>}
                </Form.Group>
                {visita_ps_motivo==="otro"? (
                    <>
                        {/* VISITA_PS_MOTIVO_OTRO */}
                        <Form.Group controlId="visita_ps_motivo_otro">
                            <Form.Control 
                                type="text"
                                name= 'den_insecto_otro'
                                value= {visita_ps_motivo_otro}
                                placeholder = "¿Cuál? ..."
                                onChange= {OnChange}
                                ref={register({ required: true })}
                            />
                            {errors.visita_ps_motivo_otro && <span className='alert-custom'>*Campo obligatorio</span>}
                        </Form.Group>
                    </>
                ):null}
                {visita_ps_motivo==="llamado_inspector"? (
                <>
                    {/* VISITA_PS_MOTIVO_LLAMADO */}
                    <Form.Group>
                        <Form.Label>¿Cuál fue el motivo de la llamada?</Form.Label>
                        <Col sm={10}>
                            <Form.Check
                                type="radio"
                                label="Reporte de chinches de cama"
                                name="visita_ps_motivo_llamado"
                                value="reporte_chinchescama"
                                checked={ visita_ps_motivo_llamado=== "reporte_chinchescama"}
                                onChange= {OnChange}
                                ref={register({ required: true })}
                            />
                            <Form.Check
                                type="radio"
                                label="Reporte de chirimachas"
                                name="visita_ps_motivo_llamado"
                                value="reporte_chirimachas"
                                checked={ visita_ps_motivo_llamado=== "reporte_chirimachas"}
                                onChange= {OnChange}
                                ref={register({ required: true })}
                            />
                            <Form.Check
                                type="radio"
                                label="Llamado para que haga recojo de datos"
                                name="visita_ps_motivo_llamado"
                                value="llamado_recojo_datos"
                                checked={ visita_ps_motivo_llamado=== "llamado_recojo_datos"}
                                onChange= {OnChange}
                                ref={register({ required: true })}
                            />
                            <Form.Check
                                type="radio"
                                label="Otro"
                                name="visita_ps_motivo_llamado"
                                value="otro"
                                checked={ visita_ps_motivo_llamado=== "otro"}
                                onChange= {OnChange}
                                ref={register({ required: true })}
                            />
                        </Col>
                        {errors.den_tipo && <span className='alert-custom'>*Campo obligatorio</span>}
                    </Form.Group>
                    {visita_ps_motivo_llamado==="otro"? (
                        <>
                            {/* VISITA_PS_MOTIVO_LLAMADO_OTRO */}
                            <Form.Group controlId="visita_ps_motivo_llamado_otro">
                                <Form.Control 
                                    type="text"
                                    name= 'den_insecto_otro'
                                    value= {visita_ps_motivo_llamado_otro}
                                    placeholder = "¿Cuál? ..."
                                    onChange= {OnChange}
                                    ref={register({ required: true })}
                                />
                                {errors.visita_ps_motivo_llamado_otro && <span className='alert-custom'>*Campo obligatorio</span>}
                            </Form.Group>
                        </>
                    ):null}
                </>
                ):null}
                {/* VISITA_PS_NUEVAS_DENUNCIAS */}
                <Form.Group>
                    <Form.Label>¿En la visita, encontró nuevas denuncias?</Form.Label>
                    <Col sm={10}>
                        <Form.Check
                            type="radio"
                            label="Si, de chirimachas"
                            name="visita_ps_nuevas_denuncias"
                            value="chirimachas"
                            checked={ visita_ps_nuevas_denuncias=== "chirimachas"}
                            onChange= {OnChange}
                            ref={register({ required: true })}
                        />
                        <Form.Check
                            type="radio"
                            label="Si, de chinches de cama"
                            name="visita_ps_nuevas_denuncias"
                            value="chinchescama"
                            checked={ visita_ps_nuevas_denuncias=== "chinchescama"}
                            onChange= {OnChange}
                            ref={register({ required: true })}
                        />
                        <Form.Check
                            type="radio"
                            label="Si, chirimachas y chinches de cama"
                            name="visita_ps_nuevas_denuncias"
                            value="chirimachas_chinchescama"
                            checked={ visita_ps_nuevas_denuncias=== "chirimachas_chinchescama"}
                            onChange= {OnChange}
                            ref={register({ required: true })}
                        />
                        <Form.Check
                            type="radio"
                            label="No"
                            name="visita_ps_nuevas_denuncias"
                            value="no"
                            checked={ visita_ps_nuevas_denuncias=== "no"}
                            onChange= {OnChange}
                            ref={register({ required: true })}
                        />
                    </Col>
                    {errors.visita_ps_nuevas_denuncias && <span className='alert-custom'>*Campo obligatorio</span>}
                </Form.Group>
                {visita_ps_nuevas_denuncias!=="no"? (
                    <>
                        {/* VISITA_PS_QUIEN_DIO_INFORMACION */}
                        <Form.Group>
                            <Form.Label>¿Quién le dio la información de la denuncia?</Form.Label>
                            <Col sm={10}>
                                <Form.Check
                                    type="radio"
                                    label="Personal de admisión"
                                    name="visita_ps_quien_dio_informacion"
                                    value="personal_admision"
                                    checked={ visita_ps_quien_dio_informacion=== "personal_admision"}
                                    onChange= {OnChange}
                                    ref={register({ required: true })}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Personal de laboratorio"
                                    name="visita_ps_quien_dio_informacion"
                                    value="personal_laboratorio"
                                    checked={ visita_ps_quien_dio_informacion=== "personal_laboratorio"}
                                    onChange= {OnChange}
                                    ref={register({ required: true })}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Inspector sanitario o veterinario"
                                    name="visita_ps_quien_dio_informacion"
                                    value="inspectorsanitario_o_veterinario"
                                    checked={ visita_ps_quien_dio_informacion=== "inspectorsanitario_o_veterinario"}
                                    onChange= {OnChange}
                                    ref={register({ required: true })}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Otro"
                                    name="visita_ps_quien_dio_informacion"
                                    value="otro"
                                    checked={ visita_ps_quien_dio_informacion=== "otro"}
                                    onChange= {OnChange}
                                    ref={register({ required: true })}
                                />
                            </Col>
                            {errors.visita_ps_quien_dio_informacion && <span className='alert-custom'>*Campo obligatorio</span>}
                        </Form.Group>
                        {visita_ps_quien_dio_informacion==="otro"? (
                            <>
                                {/* VISITA_PS_QUIEN_DIO_INFORMACION_OTRO */}
                                <Form.Group controlId="visita_ps_quien_dio_informacion_otro">
                                    <Form.Control 
                                        type="text"
                                        name= 'visita_ps_quien_dio_informacion_otro'
                                        value= {visita_ps_quien_dio_informacion_otro}
                                        placeholder = "¿Cuál? ..."
                                        onChange= {OnChange}
                                        ref={register({ required: true })}
                                    />
                                    {errors.visita_ps_quien_dio_informacion_otro && <span className='alert-custom'>*Campo obligatorio</span>}
                                </Form.Group>
                            </>
                        ):null}
                        {/* VISITA_PS_ENCONTRO_INSECTO */}
                        <Form.Group>
                            <Form.Label>¿Encontró el insecto?</Form.Label>
                            <Col sm={10}>
                                <Form.Check
                                    type="radio"
                                    label="Si, aún estaba vivo"
                                    name="visita_ps_encontro_insecto"
                                    value="si_aun_vivo"
                                    checked={ visita_ps_encontro_insecto=== "si_aun_vivo"}
                                    onChange= {OnChange}
                                    ref={register({ required: true })}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Si, pero ya muerto"
                                    name="visita_ps_encontro_insecto"
                                    value="si_muerto"
                                    checked={ visita_ps_encontro_insecto=== "si_muerto"}
                                    onChange= {OnChange}
                                    ref={register({ required: true })}
                                />
                                <Form.Check
                                    type="radio"
                                    label="No, solo denuncias verbal"
                                    name="visita_ps_encontro_insecto"
                                    value="no_denuncia_verbal"
                                    checked={ visita_ps_encontro_insecto=== "no_denuncia_verbal"}
                                    onChange= {OnChange}
                                    ref={register({ required: true })}
                                />
                                <Form.Check
                                    type="radio"
                                    label="No, lo habían perdido"
                                    name="visita_ps_encontro_insecto"
                                    value="no_habian_perdido"
                                    checked={ visita_ps_encontro_insecto=== "no_habian_perdido"}
                                    onChange= {OnChange}
                                    ref={register({ required: true })}
                                />
                            </Col>
                            {errors.visita_ps_encontro_insecto && <span className='alert-custom'>*Campo obligatorio</span>}
                        </Form.Group>
                    </>
                ):null}

                <Button disabled type='submit'>Guardar</Button> 
            </Form>
        </MyModal>
    );
}

export default FormHP;