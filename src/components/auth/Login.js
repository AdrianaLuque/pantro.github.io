import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import authContext from "../../context/auth/authContext";
import alertaContext from '../../context/alertas/alertaContext';

const Login = (props) => {
  
    //Extraer los valores del context
    const alertasContext = useContext(alertaContext);
    const { alerta, MostrarAlerta } = alertasContext;

    const authsContext = useContext(authContext);
    const { mensaje, autenticado, IniciarSesion } = authsContext;

    //En caso de que el passwors o usuario no exista
    useEffect(() => {
        if (autenticado) {
            props.history.push('/actividades');
        }
        
        if (mensaje) {
            MostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        //Para evitar que mande error por que sabemos que esta bien
        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history]);
    
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
        console.log("se presiono boton");
        //Validar que no haya campos vacios
        if (username.trim() === '' || password.trim() === '') {
            MostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
        }

        //Pasarlo al action
        IniciarSesion({ username, password });
    }

    return (
        <>
            { alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null }
            <Container className="p-4">
                <Col md={{ span: 4, offset: 4 }} className="text-center">
                    <h3>Vigilancia Integrada</h3>
                    <Form
                        onSubmit={onSubmit}
                    >
                        <Form.Group controlId="username">
                            <Form.Label ></Form.Label>
                            <Form.Control 
                                type='text'
                                name='username'
                                placeholder='Usuario'
                                value={username}
                                onChange={onChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="password">
                            {/*<Form.Label ></Form.Label>*/}
                            <Form.Control 
                                type='password'
                                name='password'
                                placeholder='Contraseña'
                                value={password}
                                onChange={onChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type='submit'>
                            Entrar
                        </Button>
                    </Form>

                    {/*<Link to={'/nueva-cuenta'} className='enlace-cuenta'>
                        Obtener Cuenta
                    </Link>*/}
                </Col>
            </Container >
        </>
    );
}

export default Login;