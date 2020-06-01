import React, {useReducer} from 'react';

import authContext from './AuthenticationContext';
import authReducer from './AuthenticationReducer';
import ClienteAxios from "../../config/axios";
//import tokenAuth from "../../config/tokenAuth";
import { 
    LOGIN_EXIT,
    LOGIN_ERROR,
    LOGIN_END
} from '../../types';

const AuthenticationState = props => {
    
    const initialState = {
        //token: localStorage.getItem('token'),
        authenticated: false,
        user: {},
        mensaje: null,
        cargando: true
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(authReducer, initialState);

    //Cuando el usuario inicia sesion
    const Login = async datos => {
        try {
            //Comprobando que el username y password sean correctos
            const respuesta = await ClienteAxios.post('/api/acceder', datos);
            //Almacenando el username que se logio
            await ClienteAxios.post('/api/visitas-app', datos);
            
            dispatch({
                type: LOGIN_EXIT,
                payload: respuesta.data
            });
            
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
    const Logout = () => {
        dispatch({
            type: LOGIN_END
        });
    }

    return(
        <authContext.Provider
            value={{
                //token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                mensaje: state.mensaje,
                cargando: state.cargando,
                Login,
                Logout
            }}
        >
            {props.children}
        </authContext.Provider>
    );
}

export default AuthenticationState;