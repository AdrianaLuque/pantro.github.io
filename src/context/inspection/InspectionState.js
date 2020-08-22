import React, { useReducer, useContext } from 'react';
import ClienteAxios from "../../config/axios";

import InspectionContext from './InspectionContext';
import InspectionReducer from './InspectionReducer';
import { 
    GET_INSPECTIONS,
    ADD_INSPECTION,
    BTN_INSPECTION
} from '../../types';
import SpinnerContext from "../spinner/SpinnerContext";

const InspectionState = props => {
    
    const initialState = {
        inspections: [],
        newInspections: [],
        newHealthPosts: [],
        inspPasive: false,
        inspActive: false
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
    const AddInspection = async ( inspection ) => {
        debugger;
        try {
            const resultado = await ClienteAxios.post('/api/inspecciones', inspection );
            
            dispatch({
                type: ADD_INSPECTION,
                payload: resultado.data
            });
            
        } catch (error) {
            console.log(error);
        }
    }

    //* Boton presionado
    const PressBtnInspection = (btnName) => {
        dispatch({
            type: BTN_INSPECTION,
            payload: btnName
        });
    }

    return(
        <InspectionContext.Provider
            value={{
                inspection: state.inspection,
                inspections: state.inspections,
                newInspections: state.newInspections,
                newHealthPosts: state.newHealthPosts,
                inspPasive: state.inspPasive,
                inspActive: state.inspActive,
                GetInspections,
                AddInspection,
                PressBtnInspection
            }}
        >
            {props.children}
        </InspectionContext.Provider>
    );
}

export default InspectionState;