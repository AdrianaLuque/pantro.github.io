import React, {useReducer} from 'react';

import authContext from './authContext';
import authReducer from './authReducer';
//import ClienteAxios from "../../config/axios";
//import tokenAuth from "../../config/tokenAuth";
import { 
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION,
    OBTENER_USUARIO
} from '../../types';

const AuthState = props => {
    
    const initialState = {
        //token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(authReducer, initialState);

    //Retorna el Usuario autenticado
    const UsuarioAutenticado = async () => {
        /*const token = localStorage.getItem('token');
        if (token) {
            //Funcion para enviar el token por headers
            tokenAuth(token);
        }*/

        try {
            //const respuesta = await ClienteAxios.get('/api/auth');
            const data = {
                username: "test1",
                password: "123"
            };
            
            //console.log(respuesta);
            dispatch({
                type: OBTENER_USUARIO,
                //payload: respuesta.data
                payload: data
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: LOGIN_ERROR
            });
        }
    }

    //Cuando el usuario inicia sesion
    const IniciarSesion = async datos => {
        try {
            //const respuesta = await ClienteAxios.post('/api/auth', datos);
            
            dispatch({
                type: LOGIN_EXITOSO,
                //payload: respuesta.data
            });
            
            //Obtener el usuario
            UsuarioAutenticado();

        } catch (error) {
            console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            };
            
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            });
        }
    }

    //Cierra la sesion del usuario
    const CerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        });
    }

    return(
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                IniciarSesion,
                UsuarioAutenticado,
                CerrarSesion
            }}
        >
            {props.children}
        </authContext.Provider>
    );
}

export default AuthState;