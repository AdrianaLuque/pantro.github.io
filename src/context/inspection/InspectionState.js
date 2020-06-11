import React, { useReducer, useContext } from 'react';
import ClienteAxios from "../../config/axios";

import InspectionContext from './InspectionContext';
import InspectionReducer from './InspectionReducer';
import { 
    GET_INSPECTIONS,
    ADD_INSPECTION
} from '../../types';
import { DateFull } from "../../Functions";
import SpinnerContext from "../spinner/SpinnerContext";

const InspectionState = props => {
    
    const initialState = {
        inspection: {
            user_name: '',
            unicode: '',
            code_locality: '',
            obs_unicode: '',
            obs_text: '',
            fecha: new Date(),
            caract_predio: 'casa_regular',
            tipo_lp: '',
            status_inspeccion: 'C',
            entrevista: '',
            motivo_volver: '',
            fecha_volver: '',
            renuente: 'R1',
            intra_inspeccion: '',
            intra_chiris: '',
            intra_rastros: '',
            peri_inspeccion: '',
            peri_chiris: '',
            peri_rastros: '',
            personas_predio: '',
            cant_perros: '',
            cant_gatos: '',
            cant_aves_corral: '',
            cant_cuyes: '',
            cant_conejos: '',
            text_otros: '',
            cant_otros: '',
            hora_inicio: '',
            hora_fin: '',
            inspection_flag: '',
            predicted_probab: '',
            predicted_probab_mean: '',
            risk_color: '',
            lat: '',
            lng: '',
        },
        inspections: [],
        newInspections: [],
        newHealthPosts: [],
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(InspectionReducer, initialState);
    //Cambiar estado de spinner
    const SpinnersContext = useContext(SpinnerContext);
    const { HideSpinner } = SpinnersContext;

    //FUNCIONES
    //* Obtener denuncias
    const GetInspections = async () => {
                
        try {
            const resultado = await ClienteAxios.get('/api/inspecciones');
            
            dispatch({
                type: GET_INSPECTIONS,
                payload: resultado.data
            });
            await HideSpinner();
            
        } catch (error) {
            console.log(error);
        }
    }

    //* Agregar denuncias
    const AddInspection = async ( denunciation ) => {
        denunciation.den_id = 0;
        
        try {
            const resultado = await ClienteAxios.post('/api/denuncias', denunciation );

            dispatch({
                type: ADD_INSPECTION,
                payload: resultado.data
            });
            
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <InspectionContext.Provider
            value={{
                inspection: state.inspection,
                inspections: state.inspections,
                newInspections: state.newInspections,
                newHealthPosts: state.newHealthPosts,
                GetInspections,
                AddInspection
            }}
        >
            {props.children}
        </InspectionContext.Provider>
    );
}

export default InspectionState;