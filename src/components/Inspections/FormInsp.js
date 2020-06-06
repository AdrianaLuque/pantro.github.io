import React, {useState, useContext, useEffect} from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import {Calendar} from 'primereact/calendar';//Fecha
import 'primereact/resources/themes/nova-light/theme.css';//Fecha
import 'primereact/resources/primereact.min.css';//Fecha
import 'primeicons/primeicons.css';//Fecha
import { useForm } from "react-hook-form";//Validar

//import authContext from "../../../context/auth/authContext";
import alertaContext from '../../context/alertas/alertaContext';
import InspectionContext from '../../context/inspection/InspectionContext';
import MyModal from "../Modal/MyModal";
import { DateFull } from "../../Functions";

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
const FormInps = (props) => {
  
    //Extraer los valores del context
    const alertasContext = useContext(alertaContext);
    const { alerta, MostrarAlerta } = alertasContext;

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
    const [currentInspection, setCurrentInspection] = useState( inspection );
    
    //Extraer de usuario
    const {  
        user_name,
        unicode,
        code_locality,
        obs_unicode,
        obs_text,
        fecha,
        caract_predio,
        tipo_lp,
        status_inspeccion,
        entrevista,
        motivo_volver,
        fecha_volver,
        renuente,
        intra_inspeccion,
        intra_chiris,
        intra_rastros,
        peri_inspeccion,
        peri_chiris,
        peri_rastros,
        personas_predio,
        cant_perros,
        cant_gatos,
        cant_aves_corral,
        cant_cuyes,
        cant_conejos,
        text_otros,
        cant_otros,
        hora_inicio,
        hora_fin,
        inspection_flag,
        predicted_probab,
        predicted_probab_mean,
        risk_color,
        lat,
        lng,
    } = currentInspection;
    
    const [observaciones, setObservaciones] = useState( false );
    const [obs_text1, setObs_text1] = useState( '' );
    const [obs_text2, setObs_text2] = useState( '' );

    const OnChange = e => {
        setCurrentInspection({
            ...currentInspection,
            [e.target.name] : e.target.value
        });
    };

    const OnChangeCheck = e => {
        if (e.target.name==="observaciones") {
            setObservaciones(e.target.checked);
        } else {
            setCurrentInspection({
                ...currentInspection,
                [e.target.name] : e.target.checked
            });
        }
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
        currentInspection.fecha = DateFull(currentInspection.fecha);

        //AddDenunciation(currentDenunciation);
        props.ChangeModal();
    };
    
    return (
        <MyModal modal={props.modal} ChangeModal={props.ChangeModal} formTitle={props.formTitle}>
            { alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null }
            <Form
                onSubmit={handleSubmit(OnSubmit)}
            >
                <Form.Group controlId="unicode">
                    <Form.Label >Código de Vivienda</Form.Label>
                    <Form.Control 
                        readOnly
                        type='text'
                        name='unicode'
                        value={props.unicode}
                        onChange={OnChange}
                    />
                </Form.Group>
                <Form.Group controlId="observaciones">
                    <Form.Check 
                        type="checkbox" 
                        name="observaciones"
                        label="Observaciones sobre unicode"
                        onChange={OnChangeCheck}
                    />
                </Form.Group>
                {observaciones? 
                    (<>
                        {/* obs_unicode */}
                        <Form.Group controlId="obs_unicode">
                            <Form.Control 
                                as="select"
                                name= 'obs_unicode'
                                value= {obs_unicode}
                                onChange= {OnChange}
                            >
                                <option>Seleccione...</option>
                                <option value="vivienda_con_mas_un_unicode">1) Una vivienda con mas de un unicode</option>
                                <option value="vivienda_sin_unicode_localidad_nueva">2) Vivienda sin unicode (localidad nueva)</option>
                                <option value="vivienda_sin_unicode_manzana_nueva">3) Vivienda sin unicode (en una localidad antigua pero con manzana nueva)</option>
                                <option value="vivienda_un_unicode_pero_con_departamentos">4) Una vivienda con un código pero dividida en departamentos</option>
                                <option value="dos_viviendas_distintas_mismo_unicode">5) Dos viviendas distintas con el mismo unicode</option>
                                <option value="unicode_equivocado">6) Unicode equivocado</option>
                                <option value="unicode_en_mapa_no_en_campo">7) Unicode del mapa que no se encuentra en campo</option>
                                <option value="unicode_en_campo_no_mapa">8) Unicode en campo que no se encuentra en el mapa</option>
                                <option value="otro">9) Otro</option>
                            </Form.Control>
                        </Form.Group>
                        {(obs_unicode==='vivienda_sin_unicode_localidad_nueva' || obs_unicode==='vivienda_sin_unicode_manzana_nueva')? (
                            <>
                                {/* OBS_TEXT1 */}
                                <Form.Group controlId="obs_text1">
                                    <Form.Control 
                                        type="text"
                                        name= 'obs_text1'
                                        value= {obs_text1}
                                        placeholder = "Ingrese la dirección de la vivienda ..."
                                        onChange= {OnChange}
                                        ref={register({ required: true })}
                                    />
                                    {errors.obs_text1 && <span className='alert-custom'>*Campo obligatorio</span>}
                                </Form.Group>
                            </>
                        ):null}
                        {(obs_unicode==='otro')? (
                            <>
                                {/* OBS_TEXT2 */}
                                <Form.Group controlId="obs_text2">
                                    <Form.Control 
                                        type="text"
                                        name= 'obs_text2'
                                        value= {obs_text2}
                                        placeholder = "Describa su opción ..."
                                        onChange= {OnChange}
                                        ref={register({ required: true })}
                                    />
                                    {errors.obs_text2 && <span className='alert-custom'>*Campo obligatorio</span>}
                                </Form.Group>
                            </>
                        ):null}
                    </>):null
                }
                <hr/>
                {/* FECHA */}
                <Form.Group controlId="fecha">
                    <Form.Label>Fecha* </Form.Label>
                    <Calendar 
                        showIcon={true} 
                        locale={es} 
                        dateFormat="yy-mm-dd" 
                        name = 'fecha'
                        value={fecha} 
                        onChange={OnChange}
                    />
                </Form.Group>
                {/* CARACT_PREDIO */}
                <Form.Group controlId="caract_predio">
                    <Form.Label >Características del predio*</Form.Label>
                    <Form.Control 
                        as="select"
                        name= 'caract_predio'
                        value= {caract_predio}
                        onChange= {OnChange}
                    >
                        <option value="DES">Deshabitada</option>
                        <option value="casa_regular">Casa regular</option>
                        <option value="LV">Lote vacío</option>
                        <option value="LP">Local público</option>
                    </Form.Control>
                </Form.Group>
                {(caract_predio==='LP')? (
                    <>
                        {/* TIPO_LP */}
                        <Form.Group controlId="tipo_lp">
                            <Form.Label>Tipo local público*</Form.Label>
                            <Form.Control 
                                type="text"
                                name= 'tipo_lp'
                                value= {tipo_lp}
                                onChange= {OnChange}
                                ref={register({ required: true })}
                            />
                            {errors.tipo_lp && <span className='alert-custom'>*Campo obligatorio</span>}
                        </Form.Group>
                    </>
                ):null}
                {(caract_predio==='casa_regular' || caract_predio==='LP' || caract_predio==='DES')? (
                    <>
                        {/* STATUS_INSPECCION */}
                        <Form.Group controlId="status_inspeccion">
                            <Form.Label >Estado de la Inspeccíon*</Form.Label>
                            <Form.Control 
                                as="select"
                                name= 'status_inspeccion'
                                value= {status_inspeccion}
                                onChange= {OnChange}
                            >
                                <option value="C">Cerrada</option>
                                <option value="R">Renuente</option>
                                <option value="V">Volver</option>
                                <option value="entrevista">Entrevista</option>
                                <option value="inspeccion">Inspección</option>
                            </Form.Control>
                        </Form.Group>
                        {(status_inspeccion === 'entrevista')? (
                            <>
                                {/* DEN_TIPO */}
                                <Form.Group>
                                    <Form.Label>Entrevista</Form.Label>
                                    <Col sm={10}>
                                        <Form.Check
                                            type="radio"
                                            label="Cree que no tiene"
                                            name="entrevista"
                                            value="cree_no_tiene"
                                            checked={ entrevista=== "cree_no_tiene"}
                                            onChange= {OnChange}
                                            ref={register({ required: true })}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Cree que si tiene"
                                            name="entrevista"
                                            value="cree_si_tiene"
                                            checked={ entrevista=== "cree_si_tiene"}
                                            onChange= {OnChange}
                                            ref={register({ required: true })}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="No sabe"
                                            name="entrevista"
                                            value="no_sabe"
                                            checked={ entrevista=== "no_sabe"}
                                            onChange= {OnChange}
                                            ref={register({ required: true })}
                                        />
                                    </Col>
                                    {errors.entrevista && <span className='alert-custom'>*Campo obligatorio</span>}
                                </Form.Group>
                            </>
                        ):null}
                        {(status_inspeccion === 'V')? (
                            <>
                                {/* MOTIVO_VOLVER */}
                                <Form.Group controlId="motivo_volver">
                                    <Form.Label>Motivo</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        name= 'motivo_volver'
                                        value= {motivo_volver}
                                        onChange= {OnChange}
                                        placeholder = "Escribe aqui el motivo ..."
                                        ref={register({ required: true })}
                                    />
                                    {errors.motivo_volver && <span className='alert-custom'>*Campo obligatorio</span>}
                                </Form.Group>
                            </>
                        ):null}
                        {(status_inspeccion === 'R')? (
                            <>
                                {/* RENUENTE */}
                                <Form.Group controlId="renuente">
                                    <Form.Control 
                                        as="select"
                                        name= 'renuente'
                                        value= {renuente}
                                        onChange= {OnChange}
                                        defaultValue = "R1"
                                    >
                                        <option value="R1">R1) No tiene tiempo trabaja</option>
                                        <option value="R2">R2) Desconfianza</option>
                                        <option value="R3">R3) Casa limpia</option>
                                        <option value="R4">R4) Inquilinos</option>
                                        <option value="R5">R5) No da ningun motivo</option>
                                        <option value="R6">R6) Otro</option>
                                    </Form.Control>
                                </Form.Group>
                            </>
                        ):null}
                    </>
                ):null}

                <Button type='submit'>Guardar</Button> 
            </Form>
        </MyModal>
    );
}

export default FormInps;