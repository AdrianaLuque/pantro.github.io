import React, {useReducer, useContext} from 'react';
import ClienteAxios from "../../config/axios";

import DenunciationContext from './DenunciationContext';
import DenunciationReducer from './DenunciationReducer';
import { 
    GET_DENUNCIATIONS,
    ADD_DENUNCIATION,
    UPDATE_DENUNCIATION,
    INIT_DENUNCIATION,
    DISABLE_EDIT_DENUNCIATION
} from '../../types';
import SpinnerContext from "../spinner/SpinnerContext";

const DenunciationState = props => {
    
    const initialState = {
        denunciation: {
            den_id_custom: 'DEN-XXXXXX',
            usu_cuenta: '',
            usu_microred: '',
            den_fecha_recepcion: new Date(),
            den_medio: '',
            den_agente_nombre:'',
            den_tipo: '',
            den_insecto: '',
            den_insecto_otro:'',
            //-falta variable imagen
            den_habitante_nombre:'',
            den_habitante_telefono1:'',
            den_otro_telefono:false,
            den_habitante_telefono2:'',
            den_provincia: '',
            den_distrito:'',
            den_localidad:'',
            den_direccion:'',
            den_referencia:'',
            den_fecha_probable_inspeccion: null
        },
        denunciations: [],
        editDen: false
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(DenunciationReducer, initialState);
    //Cambiar estado de spinner
    const SpinnersContext = useContext(SpinnerContext);
    const { HideSpinner } = SpinnersContext;

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
            console.log("Error al obtener las denuncias: "+error);
        }
        await HideSpinner();
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
    //* Inicializar denuncia
    const InitDenunciation = () => {
        dispatch({
            type: INIT_DENUNCIATION
        });
    }
    //*Cambiar a falso variable editDen
    const DisableEditDen = () => {
        dispatch({
            type: DISABLE_EDIT_DENUNCIATION
        });
    }

    return(
        <DenunciationContext.Provider
            value={{
                denunciation: state.denunciation,
                denunciations: state.denunciations,
                editDen: state.editDen,
                GetDenunciations,
                AddDenunciation,
                UpdateDenunciation,
                EditDenunciation,
                InitDenunciation,
                DisableEditDen
            }}
        >
            {props.children}
        </DenunciationContext.Provider>
    );
}

export default DenunciationState;