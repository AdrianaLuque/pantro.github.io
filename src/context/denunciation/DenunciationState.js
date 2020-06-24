import React, {useReducer} from 'react';
import ClienteAxios from "../../config/axios";

import DenunciationContext from './DenunciationContext';
import DenunciationReducer from './DenunciationReducer';
import { 
    GET_DENUNCIATIONS,
    ADD_DENUNCIATION,
    EDIT_DENUNCIATION,
    UPDATE_DENUNCIATION,
    DISABLE_EDIT_DENUNCIATION,
    BTN_ADD_DENUNCIATION,
    BTN_EDIT_DENUNCIATION
} from '../../types';

const DenunciationState = props => {
    
    const initialState = {
        valueEditDen: {},
        denunciations: [],
        selectEdit: false,
        statusBtnAdd: false,
        statusBtnEdit: false
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(DenunciationReducer, initialState);
    
    //FUNCIONES
    //* Obtener denuncias
    const GetDenunciations = async ( microred ) => {
        
        try {
            //const resultado = await ClienteAxios.get('/api/denuncias');
            const resultado = await ClienteAxios.post(`/api/denuncias/${microred}`);
            
            dispatch({
                type: GET_DENUNCIATIONS,
                payload: resultado.data
            });
            
        } catch (error) {
            console.log("Error al obtener las denuncias: "+error);
        }
    }

    //* Agregar denuncias
    const AddDenunciation = async ( denunciation ) => {
        denunciation.den_id = 0;
        
        try {
            const resultado = await ClienteAxios.post('/api/denuncias', denunciation );

            dispatch({
                type: ADD_DENUNCIATION,
                payload: resultado.data
            });
            
        } catch (error) {
            console.log(error);
        }
    }

    //* Denuncia seleccionada
    const UpdateDenunciation = ( objDenunciation ) => {
        dispatch({
            type: UPDATE_DENUNCIATION,
            payload: objDenunciation
        });
    }

    //* Editar denuncias
    const EditDenunciation = async ( denunciation ) => {
        
        try {
            const resultado = await ClienteAxios.put(`/api/denuncias/${denunciation.den_id}`, denunciation);
            //console.log(resultado);
            dispatch({
                type: EDIT_DENUNCIATION,
                payload: resultado.data
            });
            
        } catch (error) {
            console.log(error);
        }
    }
    //*Cambiar a falso variable editDen
    const DisableEditDen = () => {
        dispatch({
            type: DISABLE_EDIT_DENUNCIATION
        });
    }
    //*Canmbiar boton presionado add
    const PressBtnAddDen = () => {
        dispatch({
            type: BTN_ADD_DENUNCIATION
        });
    }
    //*Canmbiar boton presionado edit
    const PressBtnEditDen = () => {
        dispatch({
            type: BTN_EDIT_DENUNCIATION
        });
    }

    return(
        <DenunciationContext.Provider
            value={{
                valueEditDen: state.valueEditDen,
                denunciations: state.denunciations,
                selectEdit: state.selectEdit,
                statusBtnAdd: state.statusBtnAdd,
                statusBtnEdit: state.statusBtnEdit,
                GetDenunciations,
                AddDenunciation,
                UpdateDenunciation,
                EditDenunciation,
                DisableEditDen,
                PressBtnAddDen,
                PressBtnEditDen
            }}
        >
            {props.children}
        </DenunciationContext.Provider>
    );
}

export default DenunciationState;