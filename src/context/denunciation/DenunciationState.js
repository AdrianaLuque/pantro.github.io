import React, {useReducer} from 'react';
import ClienteAxios from "../../config/axios";

import DenunciationContext from './DenunciationContext';
import DenunciationReducer from './DenunciationReducer';
import { 
    GET_DENUNCIATIONS,
    ADD_DENUNCIATION
} from '../../types';

const DenunciationState = props => {
    
    const initialState = {
        denunciations: []
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(DenunciationReducer, initialState);

    //FUNCIONES
    //* Obtener denuncias
    const GetDenunciations = async () => {
        
        try {
            const resultado = await ClienteAxios.get('/api/denuncias');
            //console.log(resultado);

            dispatch({
                type: GET_DENUNCIATIONS,
                payload: resultado.data
            });
            
        } catch (error) {
            console.log(error);
        }
    }

    //* Agregar denuncias
    const AddDenunciation = async ( denunciation ) => {
        denunciation.den_id = 0;
        
        try {
            const resultado = await ClienteAxios.post('/api/denuncias', denunciation );
            //console.log(resultado);

            dispatch({
                type: ADD_DENUNCIATION,
                payload: resultado.data
            });
            
        } catch (error) {
            console.log(error);
        }
    }

    //* Editar denuncias
    const EditDenunciation = async ( denunciation ) => {
        
        try {
            const resultado = await ClienteAxios.post('/api/denuncias', denunciation);
            //console.log(resultado);

            dispatch({
                type: ADD_DENUNCIATION,
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
                GetDenunciations,
                AddDenunciation,
                EditDenunciation
            }}
        >
            {props.children}
        </DenunciationContext.Provider>
    );
}

export default DenunciationState;