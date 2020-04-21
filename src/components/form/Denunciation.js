import React, {useState, useContext, useEffect} from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import authContext from "../../context/auth/authContext";
import alertaContext from '../../context/alertas/alertaContext';

//Formulario de denuncia
const Denunciation = (props) => {
  
    //Extraer los valores del context
    const alertasContext = useContext(alertaContext);
    const { alerta, MostrarAlerta } = alertasContext;

    const authsContext = useContext(authContext);
    const { mensaje } = authsContext;

    //En caso de que el passwors o usuario no exista
    /*useEffect(() => {
        
        if (mensaje) {
            MostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        //Para evitar que mande error por que sabemos que esta bien
        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history]);*/
    
    //State para iniciar sesión
    const [usuario, guardarUsuario] = useState({
        username: '',
        password: ''
    });

    //Extraer de usuario
    const { username, password } = usuario;

    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        //Validar que no haya campos vacios
        if (username.trim() === '' || password.trim() === '') {
            MostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
        }
    }

    return (
        <>
            { alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null }
            <Container className="p-4">
                <Col md={{ span: 4, offset: 4 }} className="text-center">
                    <h3>Nuevo registro de Denuncia</h3>
                    <Form
                        onSubmit={onSubmit}
                    >
                        <Form.Group controlId="den_id_custom">
                            <Form.Label >Identificador de denuncia</Form.Label>
                            <Form.Control 
                                type='text'
                                name='den_id_custom'
                                //value={den_id_custom}
                                onChange={onChange}
                            />
                        </Form.Group>
                        
                        <Button variant="primary" type='submit'>
                            Entrar
                        </Button>
                    </Form>
                </Col>
            </Container >
        </>
    );
}

export default Denunciation;