import React, {useState, useContext} from 'react';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import {Calendar} from 'primereact/calendar';//Fecha
import 'primereact/resources/themes/nova-light/theme.css';//Fecha
import 'primereact/resources/primereact.min.css';//Fecha
import 'primeicons/primeicons.css';//Fecha
import { useForm } from "react-hook-form";//Validar

import AlertContext from '../../../context/alert/AlertContext';
import AuthenticationContext from "../../../context/authentication/AuthenticationContext";
import DenunciationContext from '../../../context/denunciation/DenunciationContext';
import InspectionContext from '../../../context/inspection/InspectionContext';
import CimexContext from '../../../context/cimex/CimexContext';
import MyModal from "../../Modal/MyModal";
import { es, DateFull, initInspection, PutNA } from "../../../resources";

//Formulario de denuncia
const FormInps = (props) => {
  
    //Extraer los valores del context
    const AlertsContext = useContext(AlertContext);
    const { alert, ShowAlert } = AlertsContext;
    //Variables de usuario
    const AuthenticationsContext = useContext(AuthenticationContext);
    const { user } = AuthenticationsContext;
    //Obtener variables de denuncias
    const DenunciationsContext = useContext(DenunciationContext);
    const { denunciations } = DenunciationsContext;

    //Extraer los valores del context
    const InspectionsContext = useContext(InspectionContext);
    const { inspPasive, AddInspection } = InspectionsContext;

    //Extraer los valores del context
    const CimexsContext = useContext(CimexContext);
    const { cimex } = CimexsContext;
    
    //validacion
    const { register, handleSubmit, errors } = useForm();
    
    //State para inspecciones
    const [currentInspection, setCurrentInspection] = useState( initInspection );
    //State para cimex
    const [currentCimex, setCurrentCimex] = useState( cimex );
    //Consulta si la vivienda inspeccionada es o no la vivienda que realizo la denuncia
    let haveComplaint = false;
    //Almacenando "den_cant_colindantes" que se tiene hasta ese momento
    let denCantColindantes = 0;
    
    //Extraer de valores de inspeccion
    const {
        den_id_custom,
        insp_den_colin,
        observaciones,//No DB
        obs_unicode,
        obs_text1,//No DB
        obs_text2,//No DB
        //obs_text,
        fecha,
        caract_predio,
        tipo_lp,
        status_inspeccion,
        entrevista,
        motivo_volver,
        fecha_volver,
        renuente,
        renuente_otro,//No DB
        insp_habitante_telefono,
        intra_inspeccion,
        intra_chiris,
        intra_rastros,
        peri_inspeccion,
        peri_chiris,
        peri_rastros,
        personas_predio,
        perros,
        cant_perros,
        gatos,
        cant_gatos,
        aves_corral,
        cant_aves_corral,
        cuyes,
        cant_cuyes,
        conejos,
        cant_conejos,
        otros,
        text_otros,
        cant_otros
    } = currentInspection;

    //Extraer de valores para cimex de inspeccion
    const {  
        cimex_alguien_picado_casa_ultimo_anio
    } = currentCimex;
        
    const OnChange = e => {
        setCurrentInspection({
            ...currentInspection,
            [e.target.name] : e.target.value
        });
    };

    const OnChangeCheck = e => {
        setCurrentInspection({
            ...currentInspection,
            [e.target.name] : e.target.checked
        });
    };

    const OnChangeCheckMultiple = e => {
        let name = e.target.value;
        setCurrentInspection({
            ...currentInspection,
            [name] : e.target.checked
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

    const OnSubmit = () => {
        //Poner unicode
        currentInspection.unicode = props.unicode;
        //Poner usuario
        currentInspection.user_name = user.USU_CUENTA.toUpperCase();
        //Poner codigo de la localidad
        let codeLocality = props.unicode.split(".");
        currentInspection.code_locality = codeLocality[0]+"."+codeLocality[1]+"."+codeLocality[2];
        //Obteniendo solo la fecha en campos calendar
        currentInspection.fecha = DateFull(currentInspection.fecha);
        //Obteniendo hora de inicio
        currentInspection.hora_inicio = props.startTime;
        //Obteniendo hora de fin
        currentInspection.hora_fin = new Date();
        //Si ya tiene "denunciante" por obligacion tiene que ser "colindante"
        if (haveComplaint) {
            currentInspection.insp_den_colin = "colindante";
        }
        //Enviando el numero actual de la cantidad de colindantes de la denuncia
        currentInspection.den_cant_colindantes = denCantColindantes;
        
        //*Haciendo verificaciones de campos
        //Verificaciones en el campo "caract_predio"
        if (currentInspection.status_inspeccion !== "LP" )
            currentInspection.tipo_lp = "NA";
        if (currentInspection.caract_predio === "LV")
            currentInspection.status_inspeccion = "NA";
        //Verificaciones en el campo "status_inspeccion"
        if ( currentInspection.status_inspeccion === "NA" || currentInspection.status_inspeccion === "C" 
            || currentInspection.status_inspeccion === "R" || currentInspection.status_inspeccion === "V"
            || currentInspection.status_inspeccion === "inspeccion" ) {

            currentInspection.entrevista = "NA";//A
        }
        if ( currentInspection.status_inspeccion === "NA" || currentInspection.status_inspeccion === "C" 
            || currentInspection.status_inspeccion === "R" || currentInspection.status_inspeccion === "entrevista"
            || currentInspection.status_inspeccion === "inspeccion" ) {
                
            currentInspection.motivo_volver = "NA";//B
            currentInspection.fecha_volver = "NA";//B
        }
        if ( currentInspection.status_inspeccion === "NA" || currentInspection.status_inspeccion === "C" 
            || currentInspection.status_inspeccion === "V" || currentInspection.status_inspeccion === "entrevista"
            || currentInspection.status_inspeccion === "inspeccion" ) {
                
            currentInspection.renuente = "NA";//C
            currentInspection.renuente_otro = "NA";//C
        }
        if ( currentInspection.status_inspeccion === "NA" || currentInspection.status_inspeccion === "C" 
            || currentInspection.status_inspeccion === "V" || currentInspection.status_inspeccion === "entrevista"
            || currentInspection.status_inspeccion === "entrevista" ) {
            
            currentInspection.intra_inspeccion = "NA";//D
            currentInspection.intra_chiris = "NA";
            currentInspection.intra_rastros = "NA";
            currentInspection.peri_inspeccion = "NA";
            currentInspection.peri_chiris = "NA";
            currentInspection.peri_rastros = "NA";
            currentInspection.personas_predio = "NA";
            currentInspection.perros = "NA";
            currentInspection.cant_perros = "NA";
            currentInspection.gatos = "NA";
            currentInspection.cant_gatos = "NA";
            currentInspection.aves_corral = "NA";
            currentInspection.cant_aves_corral = "NA";
            currentInspection.cuyes = "NA";
            currentInspection.cant_cuyes = "NA";
            currentInspection.conejos = "NA";
            currentInspection.cant_conejos = "NA";
            currentInspection.otros = "NA";
            currentInspection.text_otros = "NA";
            currentInspection.cant_otros = "NA";
        }
        
        //Cambiando vacios por NA
        PutNA(currentInspection);
        
        //Guardando registro de inspeccion
        AddInspection(currentInspection);
        //Actualizar la denuncia (en el backend esto se hace mediante procedimiento almacenado)
        if (currentInspection.insp_den_colin !== "NA") {
            denunciations.some( denunciation => {
                                if (denunciation.DEN_ID_CUSTOM === den_id_custom){
                                    if (insp_den_colin === "denunciante") {
                                        denunciation.DEN_DENUNCIANTE = currentInspection.unicode;
                                        denunciation.DEN_ESTADO = 0;
                                    } else //se poner else por que ya se pregunto que sea distinto a NA
                                        denunciation.DEN_CANT_COLINDANTES = parseInt(denunciation.DEN_CANT_COLINDANTES)+1;
                                    return true;
                                }
                            })
        }
        
        //Inicializar inspeccion
        setCurrentInspection(initInspection);
        
        //Cerrar modal
        props.ChangeModal();
    };
    
    return (
        <MyModal modal={props.modal} ChangeModal={props.ChangeModal} formTitle={props.formTitle}>
            { alert ? (<Alert className='alert' variant='danger'>{alert.msg}</Alert>) : null }
            <Form onSubmit={handleSubmit(OnSubmit)}>   
                { inspPasive ?
                    <>
                        {/* den_id_custom */}
                        <Form.Label>Denuncia a la cual pertenece esta inspección*</Form.Label>
                        <Form.Group controlId="den_id_custom">
                            <Form.Control 
                                as="select"
                                name= 'den_id_custom'
                                value= {den_id_custom}
                                onChange= {OnChange}
                                ref={register({ required: true })}
                            >
                                <option value="">Seleccione...</option>
                                {denunciations.map( denunciation => 
                                    <option key={denunciation.DEN_ID_CUSTOM} value={denunciation.DEN_ID_CUSTOM}>{denunciation.DEN_ID_CUSTOM}</option>
                                )}
                            </Form.Control>
                            {errors.den_id_custom && <span className='alert-custom'>*Campo obligatorio</span>}
                        </Form.Group>
                        { den_id_custom !== "" ? (
                            <>
                                {/* INSP_DEN_COLIN */}
                                {denunciations.some( denunciation => {
                                    if (denunciation.DEN_ID_CUSTOM === den_id_custom && denunciation.DEN_DENUNCIANTE !== "NA" && denunciation.DEN_DENUNCIANTE !== "" ){
                                        denCantColindantes = denunciation.DEN_CANT_COLINDANTES;
                                        haveComplaint = true;
                                        return true;
                                    }
                                })}
                                <Form.Group >
                                    <Form.Label>Seleccione que tipo de vivienda es:*</Form.Label>
                                    <Col sm={10}>
                                        <Form.Check
                                            disabled = {haveComplaint}
                                            type="radio"
                                            label="Denunciante"
                                            name="insp_den_colin"
                                            value="denunciante"
                                            id="denunciante"
                                            checked={ insp_den_colin=== "denunciante"}
                                            onChange= {OnChange}
                                            ref={register({ required: true })}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Colindante"
                                            name="insp_den_colin"
                                            value="colindante"
                                            id="colindante"
                                            checked={ insp_den_colin=== "colindante"}
                                            onChange= {OnChange}
                                            ref={register({ required: true })}
                                        />
                                    </Col>
                                    {errors.insp_den_colin && <span className='alert-custom'>*Campo obligatorio</span>}
                                </Form.Group>
                            </>
                            ) : null
                        }
                    </> : null
                }
                <Form.Group /*controlId="unicode"*/>
                    <Form.Label >Código de Vivienda</Form.Label>
                    <Form.Control 
                        readOnly
                        type='text'
                        //name='unicode'
                        value={props.unicode}
                        onChange={OnChange}
                    />
                </Form.Group>
                <Form.Group controlId="observaciones">
                    <Form.Check 
                        type="checkbox" 
                        name="observaciones"
                        label="Observaciones sobre unicode"
                        value = {observaciones}
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
                                <option value="">Seleccione...</option>
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
                            {errors.obs_unicode && <span className='alert-custom'>*Campo obligatorio</span>}
                        </Form.Group>
                        {(obs_unicode==='vivienda_sin_unicode_localidad_nueva' || obs_unicode==='vivienda_sin_unicode_manzana_nueva')? (
                            <>
                                {/* OBS_TEXT1 */}
                                <Form.Group controlId="obs_text1">
                                    <Form.Control 
                                        type="text"
                                        name= 'obs_text1'
                                        defaultValue= {obs_text1}
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
                                        defaultValue= {obs_text2}
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
                                defaultValue= {tipo_lp}
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
                                {/* ENTREVISTA */}
                                <Form.Group>
                                    <Form.Label>Entrevista</Form.Label>
                                    <Col sm={10}>
                                        <Form.Check
                                            type="radio"
                                            label="Cree que no tiene"
                                            name="entrevista"
                                            value="cree_no_tiene"
                                            id="cree_no_tiene"
                                            checked={ entrevista=== "cree_no_tiene"}
                                            onChange= {OnChange}
                                            ref={register({ required: true })}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Cree que si tiene"
                                            name="entrevista"
                                            value="cree_si_tiene"
                                            id="cree_si_tiene"
                                            checked={ entrevista=== "cree_si_tiene"}
                                            onChange= {OnChange}
                                            ref={register({ required: true })}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="No sabe"
                                            name="entrevista"
                                            value="no_sabe"
                                            id="no_sabe"
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
                                        defaultValue= {motivo_volver}
                                        onChange= {OnChange}
                                        placeholder = "Escribe aqui el motivo ..."
                                        ref={register({ required: true })}
                                    />
                                    {errors.motivo_volver && <span className='alert-custom'>*Campo obligatorio</span>}
                                </Form.Group>
                                {/* FECHA_VOLVER*/}
                                <Form.Group controlId="fecha_volver">
                                    <Form.Label >Fecha probable para volver: </Form.Label>
                                    <Calendar 
                                        minDate = { new Date() }
                                        maxDateCount = {3}
                                        showIcon={true} 
                                        locale={es} 
                                        dateFormat="dd/mm/yy" 
                                        value={fecha_volver} 
                                        name= 'fecha_volver'
                                        onChange={ OnChange } 
                                        selectionMode="multiple" 
                                        readOnlyInput={true} 
                                    />
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
                                        ref={register({ required: true })}
                                    >
                                        <option value="">Seleccione...</option>
                                        <option value="R1">R1) No tiene tiempo trabaja</option>
                                        <option value="R2">R2) Desconfianza</option>
                                        <option value="R3">R3) Casa limpia</option>
                                        <option value="R4">R4) Inquilinos</option>
                                        <option value="R5">R5) No da ningun motivo</option>
                                        <option value="R6">R6) Otro</option>
                                    </Form.Control>
                                    {errors.renuente && <span className='alert-custom'>*Campo obligatorio</span>}
                                </Form.Group>
                                {(renuente === 'R6')? (
                                    <>
                                        {/* RENUENTE_OTRO */}
                                        <Form.Group controlId="renuente_otro">
                                            <Form.Control 
                                                type="text"
                                                name= 'renuente_otro'
                                                defaultValue= {renuente_otro}
                                                onChange= {OnChange}
                                                placeholder = "Describa su opción ..."
                                                ref={register({ required: true })}
                                            />
                                            {errors.renuente_otro && <span className='alert-custom'>*Campo obligatorio</span>}
                                        </Form.Group>
                                    </>
                                ):null}
                            </>
                        ):null}
                        {(status_inspeccion === 'inspeccion')? (
                        <>
                            {/* INSP_HABITANTE_TELEFONO */}
                            <Form.Group controlId="insp_habitante_telefono">
                                <Form.Label>Teléfono del Habitante</Form.Label>
                                <Form.Control 
                                    type='number'
                                    name='insp_habitante_telefono'
                                    defaultValue={insp_habitante_telefono}
                                    onChange={OnChange}
                                    ref={register({ maxLength: 9 })}
                                />
                                {errors.insp_habitante_telefono?.type === 'maxLength' && <span className='alert-custom'>*Maximo 9 numeros</span>}
                            </Form.Group>
                            <hr/>
                            <div className="table-check">
                                <Col>
                                    <Row></Row>
                                    <Row>INTRA</Row>
                                    <Row className="checkbox-end">PERI</Row>
                                </Col>
                                <Col>
                                    <Row>Lugar inspección*</Row>
                                    {/* DEN_TIPO */}
                                    <Form.Group >
                                        <Col sm={10}>
                                            <Form.Check
                                                type="checkbox"
                                                name="multiplecheckbox"
                                                value="intra_inspeccion"
                                                id="intra_inspeccion"
                                                onChange= {OnChangeCheckMultiple}
                                                ref={register({ required: true })}
                                            />
                                            <Form.Check className="checkbox-end" 
                                                type="checkbox"
                                                name="multiplecheckbox"
                                                value="peri_inspeccion"
                                                id="peri_inspeccion"
                                                onChange= {OnChangeCheckMultiple}
                                                ref={register({ required: true })}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Row className="title-label">Halló Chiris</Row>
                                    {/* INTRA_CHIRIS */}
                                    <Form.Group controlId="intra_chiris">
                                        <Form.Check 
                                            disabled={!intra_inspeccion}
                                            type="checkbox" 
                                            name="intra_chiris"
                                            value= {intra_chiris}
                                            onChange={OnChangeCheck}
                                        />
                                    </Form.Group>
                                    {/* PERI_CHIRIS */}
                                    <Form.Group controlId="peri_chiris">
                                        <Form.Check 
                                            disabled={!peri_inspeccion}
                                            type="checkbox" 
                                            name="peri_chiris"
                                            value={peri_chiris}
                                            onChange={OnChangeCheck}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Row className="title-label">Halló Rastros</Row>
                                    {/* INTRA_RASTROS */}
                                    <Form.Group controlId="intra_rastros">
                                        <Form.Check 
                                            disabled={!intra_inspeccion}
                                            type="checkbox" 
                                            name="intra_rastros"
                                            value={intra_rastros}
                                            onChange={OnChangeCheck}
                                        />
                                    </Form.Group>
                                    {/* RASTROS_PERI */}
                                    <Form.Group controlId="peri_rastros">
                                        <Form.Check 
                                            disabled={!peri_inspeccion}
                                            type="checkbox" 
                                            name="peri_rastros"
                                            value={peri_rastros}
                                            onChange={OnChangeCheck}
                                        />
                                    </Form.Group>
                                </Col>                                
                            </div>
                            {errors.multiplecheckbox && <span className='alert-custom'>*Lugar de inspección es obligatorio</span>}
                            <hr/>
                            {/* PERSONAS_PREDIO*/}
                            <Form.Group controlId="personas_predio">
                                <Form.Label>Cuántas personas viven en el predio?*</Form.Label>
                                <Form.Control 
                                    type='number'
                                    name='personas_predio'
                                    defaultValue={personas_predio}
                                    onChange={OnChange}
                                    ref={register({ required: true, min: 0, maxLength: 2 })}
                                />
                                {errors.personas_predio?.type === 'required' && <span className='alert-custom'>*Campo obligatorio</span>}
                                {errors.personas_predio?.type === 'min' && <span className='alert-custom'>*No puede haber valor negativo</span>}
                                {errors.personas_predio?.type === 'maxLength' && <span className='alert-custom'>*Máximo 99 personas</span>}
                            </Form.Group>
                            {/* ANIMALES */}
                            <div className="animales-opt">Qué animales hay?
                                <Row>
                                    <Col>
                                        {/* PERROS */}
                                        <Form.Group controlId="perros">
                                            <Form.Check 
                                                type="checkbox" 
                                                name="perros"
                                                onChange={OnChangeCheck}
                                            />
                                            <Form.Label>Perros</Form.Label>
                                        </Form.Group>
                                    </Col>
                                    {(perros === true)? (
                                        <Col>
                                            {/* CANT_PERROS */}
                                            <Form.Group controlId="cant_perros">
                                                <Form.Control 
                                                    type='number'
                                                    name='cant_perros'
                                                    defaultValue={cant_perros}
                                                    onChange={OnChange}
                                                    ref={register({ required: true, min: 1, maxLength: 2 })}
                                                />
                                                {errors.cant_perros?.type === 'required' && <span className='alert-custom'>*Campo obligatorio</span>}
                                                {errors.cant_perros?.type === 'min' && <span className='alert-custom'>*No puede haber valor menor que 1</span>}
                                                {errors.cant_perros?.type === 'maxLength' && <span className='alert-custom'>*Máximo 99 personas</span>}
                                            </Form.Group>
                                        </Col>
                                    ):null}
                                </Row>
                                <Row>
                                    <Col>
                                        {/* GATOS */}
                                        <Form.Group controlId="gatos">
                                            <Form.Check 
                                                type="checkbox" 
                                                name="gatos"
                                                onChange={OnChangeCheck}
                                            />
                                            <Form.Label>Gatos</Form.Label>
                                        </Form.Group>
                                    </Col>
                                    {(gatos === true)? (
                                        <Col>
                                            {/* CANT_GATOS */}
                                            <Form.Group controlId="cant_gatos">
                                                <Form.Control 
                                                    type='number'
                                                    name='cant_gatos'
                                                    defaultValue={cant_gatos}
                                                    onChange={OnChange}
                                                    ref={register({ required: true, min: 1, maxLength: 2 })}
                                                />
                                                {errors.cant_gatos?.type === 'required' && <span className='alert-custom'>*Campo obligatorio</span>}
                                                {errors.cant_gatos?.type === 'min' && <span className='alert-custom'>*No puede haber valor menor que 1</span>}
                                                {errors.cant_gatos?.type === 'maxLength' && <span className='alert-custom'>*Máximo 99 personas</span>}
                                            </Form.Group>
                                        </Col>
                                    ):null}
                                </Row>
                                <Row>
                                    <Col>
                                        {/* AVES_CORRAL */}
                                        <Form.Group controlId="aves_corral">
                                            <Form.Check 
                                                type="checkbox" 
                                                name="aves_corral"
                                                onChange={OnChangeCheck}
                                            />
                                            <Form.Label>Aves Corral</Form.Label>
                                        </Form.Group>
                                    </Col>
                                    {(aves_corral === true)? (
                                        <Col>
                                            {/* CANT_AVES_CORRAL */}
                                            <Form.Group controlId="cant_aves_corral">
                                                <Form.Control 
                                                    type='number'
                                                    name='cant_aves_corral'
                                                    defaultValue={cant_aves_corral}
                                                    onChange={OnChange}
                                                    ref={register({ required: true, min: 1, maxLength: 2 })}
                                                />
                                                {errors.cant_aves_corral?.type === 'required' && <span className='alert-custom'>*Campo obligatorio</span>}
                                                {errors.cant_aves_corral?.type === 'min' && <span className='alert-custom'>*No puede haber valor menor que 1</span>}
                                                {errors.cant_aves_corral?.type === 'maxLength' && <span className='alert-custom'>*Máximo 99 personas</span>}
                                            </Form.Group>
                                        </Col>
                                    ):null}
                                </Row>
                                <Row>
                                    <Col>
                                        {/* CUYES */}
                                        <Form.Group controlId="cuyes">
                                            <Form.Check 
                                                type="checkbox" 
                                                name="cuyes"
                                                onChange={OnChangeCheck}
                                            />
                                            <Form.Label>Cuyes</Form.Label>
                                        </Form.Group>
                                    </Col>
                                    {(cuyes === true)? (
                                        <Col>
                                            {/* CANT_CUYES */}
                                            <Form.Group controlId="cant_cuyes">
                                                <Form.Control 
                                                    type='number'
                                                    name='cant_cuyes'
                                                    defaultValue={cant_cuyes}
                                                    onChange={OnChange}
                                                    ref={register({ required: true, min: 1, maxLength: 2 })}
                                                />
                                                {errors.cant_cuyes?.type === 'required' && <span className='alert-custom'>*Campo obligatorio</span>}
                                                {errors.cant_cuyes?.type === 'min' && <span className='alert-custom'>*No puede haber valor menor que 1</span>}
                                                {errors.cant_cuyes?.type === 'maxLength' && <span className='alert-custom'>*Máximo 99 personas</span>}
                                            </Form.Group>
                                        </Col>
                                    ):null}
                                </Row>
                                <Row>
                                    <Col>
                                        {/* CONEJOS */}
                                        <Form.Group controlId="conejos">
                                            <Form.Check 
                                                type="checkbox" 
                                                name="conejos"
                                                onChange={OnChangeCheck}
                                            />
                                            <Form.Label>Conejos</Form.Label>
                                        </Form.Group>
                                    </Col>
                                    {(conejos === true)? (
                                        <Col>
                                            {/* CANT_CONEJOS */}
                                            <Form.Group controlId="cant_conejos">
                                                <Form.Control 
                                                    type='number'
                                                    name='cant_conejos'
                                                    defaultValue={cant_conejos}
                                                    onChange={OnChange}
                                                    ref={register({ required: true, min: 1, maxLength: 2 })}
                                                />
                                                {errors.cant_conejos?.type === 'required' && <span className='alert-custom'>*Campo obligatorio</span>}
                                                {errors.cant_conejos?.type === 'min' && <span className='alert-custom'>*No puede haber valor menor que 1</span>}
                                                {errors.cant_conejos?.type === 'maxLength' && <span className='alert-custom'>*Máximo 99 personas</span>}
                                            </Form.Group>
                                        </Col>
                                    ):null}
                                </Row>
                                <Row>
                                    <Col>
                                        {/* OTROS */}
                                        <Form.Group controlId="otros">
                                            <Form.Check 
                                                type="checkbox" 
                                                name="otros"
                                                onChange={OnChangeCheck}
                                            />
                                            <Form.Label>Otros</Form.Label>
                                        </Form.Group>
                                    </Col>
                                    {(otros === true)? (
                                        <Col>
                                            {/* TEXT_OTROS */}
                                            <Form.Group controlId="text_otros">
                                                <Form.Control 
                                                    type="text"
                                                    name= 'text_otros'
                                                    defaultValue= {text_otros}
                                                    onChange= {OnChange}
                                                    placeholder = "Indique otro ..."
                                                    ref={register({ required: true })}
                                                />
                                                {errors.text_otros && <span className='alert-custom'>*Campo obligatorio</span>}
                                            </Form.Group>
                                        </Col>
                                    ):null}
                                </Row>
                                <Row>
                                    <Col></Col>
                                    {(otros === true)? (
                                        <Col>
                                            {/* CANT_OTROS */}
                                            <Form.Group controlId="cant_otros">
                                                <Form.Control 
                                                    type='number'
                                                    name='cant_otros'
                                                    defaultValue={cant_otros}
                                                    onChange={OnChange}
                                                    ref={register({ required: true, min: 1, maxLength: 2 })}
                                                />
                                                {errors.cant_otros?.type === 'required' && <span className='alert-custom'>*Campo obligatorio</span>}
                                                {errors.cant_otros?.type === 'min' && <span className='alert-custom'>*No puede haber valor menor que 1</span>}
                                                {errors.cant_otros?.type === 'maxLength' && <span className='alert-custom'>*Máximo 99 personas</span>}
                                            </Form.Group>
                                        </Col>
                                    ):null}
                                </Row>
                            </div>
                        </>
                        ):null}
                    </>
                ):null}
                <hr/>
                {/*******  FORMULARIO CIMEX *********/}
                {/*<h5>CHINCHES DE CAMA</h5>
                 CIMEX_ALGUIEN_PICADO_CASA_ULTIMO_ANIO 
                <Form.Group>
                    <Form.Label>1.- En el último año, ¿Algún miembro del hogar ha sido picado por insectos al interior de la vivienda?</Form.Label>
                    <Col sm={10}>
                        <Form.Check
                            type="radio"
                            label="Sí"
                            name="cimex_alguien_picado_casa_ultimo_anio"
                            value="1"
                            id="1"
                            checked={ cimex_alguien_picado_casa_ultimo_anio=== "1"}
                            onChange= {OnChange}
                            ref={register({ required: true })}
                        />
                        <Form.Check
                            type="radio"
                            label="No"
                            name="cimex_alguien_picado_casa_ultimo_anio"
                            value="0"
                            id="0"
                            checked={ cimex_alguien_picado_casa_ultimo_anio=== "0"}
                            onChange= {OnChange}
                            ref={register({ required: true })}
                        />
                        <Form.Check
                            type="radio"
                            label="No sabe"
                            name="cimex_alguien_picado_casa_ultimo_anio"
                            value="NS"
                            id="NS"
                            checked={ cimex_alguien_picado_casa_ultimo_anio=== "NS"}
                            onChange= {OnChange}
                            ref={register({ required: true })}
                        />
                    </Col>
                    {errors.cimex_alguien_picado_casa_ultimo_anio && <span className='alert-custom'>*Campo obligatorio</span>}
                </Form.Group>
                */}
                <Button type='submit'>Guardar</Button> 
            </Form>
        </MyModal>
    );
}

export default FormInps;
