import React, {useContext} from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import Header from "../Header";
import SpinnerContext from '../../context/spinner/SpinnerContext';

const Activities = (props) => {
    //Spinner
    const SpinnersContext = useContext(SpinnerContext);
    const { ShowSpinner } = SpinnersContext;
    
    const GoDenunciations = () => {
        ShowSpinner();
        props.history.push('/actividades/denuncias');
    }
    const GoInsActive = (e) => {
        e.preventDefault();
        props.history.push('/actividades/inspecciones-activas');
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
                            <Button id="btn_actInspeccionesPasivas" disabled variant="danger">Inspecciones por Denuncia</Button>
                            <Button id="btn_actInspeccionesActivas" variant="danger" onClick={GoInsActive}>Inspecciones Activas</Button>
                        </div>
                        <div id="wrap-button-roc" className="wrap-button">
                            <label id='title-button-roc' className='title-button'>Rociados</label>
                            <Button id="btn_actRociados" disabled variant="success">Rociado</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Activities;