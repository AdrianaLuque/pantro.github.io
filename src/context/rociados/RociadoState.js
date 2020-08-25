import React , {useReducer} from 'react';
import ClienteAxios from "../../config/axios";

//Importar archivos de context
import RociadoContext from './RociadoContext';
import RociadoReducer from './RociadoReducer';

//Importar de type
import {    BTN_ADD_ROCIADO,
            ADD_ROCIADO,
            DISABLED_BTN_ADD_ROCIADO } from '../../types';


const RociadoState = props => {

    const initialState = {

        statusBtnAddRoc:false
    }

    //state para llamar al reducer
    const [state, dispatch] = useReducer(RociadoReducer,initialState);

    //Funciones que se va hacer con el dispatch, son para acciones
    
    const PressBtnAddRoc = () => {
        dispatch({
            type: BTN_ADD_ROCIADO
        });
    }

    const UnPressBtnAddRoc = () => {
        dispatch({
            type: DISABLED_BTN_ADD_ROCIADO
        });
    }

    // Funcion para agregar rociados
    const AddRociados = async (rociados) => {
        try {
            const resultado = await ClienteAxios.post('/api/rociados', rociados);
            dispatch ({
                type:ADD_ROCIADO,
                //el payload no lo veo necesario porque no voy a guardar los registros en un array en el Reducer
                //payload: resultado.data
            })
        }catch (error) {
            console.log(error)
        }
    }

    return (
        
        <RociadoContext.Provider
            value = {{
                statusBtnAddRoc : state.statusBtnAddRoc,
                PressBtnAddRoc,
                UnPressBtnAddRoc,
                AddRociados
            }}
        >
            {props.children}
        </RociadoContext.Provider>
    )
}

export default RociadoState;