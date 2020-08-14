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
import { es, DateFull, initInspection } from "../../../resources";

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
    
    //Extraer de valores de inspeccion
    const {  
        den_id_custom,
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
        //Poner usuario
        currentInspection.usu_cuenta = user.USU_CUENTA.toUpperCase();
        //Obteniendo solo la fecha en campos calendar
        currentInspection.fecha = DateFull(currentInspection.fecha);
        //Obteniendo hora de inicio
        currentInspection.hora_inicio = props.startTime;
        //Obteniendo hora de fin
        currentInspection.hora_fin = new Date();
        //Guardando registro de inspeccion
        AddInspection(currentInspection);
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
                    </> : null
                }
                <Form.Group controlId="unicode">
                    <Form.Label >Código de Vivienda</Form.Label>
                    <Form.Control 
                        readOnly
                        type='text'
                        name='unicode'
                        value={props.unicode}
                        //onChange={OnChange}
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
                                {/* DEN_TIPO */}
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
                            <hr/>
                            <div className="table-check">
                                <Row>
                                    <Col></Col>
                                    <Col>Lugar inspección*</Col>
                                    <Col>Halló Chiris </Col>
                                    <Col>Halló Rastros</Col>
                                </Row>
                                <Row>
                                    <Col>INTRA</Col>
                                    <Col>
                                        {/* INTRA_INSPECCION */}
                                        <Form.Group controlId="intra_inspeccion">
                                            <Form.Check 
                                                type="checkbox" 
                                                name="intra_inspeccion"
                                                value={intra_inspeccion}
                                                onChange={OnChangeCheck}
                                                ref={register({ required: true })}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
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
                                    </Col>
                                    <Col>
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
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>PERI</Col>
                                    <Col>
                                        {/* PERI_INSPECCION */}
                                        <Form.Group controlId="peri_inspeccion">
                                            <Form.Check 
                                                type="checkbox" 
                                                name="peri_inspeccion"
                                                value={peri_inspeccion}
                                                onChange={OnChangeCheck}
                                                ref={register({ required: true })}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
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
                                </Row>
                            </div>
                            {errors.intra_inspeccion && errors.peri_inspeccion && <span className='alert-custom'>*Lugar de inspección es obligatorio</span>}
                            <hr/>
                            {/* PERSONAS_PREDIO*/}
                            <Form.Group controlId="personas_predio">
                                <Form.Label>Cuántas personas viven en el predio?</Form.Label>
                                <Form.Control 
                                    type='number'
                                    name='personas_predio'
                                    value={personas_predio}
                                    onChange={OnChange}
                                    ref={register({ required: true, maxLength: 2 })}
                                />
                                {errors.personas_predio?.type === 'required' && <span className='alert-custom'>*Campo obligatorio</span>}
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
                                                    value={cant_perros}
                                                    onChange={OnChange}
                                                    ref={register({ required: true, maxLength: 2 })}
                                                />
                                                {errors.cant_perros?.type === 'required' && <span className='alert-custom'>*Campo obligatorio</span>}
                                                {errors.can_perros?.type === 'maxLength' && <span className='alert-custom'>*Máximo 99 personas</span>}
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
                                                    value={cant_gatos}
                                                    onChange={OnChange}
                                                    ref={register({ required: true, maxLength: 2 })}
                                                />
                                                {errors.cant_gatos?.type === 'required' && <span className='alert-custom'>*Campo obligatorio</span>}
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
                                                    value={cant_aves_corral}
                                                    onChange={OnChange}
                                                    ref={register({ required: true, maxLength: 2 })}
                                                />
                                                {errors.cant_aves_corral?.type === 'required' && <span className='alert-custom'>*Campo obligatorio</span>}
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
                                                    value={cant_cuyes}
                                                    onChange={OnChange}
                                                    ref={register({ required: true, maxLength: 2 })}
                                                />
                                                {errors.cant_cuyes?.type === 'required' && <span className='alert-custom'>*Campo obligatorio</span>}
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
                                                    value={cant_conejos}
                                                    onChange={OnChange}
                                                    ref={register({ required: true, maxLength: 2 })}
                                                />
                                                {errors.cant_conejos?.type === 'required' && <span className='alert-custom'>*Campo obligatorio</span>}
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
                                                    value={cant_otros}
                                                    onChange={OnChange}
                                                    ref={register({ required: true, maxLength: 2 })}
                                                />
                                                {errors.cant_otros?.type === 'required' && <span className='alert-custom'>*Campo obligatorio</span>}
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
                <h5>CHINCHES DE CAMA</h5>
                {/* CIMEX_ALGUIEN_PICADO_CASA_ULTIMO_ANIO 
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
