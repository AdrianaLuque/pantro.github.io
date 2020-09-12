import React, { useReducer, useContext } from 'react';

import authContext from './AuthenticationContext';
import authReducer from './AuthenticationReducer';
import ClienteAxios from "../../config/axios";
//import tokenAuth from "../../config/tokenAuth";
import { 
    LOGIN_INTO,
    LOGIN_ERROR,
    LOGIN_END
} from '../../types';
import CsvContext from "../csv/CsvContext";
import DenunciationContext from "../denunciation/DenunciationContext";
import InspectionContext from "../inspection/InspectionContext";
import SpinnerContext from "../spinner/SpinnerContext";

const AuthenticationState = props => {
    
    const initialState = {
        //token: localStorage.getItem('token'),
        authenticated: false,
        user: {},
        message: null,
        cargando: true
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(authReducer, initialState);
    //Obtener viviendas
    const CsvsContext = useContext(CsvContext);
    let { CsvHouses, CsvHealthPosts, CsvParticipantsInmune, CsvClean } = CsvsContext;
    //Obtener el denuncias
    const DenunciationsContext = useContext(DenunciationContext);
    const { GetDenunciations } = DenunciationsContext;
    //Obtener el inspecciones
    const InspectionsContext = useContext(InspectionContext);
    const { GetInspections } = InspectionsContext;
    //Cambiar estado de spinner
    const SpinnersContext = useContext(SpinnerContext);
    const { HideSpinner } = SpinnersContext;

    //Cuando el usuario inicia sesion
    const Login = async datos => {

        try {
            //Comprobando que el username y password sean correctos
            const respuesta = await ClienteAxios.post('/api/acceder', datos);
            
            //Almacenando el username que se logio
            await ClienteAxios.post('/api/visitas-app', datos);
            
            //Cargando datos que se necesitaran
            await CsvHouses(respuesta.data.USU_CATCHMENT_AREA, respuesta.data.USU_APP);
            await GetDenunciations(respuesta.data.USU_MICRORED);
            await CsvHealthPosts();
            await CsvParticipantsInmune();
            await GetInspections();
            
            dispatch({
                type: LOGIN_INTO,
                payload: respuesta.data
            });
            
        } catch (error) {
            
            const alerta = {
                msg: error.response.data.msg,
                category: 'danger'
            };
            
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            });
        }
        //Cambiando estado de spinner
        HideSpinner();
    }

    //Cierra la sesion del usuario
    const Logout = () => {
        CsvClean();

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
                message: state.message,
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