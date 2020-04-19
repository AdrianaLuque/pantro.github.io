import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const Activities = (props) => {
    const GoDenunciations = () => {
        props.history.push('/denuncias');
    }

    return (
        <Container fluid="md">
            <Row>
                <Col>
                    <Button variant="primary" onClick={GoDenunciations}>Denuncias</Button>{' '}
                    <Button variant="danger">Inspecciones</Button>{' '}
                    <Button variant="success">Rociado</Button>{' '}
                </Col>
            </Row>
        </Container>
    );
}

export default Activities;