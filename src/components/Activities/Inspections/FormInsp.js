import React, {useState, useContext} from 'react';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import {Calendar} from 'primereact/calendar';//Fecha
import 'primereact/resources/themes/nova-light/theme.css';//Fecha
import 'primereact/resources/primereact.min.css';//Fecha
import 'primeicons/primeicons.css';//Fecha
import { useForm } from "react-hook-form";//Validar

import AlertContext from '../../../context/alert/AlertContext';
import InspectionContext from '../../../context/inspection/InspectionContext';
import CimexContext from '../../../context/cimex/CimexContext';
import MyModal from "../../Modal/MyModal";
import { es, DateFull } from "../../../resources";

//Formulario de denuncia
const FormInps = (props) => {
  
    //Extraer los valores del context
    const AlertsContext = useContext(AlertContext);
    const { alert, ShowAlert } = AlertsContext;

    //Extraer los valores del context
    const InspectionsContext = useContext(InspectionContext);
    const { inspection } = InspectionsContext;

    //Extraer los valores del context
    const CimexsContext = useContext(CimexContext);
    const { cimex } = CimexsContext;
    
    //validacion
    const { register, handleSubmit, errors } = useForm();
    
    //State para inspecciones
    const [currentInspection, setCurrentInspection] = useState( inspection );
    //State para cimex
    const [currentCimex, setCurrentCimex] = useState( cimex );
    
    //Extraer de valores de inspeccion
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
    //Extraer de valores de inspeccion
    const {  
        cimex_alguien_picado_casa_ultimo_anio
    } = currentCimex;
    
    const [observaciones, setObservaciones] = useState( false );
    const [obs_text1, setObs_text1] = useState( '' );
    const [obs_text2, setObs_text2] = useState( '' );
    const [renuente_otro, setRenuente_otro] = useState( '' );
    //Animales
    const [perros, setPerros] = useState( false );
    const [gatos, setGatos] = useState( false );
    const [aves_corral, setAves_corral] = useState( false );
    const [cuyes, setCuyes] = useState( false );
    const [conejos, setConejos] = useState( false );
    const [otros, setOtros] = useState( false );
    
    const OnChange = e => {
        setCurrentInspection({
            ...currentInspection,
            [e.target.name] : e.target.value
        });
    };

    const OnChangeCheck = e => {
        if (e.target.name==="observaciones") {
            setObservaciones(e.target.checked);
        } else if (e.target.name==="perros") {
            setPerros(e.target.checked);
        } else if (e.target.name==="gatos") {
            setGatos(e.target.checked);
        } else if (e.target.name==="aves_corral") {
            setAves_corral(e.target.checked);
        } else if (e.target.name==="cuyes") {
            setCuyes(e.target.checked);
        } else if (e.target.name==="conejos") {
            setConejos(e.target.checked);
        } else if (e.target.name==="otros") {
            setOtros(e.target.checked);
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
            { alert ? (<Alert className='alert' variant='danger'>{alert.msg}</Alert>) : null }
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
                                    >
                                        <option value="R1">R1) No tiene tiempo trabaja</option>
                                        <option value="R2">R2) Desconfianza</option>
                                        <option value="R3">R3) Casa limpia</option>
                                        <option value="R4">R4) Inquilinos</option>
                                        <option value="R5">R5) No da ningun motivo</option>
                                        <option value="R6">R6) Otro</option>
                                    </Form.Control>
                                </Form.Group>
                                {(renuente === 'R6')? (
                                    <>
                                        {/* RENUENTE_OTRO */}
                                        <Form.Group controlId="renuente_otro">
                                            <Form.Control 
                                                type="text"
                                                name= 'renuente_otro'
                                                value= {renuente_otro}
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
                                        {/* LUGAR_INSPECCION_INTRA */}
                                        <Form.Group controlId="lugar_inspeccion_intra">
                                            <Form.Check 
                                                type="checkbox" 
                                                name="lugar_inspeccion_intra"
                                                onChange={OnChangeCheck}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        {/* CHIRIS_INTRA */}
                                        <Form.Group controlId="chiris_intra">
                                            <Form.Check 
                                                type="checkbox" 
                                                name="chiris_intra"
                                                onChange={OnChangeCheck}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        {/* RASTROS_INTRA */}
                                        <Form.Group controlId="rastros_intra">
                                            <Form.Check 
                                                type="checkbox" 
                                                name="rastros_intra"
                                                onChange={OnChangeCheck}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>PERI</Col>
                                    <Col>
                                        {/* LUGAR_INSPECCION_PERI */}
                                        <Form.Group controlId="lugar_inspeccion_peri">
                                            <Form.Check 
                                                type="checkbox" 
                                                name="lugar_inspeccion_peri"
                                                onChange={OnChangeCheck}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        {/* CHIRIS_PERI */}
                                        <Form.Group controlId="chiris_peri">
                                            <Form.Check 
                                                type="checkbox" 
                                                name="chiris_peri"
                                                onChange={OnChangeCheck}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        {/* RASTROS_PERI */}
                                        <Form.Group controlId="rastros_peri">
                                            <Form.Check 
                                                type="checkbox" 
                                                name="rastros_peri"
                                                onChange={OnChangeCheck}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>
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
                                                    value= {text_otros}
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
                {/* CIMEX_ALGUIEN_PICADO_CASA_ULTIMO_ANIO */}
                <Form.Group>
                    <Form.Label>1.- En el último año, ¿Algún miembro del hogar ha sido picado por insectos al interior de la vivienda?</Form.Label>
                    <Col sm={10}>
                        <Form.Check
                            type="radio"
                            label="Sí"
                            name="cimex_alguien_picado_casa_ultimo_anio"
                            value="1"
                            checked={ cimex_alguien_picado_casa_ultimo_anio=== "1"}
                            onChange= {OnChange}
                            ref={register({ required: true })}
                        />
                        <Form.Check
                            type="radio"
                            label="No"
                            name="cimex_alguien_picado_casa_ultimo_anio"
                            value="0"
                            checked={ cimex_alguien_picado_casa_ultimo_anio=== "0"}
                            onChange= {OnChange}
                            ref={register({ required: true })}
                        />
                        <Form.Check
                            type="radio"
                            label="No sabe"
                            name="cimex_alguien_picado_casa_ultimo_anio"
                            value="NS"
                            checked={ cimex_alguien_picado_casa_ultimo_anio=== "NS"}
                            onChange= {OnChange}
                            ref={register({ required: true })}
                        />
                    </Col>
                    {errors.cimex_alguien_picado_casa_ultimo_anio && <span className='alert-custom'>*Campo obligatorio</span>}
                </Form.Group>

                <Button disabled type='submit'>Guardar</Button> 
            </Form>
        </MyModal>
    );
}

export default FormInps;
