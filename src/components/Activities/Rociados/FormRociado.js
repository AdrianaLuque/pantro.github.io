import React, { useState, useContext, useEffect, Fragment} from 'react';
import {useForm} from "react-hook-form";

// estilos react bootstrap
import {Form, Row, Col, Button} from 'react-bootstrap';
import {Calendar} from 'primereact/calendar'; //Fecha

// importar
import MyModal from "../../Modal/MyModal";
import AuthenticationContext from "../../../context/authentication/AuthenticationContext";
import { inicioRociado, initAux, DateFull, PutNA, MaterialIntra, MaterialPeri} from '../../../resources';
import RociadoContext from "../../../context/rociados/RociadoContext";

const FormRociado = (props) => {

    //Extraer informacion de usuario logeado - 
    //AUN NO PUEDO OBTENER EL USER PORQUE NO ESTA RELACIONADO CON EL BOTON DE LOGIN
    //const AuthenticationsContext = useContext(AuthenticationContext);
    //const {user} = AuthenticationsContext;

    //State para crear variables de campo en vacio - inicio
    const [currentRociados, setCurrentRociados] = useState(inicioRociado);

    //State para crear las categorias de material predominante INTRA
    const [materialIntra, setMaterialIntra] = useState([
        {id:1, value:"ladrillo_picardo", isChecked:false , etiqueta: "Ladrillo picardo"} , 
        {id:2, value:"ladrillo_noble", isChecked:false, etiqueta: "Ladrillo noble"} ,
        {id:3, value:"bloqueta_picardo", isChecked:false, etiqueta: "Bloqueta picardo"},
        {id:4, value:"bloqueta_noble", isChecked:false, etiqueta: "Bloqueta noble"},
        {id:5, value:"piedra_picardo", isChecked:false, etiqueta: "Piedra picardo"},
        {id:6, value:"piedra_noble" , isChecked:false, etiqueta: "Piedra noble"},
        {id:7, value:"sillar_picardo", isChecked:false, etiqueta: "Sillar picardo"},
        {id:8, value:"sillar_noble", isChecked:false, etiqueta: "Sillar noble"},
        {id:9, value:"noble", isChecked:false, etiqueta: "Noble"},
        {id:10, value:"adobe", isChecked:false, etiqueta:"Adobe"},
        {id:11, value:"calamina", isChecked:false, etiqueta: "Calamina"},
        {id:12, value:"madera", isChecked:false, etiqueta: "Madera"},
        {id:13, value:"estera", isChecked:false, etiqueta:"Estera"},
        {id:14, value:"metal", isChecked:false, etiqueta:"Metal"},
        {id:15, value:"drywall", isChecked:false, etiqueta:"Drywall"},
        {id:16, value:"eternit", isChecked:false, etiqueta:"Eternit"},
        {id:17, value:"plastico", isChecked:false, etiqueta:"Plastico"},
        {id:18, value:"tela", isChecked:false, etiqueta:"Tela"},
        {id:19, value:"carton", isChecked:false, etiqueta:"Carton"},
        {id:20, value:"malla", isChecked:false, etiqueta:"Malla"}

    ]);

    //State para crear las categorias de material predominante PERI
    const [materialPeri, setMaterialPeri] = useState([
        {id:1, value:"ladrillo_picardo", isChecked:false , etiqueta: "Ladrillo picardo"} , 
        {id:2, value:"ladrillo_noble", isChecked:false, etiqueta: "Ladrillo noble"} ,
        {id:3, value:"bloqueta_picardo", isChecked:false, etiqueta: "Bloqueta picardo"},
        {id:4, value:"bloqueta_noble", isChecked:false, etiqueta: "Bloqueta noble"},
        {id:5, value:"piedra_picardo", isChecked:false, etiqueta: "Piedra picardo"},
        {id:6, value:"piedra_noble" , isChecked:false, etiqueta: "Piedra noble"},
        {id:7, value:"sillar_picardo", isChecked:false, etiqueta: "Sillar picardo"},
        {id:8, value:"sillar_noble", isChecked:false, etiqueta: "Sillar noble"},
        {id:9, value:"noble", isChecked:false, etiqueta: "Noble"},
        {id:10, value:"adobe", isChecked:false, etiqueta:"Adobe"},
        {id:11, value:"calamina", isChecked:false, etiqueta: "Calamina"},
        {id:12, value:"madera", isChecked:false, etiqueta: "Madera"},
        {id:13, value:"estera", isChecked:false, etiqueta:"Estera"},
        {id:14, value:"metal", isChecked:false, etiqueta:"Metal"},
        {id:15, value:"drywall", isChecked:false, etiqueta:"Drywall"},
        {id:16, value:"eternit", isChecked:false, etiqueta:"Eternit"},
        {id:17, value:"plastico", isChecked:false, etiqueta:"Plastico"},
        {id:18, value:"tela", isChecked:false, etiqueta:"Tela"},
        {id:19, value:"carton", isChecked:false, etiqueta:"Carton"},
        {id:20, value:"malla", isChecked:false, etiqueta:"Malla"}

    ]);

    // Variables que no van a ir a la BD
    const [auxiliares, setAuxiliares] = useState(initAux)


    //Extraer los datos que se enviaron desde context de Rociado
    const RociadosContext = useContext(RociadoContext);
    const {statusBtnAddRoc} = RociadosContext;

    //Validacion
    const { register, handleSubmit, errors, reset } = useForm();


    useEffect(() => {
        if(statusBtnAddRoc) {
            console.log("en rociados - entro al useEffect ");
            setCurrentRociados(inicioRociado);
            setAuxiliares(initAux);
            reset(inicioRociado);
            reset(initAux);       
        }
    },[statusBtnAddRoc])

    console.log("Desde Form Rociado");

    const onChange = (e) => {
        //Para modificar el state currentRociado se utiliza su funcion
        setCurrentRociados({
            ...currentRociados,
            [e.target.name]: e.target.value
        })

    }

    const onChangeCheck = (e) => {
         //Para modificar el state currentRociado se utiliza su funcion
         //especficamente cuando es check
         setAuxiliares({
             ...auxiliares,
             [e.target.name]: e.target.checked
         });
    };

    const onChangeCheckIntra = (e) => {
        //Cuando este check los material predominante INTRA
        //aqui va el debugger
        let categoriasI = materialIntra
        categoriasI.map( categoria => {
            if(categoria.value  === e.target.value) {
                categoria.isChecked = e.target.checked
            }
        })

        //console.log(materialIntra)

    };

    const onChangeCheckPeri = (e) => {
        let categoriasP = materialPeri
        categoriasP.map( categoriaP => {
            if(categoriaP.value === e.target.value) {
                categoriaP.isChecked = e.target.checked
            }
        })
    };

    //Funcion para la operacion matematica


    const OnSubmit = () => {

        //cambiando el formato de la fecha
        currentRociados.roc_fecha = DateFull(currentRociados.roc_fecha);
        debugger

        let materialesIntra = MaterialIntra(materialIntra);
        currentRociados.roc_intra_material_predominante = materialesIntra;

        let materialesPeri = MaterialPeri(materialPeri);
        currentRociados.roc_peri_material_predominante = materialesPeri;

        

        if(currentRociados.roc_tratamiento_residual === "T"){
            let superficieT = (currentRociados.roc_cant_insecticida * 165).toString();
            currentRociados.roc_superficie_tratada = superficieT;
        }
        else{
            if(currentRociados.roc_superficie_tratada === "DES"){
                if(currentRociados.roc_deshabitada_rociada === "1"){
                    let superficieT = (currentRociados.roc_cant_insecticida * 165).toString();
                    currentRociados.roc_superficie_tratada = superficieT;
                }
                else{
                    currentRociados.roc_cant_insecticida = "NA"
                    currentRociados.roc_superficie_tratada = "NA"
                }
            }else{
                currentRociados.roc_cant_insecticida = "NA"
                currentRociados.roc_superficie_tratada = "NA"
            }

        }
        if(roc_techo !== true) {
            currentRociados.roc_techo_cant_perros = "NA"
            currentRociados.roc_techo_cant_gatos = "NA"
            currentRociados.roc_techo_cant_aves_corral = "NA"
            currentRociados.roc_techo_cant_cuyes = "NA"
            currentRociados.roc_techo_cant_conejos = "NA"

        }

        if(roc_patio !== true) {
            currentRociados.roc_patio_cant_perros = "NA"
            currentRociados.roc_patio_cant_gatos = "NA"
            currentRociados.roc_patio_cant_aves_corral = "NA"
            currentRociados.roc_patio_cant_cuyes = "NA"
            currentRociados.roc_patio_cant_conejos = "NA"

        }
        // cambiando todos los vacios por NA
        PutNA(currentRociados);

        console.log("entro al submit")
        console.log(currentRociados);

        //Verificar si es ADD
        if(statusBtnAddRoc) {
            //AddRociados(currentRociados);
            setCurrentRociados(inicioRociado)
        }

        

    };

    //Extraer los datos auxiliares
    const { roc_techo,
            roc_patio,
            roc_techo_perro,
            roc_techo_gato,
            roc_techo_ave,
            roc_techo_cuy,
            roc_techo_conejo,
            roc_techo_animales_otro,
            roc_patio_perro,
            roc_patio_gato,
            roc_patio_ave,
            roc_patio_cuy,
            roc_patio_conejo,
            roc_patio_animales_otro} = auxiliares;

    //Extraer los datos del state currrentRociados
    const { 
            roc_tratamiento_residual,
            roc_deshabitada_rociada,
            roc_nombre_rociador,
            roc_nombre_insecticida,
            roc_jefe_familia,
            roc_cant_personas,
            roc_intra_cant_ambientes,
            roc_intra_ambientes_cerrados,
            roc_intra_grietas,
            roc_intra_cant_capturados,
            roc_peri_cant_ambientes,
            roc_peri_grietas,
            roc_peri_cant_capturados,
            roc_techo_cant_perros,
            roc_techo_cant_gatos,
            roc_techo_cant_aves_corral,
            roc_techo_cant_cuyes,
            roc_techo_cant_conejos,
            roc_techo_text_otros,
            roc_techo_cant_otros,
            roc_patio_cant_perros,
            roc_patio_cant_gatos,
            roc_patio_cant_aves_corral,
            roc_patio_cant_cuyes,
            roc_patio_cant_conejos,
            roc_patio_text_otros,
            roc_patio_cant_otros,
            roc_cant_insecticida} = currentRociados;
            


    return (

        <MyModal modal={props.modal} ChangeModal={props.ChangeModal} formTitle={props.formTitle}>

            <Form 
                onSubmit={handleSubmit(OnSubmit)}
            >
                <Form.Group as={Col} controlId="roc_unicode">
                    <Form.Label>Codigo de Vivienda</Form.Label>
                    <Form.Control
                        readOnly
                        type="text"
                        name="roc_unicode"
                        value="1.1.1.1"
                        //value={props.unicode}
                    />
                </Form.Group>
                
                <Form.Group as={Col} controlId="roc_tratamiento_residual">
                    <Form.Label>Tratamiento residual</Form.Label>
                    <Form.Control
                        as="select"
                        name="roc_tratamiento_residual"
                        onChange={onChange}
                        value={roc_tratamiento_residual}
                    >
                        <option>Seleccione...</option>
                        <option value="T">Tratamiento Integral</option>
                        <option value="R">Renuente</option>
                        <option value="C">Cerrada</option>
                        <option value="DES">Deshabitada</option>

                    </Form.Control>
                </Form.Group>

                {roc_tratamiento_residual === "DES" ?
                    (
                        <Form.Group as={Col} controlId="roc_deshabitada_rociada">
                            <Form.Label>La vivienda fue rociada?</Form.Label>
                            <Form.Control
                                as="select"
                                name="roc_deshabitada_rociada"
                                onChange={onChange}
                                value={roc_deshabitada_rociada}
                            >
                                <option>Seleccione...</option>
                                <option value="1">Si</option>
                                <option value="0">No</option>

                            </Form.Control>
                        </Form.Group>
                    ):null
                }

                {roc_tratamiento_residual === "T" ||  roc_deshabitada_rociada === "1" ?
                    (
                        <Fragment>
                            <Form.Group as={Col} controlId="roc_nombre_rociador">
                                <Form.Label>Nombre del Rociador</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="roc_nombre_rociador"
                                    onChange={onChange}
                                    value={roc_nombre_rociador}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="roc_nombre_insecticida">
                                <Form.Label>Que insecticida esta utilizando?</Form.Label>
                                <Form.Check
                                    type="radio"
                                    label="Deltametrina"
                                    name="roc_nombre_insecticida"
                                    value="deltametrina"
                                    id="deltametrina"
                                    checked={roc_nombre_insecticida === "deltametrina"}
                                    onChange={onChange}
                                    //falta el ref - register
                                />
                                <Form.Check
                                    type="radio"
                                    label="Lambdacialotrina"
                                    name="roc_nombre_insecticida"
                                    value="lambdacialotrina"
                                    id="lambdacialotrina"
                                    checked={roc_nombre_insecticida === "lambdacialotrina"}
                                    onChange={onChange}
                                    //falta el ref - register
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="roc_jefe_familia">
                                <Form.Label>Nombre del jefe de familia</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="roc_jefe_familia"
                                    onChange={onChange}
                                    value={roc_jefe_familia}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="roc_cant_personas">
                                <Form.Label>Numero de personas</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="roc_cant_personas"
                                    onChange={onChange}
                                    value={roc_cant_personas}
                                />
                            </Form.Group>
                            <strong>Division-Intra domicilio</strong>
                            <Form.Row>
                                <Form.Group as={Col} controlId="roc_intra_cant_ambientes">
                                    <Form.Label>Numero de ambientes</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="roc_intra_cant_ambientes"
                                        onChange={onChange}
                                        value={roc_intra_cant_ambientes}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="roc_intra_ambientes_cerrados">
                                    <Form.Label>Numero de ambientes cerrados</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="roc_intra_ambientes_cerrados"
                                        onChange={onChange}
                                        value={roc_intra_ambientes_cerrados}
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Form.Group as={Col} >
                                <Form.Label>Material Predominante</Form.Label>
                                    {materialIntra.map(material => (
                                        <Form.Check
                                            type="checkbox"
                                            key = {material.id}
                                            //checked = {material.isChecked}
                                            value = {material.value}
                                            onChange = {onChangeCheckIntra}
                                            label = {material.etiqueta}
                                                
                                        />

                                    ))}
                            </Form.Group>
                            <Form.Row>
                                <Col>
                                    <Form.Group as={Col} controlId="roc_intra_grietas">
                                        <Form.Label>Grietas</Form.Label>
                                        <Form.Check
                                            type="radio"
                                            label="Si"
                                            name="roc_intra_grietas"
                                            value="1"
                                            id="si"
                                            checked={roc_intra_grietas === "1"}
                                            onChange={onChange}
                                            //falta el ref - register
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="No"
                                            name="roc_intra_grietas"
                                            value="0"
                                            id="no"
                                            checked={roc_intra_grietas === "0"}
                                            onChange={onChange}
                                            //falta el ref - register
                                        />
                               
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group as={Col} controlId="roc_intra_cant_capturados">
                                        <Form.Label>Numero de triatominos capturados</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="roc_intra_cant_capturados"
                                            onChange={onChange}
                                            value={roc_intra_cant_capturados}
                                        />
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <strong>Division-Peri domicilio</strong>
                            <Form.Group as={Col} controlId="roc_peri_cant_ambientes">
                                <Form.Label>Numero de Ambientes</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="roc_peri_cant_ambientes"
                                    onChange={onChange}
                                    value={roc_peri_cant_ambientes}
                                />
                            </Form.Group>
                            <Form.Group as={Col} >
                                <Form.Label>Material Predominante</Form.Label>
                                    {materialPeri.map(materialP => (
                                        <Form.Check
                                            type="checkbox"
                                            key = {materialP.id}
                                            //checked = {material.isChecked}
                                            value = {materialP.value}
                                            onChange = {onChangeCheckPeri}
                                            label = {materialP.etiqueta}
                                                
                                        />

                                    ))}
                            </Form.Group>
                            <Form.Row>
                                <Col>
                                    <Form.Group as={Col} controlId="roc_peri_grietas">
                                        <Form.Label>Grietas</Form.Label>
                                        <Form.Check
                                            type="radio"
                                            label="Si"
                                            name="roc_peri_grietas"
                                            value="1"
                                            id="si"
                                            checked={roc_peri_grietas === "1"}
                                            onChange={onChange}
                                            //falta el ref - register
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="No"
                                            name="roc_peri_grietas"
                                            value="2"
                                            id="no"
                                            checked={roc_peri_grietas === "2"}
                                            onChange={onChange}
                                            //falta el ref - register
                                        />
                               
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group as={Col} controlId="roc_peri_cant_capturados">
                                        <Form.Label>Numero de triatominos capturados</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="roc_peri_cant_capturados"
                                            onChange={onChange}
                                            value={roc_peri_cant_capturados}
                                        />
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <strong>CRIANZA DE ANIMALES</strong>
                            <Form.Group as={Col} controlId="roc_techo">
                                <Form.Check
                                    type="checkbox"
                                    name="roc_techo"
                                    label="Techo"
                                    onChange={onChangeCheck}
                                    checked={roc_techo}
                                />
                            </Form.Group>

                            {roc_techo ?
                                (<Fragment>
                                    <Row>
                                        <Col md={{ span: 5, offset: 1 }} >
                                            <Form.Group as={Col} controlId="roc_techo_perro">
                                                <Form.Check
                                                    type="checkbox"
                                                    name="roc_techo_perro"
                                                    label="Perros"
                                                    onChange={onChangeCheck}
                                                    //checked={roc_techo_perro}

                                                />
                                            </Form.Group>
                                        </Col>
                                        {roc_techo_perro ?
                                            (
                                                <Col md={{ span: 3, offset: 1 }}>
                                                    <Form.Group controlId="roc_techo_cant_perros">
                                                        <Form.Control
                                                            type="number"
                                                            name="roc_techo_cant_perros"
                                                            onChange={onChange}
                                                            min="0"
                                                            value={roc_techo_cant_perros}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            ):null
                                        }
                                    </Row>
                                    <Row>
                                        <Col md={{ span: 5, offset: 1 }} >
                                            <Form.Group as={Col} controlId="roc_techo_gato">
                                                <Form.Check
                                                    type="checkbox"
                                                    name="roc_techo_gato"
                                                    label="Gatos"
                                                    onChange={onChangeCheck}
                                                    //checked={roc_techo_perro}

                                                />
                                            </Form.Group>
                                        </Col>
                                        {roc_techo_gato ?
                                            (
                                                <Col md={{ span: 3, offset: 1 }}>
                                                    <Form.Group controlId="roc_techo_cant_gatos">
                                                        <Form.Control
                                                            type="number"
                                                            name="roc_techo_cant_gatos"
                                                            onChange={onChange}
                                                            min="0"
                                                            value={roc_techo_cant_gatos}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            ):null
                                        }

                                    </Row>
                                    <Row>
                                        <Col md={{ span: 5, offset: 1 }} >
                                            <Form.Group as={Col} controlId="roc_techo_ave">
                                                <Form.Check
                                                    type="checkbox"
                                                    name="roc_techo_ave"
                                                    label="Aves de corral"
                                                    onChange={onChangeCheck}
                                                    //checked={roc_techo_perro}

                                                />
                                            </Form.Group>
                                        </Col>
                                        {roc_techo_ave ?
                                            (
                                                <Col md={{ span: 3, offset: 1 }}>
                                                    <Form.Group controlId="roc_techo_cant_aves_corral">
                                                        <Form.Control
                                                            type="number"
                                                            name="roc_techo_cant_aves_corral"
                                                            onChange={onChange}
                                                            min="0"
                                                            value={roc_techo_cant_aves_corral}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            ):null
                                        }

                                    </Row>
                                    <Row>
                                        <Col md={{ span: 5, offset: 1 }} >
                                            <Form.Group as={Col} controlId="roc_techo_cuy">
                                                <Form.Check
                                                    type="checkbox"
                                                    name="roc_techo_cuy"
                                                    label="Cuyes"
                                                    onChange={onChangeCheck}
                                                    //checked={roc_techo_perro}

                                                />
                                            </Form.Group>
                                        </Col>
                                        {roc_techo_cuy ?
                                            (
                                                <Col md={{ span: 3, offset: 1 }}>
                                                    <Form.Group controlId="roc_techo_cant_cuyes">
                                                        <Form.Control
                                                            type="number"
                                                            name="roc_techo_cant_cuyes"
                                                            onChange={onChange}
                                                            min="0"
                                                            value={roc_techo_cant_cuyes}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            ):null
                                        }

                                    </Row>
                                    <Row>
                                        <Col md={{ span: 5, offset: 1 }} >
                                            <Form.Group as={Col} controlId="roc_techo_conejo">
                                                <Form.Check
                                                    type="checkbox"
                                                    name="roc_techo_conejo"
                                                    label="Conejos"
                                                    onChange={onChangeCheck}
                                                    //checked={roc_techo_perro}

                                                />
                                            </Form.Group>
                                        </Col>
                                        {roc_techo_conejo ?
                                            (
                                                <Col md={{ span: 3, offset: 1 }}>
                                                    <Form.Group controlId="roc_techo_cant_conejos">
                                                        <Form.Control
                                                            type="number"
                                                            name="roc_techo_cant_conejos"
                                                            onChange={onChange}
                                                            min="0"
                                                            value={roc_techo_cant_conejos}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            ):null
                                        }

                                    </Row>
                                    <Row>
                                        <Col md={{ span: 5, offset: 1 }} >
                                            <Form.Group as={Col} controlId="roc_techo_animales_otro">
                                                <Form.Check
                                                    type="checkbox"
                                                    name="roc_techo_animales_otro"
                                                    label="Otros"
                                                    onChange={onChangeCheck}
                                                    //checked={roc_techo_perro}

                                                />
                                            </Form.Group>
                                        </Col>
                                        {roc_techo_animales_otro ?
                                            (
                                                <Row>
                                                    <Col md={{ span: 5, offset: 2 }}>
                                                        <Form.Group controlId="roc_techo_text_otros">
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="¿Cual es el animal?"
                                                                name="roc_techo_text_otros"
                                                                onChange={onChange}
                                                                value={roc_techo_text_otros}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={{ span: 3, offset: 1 }}>
                                                        <Form.Group controlId="roc_techo_cant_otros">
                                                            <Form.Control
                                                                type="number"
                                                                name="roc_techo_cant_otros"
                                                                onChange={onChange}
                                                                min="0"
                                                                value={roc_techo_cant_otros}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            ):null
                                        }

                                    </Row>
                                

                                </Fragment>):null
                            }
                            <Form.Group as={Col} controlId="roc_patio">
                                <Form.Check
                                    type="checkbox"
                                    name="roc_patio"
                                    label="Patio"
                                    onChange={onChangeCheck}
                                    checked={roc_patio}
                                />
                            </Form.Group>

                            {roc_patio ?
                                (<Fragment>
                                    <Row>
                                        <Col md={{ span: 5, offset: 1 }} >
                                            <Form.Group as={Col} controlId="roc_patio_perro">
                                                <Form.Check
                                                    type="checkbox"
                                                    name="roc_patio_perro"
                                                    label="Perros"
                                                    onChange={onChangeCheck}
                                                    //checked={roc_techo_perro}

                                                />
                                            </Form.Group>
                                        </Col>
                                        {roc_patio_perro ?
                                            (
                                                <Col md={{ span: 3, offset: 1 }}>
                                                    <Form.Group controlId="roc_patio_cant_perros">
                                                        <Form.Control
                                                            type="number"
                                                            name="roc_patio_cant_perros"
                                                            onChange={onChange}
                                                            min="0"
                                                            value={roc_patio_cant_perros}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            ):null
                                        }
                                    </Row>
                                    <Row>
                                        <Col md={{ span: 5, offset: 1 }} >
                                            <Form.Group as={Col} controlId="roc_patio_gato">
                                                <Form.Check
                                                    type="checkbox"
                                                    name="roc_patio_gato"
                                                    label="Gatos"
                                                    onChange={onChangeCheck}
                                                    //checked={roc_techo_perro}

                                                />
                                            </Form.Group>
                                        </Col>
                                        {roc_patio_gato ?
                                            (
                                                <Col md={{ span: 3, offset: 1 }}>
                                                    <Form.Group controlId="roc_patio_cant_gatos">
                                                        <Form.Control
                                                            type="number"
                                                            name="roc_patio_cant_gatos"
                                                            onChange={onChange}
                                                            min="0"
                                                            value={roc_patio_cant_gatos}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            ):null
                                        }
                                    </Row>
                                    <Row>
                                        <Col md={{ span: 5, offset: 1 }} >
                                            <Form.Group as={Col} controlId="roc_patio_ave">
                                                <Form.Check
                                                    type="checkbox"
                                                    name="roc_patio_ave"
                                                    label="Aves de Corral"
                                                    onChange={onChangeCheck}
                                                    //checked={roc_techo_perro}

                                                />
                                            </Form.Group>
                                        </Col>
                                        {roc_patio_ave ?
                                            (
                                                <Col md={{ span: 3, offset: 1 }}>
                                                    <Form.Group controlId="roc_patio_cant_aves_corral">
                                                        <Form.Control
                                                            type="number"
                                                            name="roc_patio_cant_aves_corral"
                                                            onChange={onChange}
                                                            min="0"
                                                            value={roc_patio_cant_aves_corral}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            ):null
                                        }
                                    </Row>
                                    <Row>
                                        <Col md={{ span: 5, offset: 1 }} >
                                            <Form.Group as={Col} controlId="roc_patio_cuy">
                                                <Form.Check
                                                    type="checkbox"
                                                    name="roc_patio_cuy"
                                                    label="Cuyes"
                                                    onChange={onChangeCheck}
                                                    //checked={roc_techo_perro}

                                                />
                                            </Form.Group>
                                        </Col>
                                        {roc_patio_cuy ?
                                            (
                                                <Col md={{ span: 3, offset: 1 }}>
                                                    <Form.Group controlId="roc_patio_cant_cuyes">
                                                        <Form.Control
                                                            type="number"
                                                            name="roc_patio_cant_cuyes"
                                                            onChange={onChange}
                                                            min="0"
                                                            value={roc_patio_cant_cuyes}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            ):null
                                        }
                                    </Row>
                                    <Row>
                                        <Col md={{ span: 5, offset: 1 }} >
                                            <Form.Group as={Col} controlId="roc_patio_conejo">
                                                <Form.Check
                                                    type="checkbox"
                                                    name="roc_patio_conejo"
                                                    label="Conejos"
                                                    onChange={onChangeCheck}
                                                    //checked={roc_techo_perro}

                                                />
                                            </Form.Group>
                                        </Col>
                                        {roc_patio_conejo ?
                                            (
                                                <Col md={{ span: 3, offset: 1 }}>
                                                    <Form.Group controlId="roc_patio_cant_conejos">
                                                        <Form.Control
                                                            type="number"
                                                            name="roc_patio_cant_conejos"
                                                            onChange={onChange}
                                                            min="0"
                                                            value={roc_patio_cant_conejos}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            ):null
                                        }
                                    </Row>
                                    <Row>
                                        <Col md={{ span: 5, offset: 1 }} >
                                            <Form.Group as={Col} controlId="roc_patio_animales_otro">
                                                <Form.Check
                                                    type="checkbox"
                                                    name="roc_patio_animales_otro"
                                                    label="Otros"
                                                    onChange={onChangeCheck}
                                                    //checked={roc_techo_perro}

                                                />
                                            </Form.Group>
                                        </Col>
                                        {roc_patio_animales_otro ?
                                            (
                                                <Row>
                                                    <Col md={{ span: 5, offset: 2 }}>
                                                        <Form.Group controlId="roc_patio_text_otros">
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="¿Cual es el animal?"
                                                                name="roc_patio_text_otros"
                                                                onChange={onChange}
                                                                value={roc_patio_text_otros}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={{ span: 3, offset: 1 }}>
                                                        <Form.Group controlId="roc_patio_cant_otros">
                                                            <Form.Control
                                                                type="number"
                                                                name="roc_patio_cant_otros"
                                                                onChange={onChange}
                                                                min="0"
                                                                value={roc_patio_cant_otros}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            ):null
                                        }

                                    </Row>

                                </Fragment>):null
                            }
                            
                            <Form.Group controlId="roc_cant_insecticida">
                                <Form.Label>Consumo de insecticidas(Número de Cargas)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="roc_cant_insecticida"
                                    onChange={onChange}
                                    min="0"
                                    defaultValue={roc_cant_insecticida}
                                />
                            </Form.Group>
                            <Form.Group controlId="roc_superficie_tratada">
                                <Form.Label>Superficie tratada (1 Carga = 165 m2)</Form.Label>
                                <Form.Control
                                    readOnly
                                    type="text"
                                    name="roc_superficie_tratada"
                                    value={165*roc_cant_insecticida}
                                />
                            </Form.Group>
                                
                            
                        </Fragment>
                    ):null
                }

                <Button type='submit'> Guardar </Button>

                





            </Form>

        </MyModal>
       

    );

}

export default FormRociado;