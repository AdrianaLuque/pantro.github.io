import React, { useReducer } from 'react';
import ClienteAxios from "../../config/axios";

import CimexContext from './CimexContext';
import CimexReducer from './CimexReducer';
import { 
    ADD_CIMEX
} from '../../types';
import { DateFull } from "../../Functions";

const CimexState = props => {
    
    const initialState = {
        cimex: {
            cimex_alguien_picado_casa_ultimo_anio:""
        },
        inspections: [],
        newInspections: [],
        newHealthPosts: [],
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(CimexReducer, initialState);
    
    //FUNCIONES
    //* Agregar CIMEX
    const AddInspection = async ( denunciation ) => {
        denunciation.den_id = 0;
        
        try {
            const resultado = await ClienteAxios.post('/api/denuncias', denunciation );

            dispatch({
                type: ADD_CIMEX,
                payload: resultado.data
            });
            
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <CimexContext.Provider
            value={{
                cimex: state.cimex,
                inspections: state.inspections,
                newInspections: state.newInspections,
                newHealthPosts: state.newHealthPosts,
                AddInspection
            }}
        >
            {props.children}
        </CimexContext.Provider>
    );
}

export default CimexState;