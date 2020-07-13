import React, {useContext} from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import Header from "../../layouts/Header";
import InspectionContext from '../../context/inspection/InspectionContext';

const Activities = (props) => {
    
    //Extraer los valores del context
    const InspectionsContext = useContext(InspectionContext);
    const { PressBtnInspection } = InspectionsContext;
    
    const GoDenunciations = () => {
        props.history.push('/actividades/denuncias');
    }
    const GoMap = ( btnPress ) => {
        PressBtnInspection(btnPress);
        props.history.push('/actividades/mapa');
    }
    return (
        <>
            <Header/>
            <Container fluid="md">
                <Row>
                    <Col>
                        <div id="wrap-button-den" className="wrap-button">
                            <label id='title-button-den' className='title-button'>Denuncias</label>
                            <Button id="btn_actDenuncias" variant="primary" onClick={GoDenunciations}>Denuncias</Button>
                        </div>
                        <div id="wrap-button-ins" className="wrap-button">
                            <label id='title-button-ins' className='title-button'>Inspecciones</label>
                            <Button id="btn_actInspeccionesPasivas" variant="danger" onClick={()=>GoMap("inspPasive")}>Inspecciones por Denuncia</Button>
                            <Button id="btn_actInspeccionesActivas" variant="danger" onClick={()=>GoMap("inspActive")}>Inspecciones Activas</Button>
                        </div>
                        <div id="wrap-button-roc" className="wrap-button">
                            <label id='title-button-roc' className='title-button'>Rociados</label>
                            <Button id="btn_actRociados" variant="success" onClick={()=>GoMap("sprayed")}>Rociado</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Activities;