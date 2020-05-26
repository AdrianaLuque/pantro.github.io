import React, {useState, useContext, useEffect} from 'react';
import { Container, Col, Form, Button } from 'react-bootstrap';

import AuthenticationContext from "../../context/authentication/AuthenticationContext";
import alertaContext from '../../context/alertas/alertaContext';

const Login = (props) => {
        
    //Extraer los valores del context
    const alertasContext = useContext(alertaContext);
    const { alerta, MostrarAlerta } = alertasContext;

    const AuthenticationsContext = useContext(AuthenticationContext);
    const { mensaje, authenticated, Login } = AuthenticationsContext;

    //En caso de que el passwors o usuario no exista
    useEffect(() => {
        if (authenticated) {
            props.history.push('/actividades');
        }
        
        if (mensaje) {
            MostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        //Para evitar que mande error por que sabemos que esta bien
        // eslint-disable-next-line
    }, [mensaje, authenticated, props.history]);
    
    //State para iniciar sesión
    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    //Extraer de usuario
    const { username, password } = user;

    const onChange = e => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        //Validar que no haya campos vacios
        if (username.trim() === '' || password.trim() === '') {
            MostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
        }
        //Pasarlo al action
        Login({ username, password });
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