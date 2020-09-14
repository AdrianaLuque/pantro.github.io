import React , {useReducer} from 'react';
import ClienteAxios from "../../config/axios";

//Importar archivos de context
import RociadoContext from './RociadoContext';
import RociadoReducer from './RociadoReducer';

//Importar de type
import {    BTN_ROC,
            BTN_ADD_ROCIADO,
            ADD_ROCIADO,
            DISABLED_BTN_ADD_ROCIADO,
            GET_ROCIADOS } from '../../types';


const RociadoState = props => {

    const initialState = {

        //Aca debo jalar de la BD los rociados registrados - FUTURO
        rociados: [],
        //Boton para que se agrege rociados
        statusBtnAddRoc:false,
        //Boton para entrar a rociados, desde la parte de ACTIVIDADES
        statusBtnRoc:false
    }

    //state para llamar al reducer
    const [state, dispatch] = useReducer(RociadoReducer,initialState);

    //Funciones que se va hacer con el dispatch, son para acciones
    //Funcion para cuando se presiona Rociados - dentro de Activities
    const PressBtnRoc = () => {
        dispatch({
            type:BTN_ROC
        });

    }

    //Funcion para cuando se agrega un rociado a una vivienda
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

    //Funcion para obtener los rociados registrados en la BD
    const GetRociados = async () => {
        try{
            const resultado = await ClienteAxios.get('/api/rociados');

            dispatch({
                type:GET_ROCIADOS,
                payload: resultado.data
            });
        }catch (error) {
             console.log(error);
        }
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
                rociados: state.rociados,
                statusBtnAddRoc : state.statusBtnAddRoc,
                statusBtnRoc : state.statusBtnRoc,
                PressBtnRoc,
                PressBtnAddRoc,
                UnPressBtnAddRoc,
                GetRociados,
                AddRociados
            }}
        >
            {props.children}
        </RociadoContext.Provider>
    )
}

export default RociadoState;