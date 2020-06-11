import React, {useReducer} from 'react';

import AlertContext from './AlertContext';
import AlertReducer from './AlertReducer';
import { 
    SHOW_ALERT,
    HIDE_ALERT
} from '../../types';

const AlertState = props => {
    
    const initialState = {
        alert: null
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(AlertReducer, initialState);

    //Funciones
    const ShowAlert = (msg, categoria) => {
        dispatch({
            type: SHOW_ALERT,
            payload: {
                msg,
                categoria
            }
        });

        //Despues de 5 segundos limpiar el mensaje de error
        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT
            })
        }, 5000);
    }

    return(
        <AlertContext.Provider
            value={{
                alert: state.alert,
                ShowAlert
            }}
        >
            {props.children}
        </AlertContext.Provider>
    );
}

export default AlertState;