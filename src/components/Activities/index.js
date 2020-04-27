import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const Activities = (props) => {
    const GoDenunciations = () => {
        props.history.push('/denuncias');
    }
    const GoInsActive = () => {
        props.history.push('/map');
    }
    return (
        <Container fluid="md">
            <Row>
                <Col>
                    <div id="wrap-button-den" className="wrap-button">
                        <label id='title-button-den' className='title-button'>Denuncias</label>
                        <Button id="btn_actDenuncias" variant="primary" onClick={GoDenunciations}>Denuncias</Button>
                    </div>
                    <div id="wrap-button-ins" className="wrap-button">
                        <label id='title-button-ins' className='title-button'>Inspecciones</label>
                        <Button id="btn_actInspeccionesPasivas" variant="danger">Inspecciones por Denuncia</Button>
                        <Button id="btn_actInspeccionesActivas" variant="danger" onClick={GoInsActive}>Inspecciones Activas</Button>
                    </div>
                    <div id="wrap-button-roc" className="wrap-button">
                        <label id='title-button-roc' className='title-button'>Rociados</label>
                        <Button id="btn_actRociados" variant="success">Rociado</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Activities;