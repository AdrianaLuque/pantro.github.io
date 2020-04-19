import React, {useReducer} from 'react';

import alertaContext from './alertaContext';
import alertaReducer from './alertaReducer';
import { 
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from '../../types';

const AlertaState = props => {
    
    const initialState = {
        alerta: null
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(alertaReducer, initialState);

    //Funciones
    const MostrarAlerta = (msg, categoria) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msg,
                categoria
            }
        });

        //Despues de 5 segundos limpiar el mensaje de error
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 5000);
    }

    return(
        <alertaContext.Provider
            value={{
                alerta: state.alerta,
                MostrarAlerta
            }}
        >
            {props.children}
        </alertaContext.Provider>
    );
}

export default AlertaState;