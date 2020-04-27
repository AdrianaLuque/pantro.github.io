import React, {useReducer} from 'react';
import ClienteAxios from "../../config/axios";

import DenunciationContext from './DenunciationContext';
import DenunciationReducer from './DenunciationReducer';
import { 
    GET_DENUNCIATION
} from '../../types';

const DenunciationState = props => {
    
    const initialState = {
        denunciations: []
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(DenunciationReducer, initialState);

    //Funciones
    const GetDenunciations = async () => {
        
        try {
            const resultado = await ClienteAxios.get('/api/denuncias');
            //console.log(resultado);

            dispatch({
                type: GET_DENUNCIATION,
                payload: resultado.data
            });
            
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <DenunciationContext.Provider
            value={{
                denunciations: state.denunciations,
                GetDenunciations
            }}
        >
            {props.children}
        </DenunciationContext.Provider>
    );
}

export default DenunciationState;