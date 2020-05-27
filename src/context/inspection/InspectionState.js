import React, {useReducer, useContext} from 'react';
import ClienteAxios from "../../config/axios";

import InspectionContext from './InspectionContext';
import InspectionReducer from './InspectionReducer';
import { 
    GET_INSPECTIONS,
    ADD_INSPECTION
} from '../../types';
import CsvContext from "../csv/CsvContext";

const InspectionState = props => {
    
    const initialState = {
        inspection: {
            den_id_custom: '',
            den_fecha_recepcion: new Date(),
            den_medio: '',
            den_agente_nombre:'',
            den_tipo: '',
            den_insecto: '',
            den_insecto_otro:'',
            den_habitante_nombre:'',
            den_habitante_telefono1:'',
            den_otro_telefono:false,
            den_habitante_telefono2:'',
            den_provincia: "",
            den_distrito:'',
            den_localidad:'',
            den_direccion:'',
            den_referencia:'',
            den_fecha_probable_inspeccion: null
        },
        inspections: []
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(InspectionReducer, initialState);

    //Obtener viviendas
    const CsvsContext = useContext(CsvContext);
    const { houses } = CsvsContext;

    //FUNCIONES
    //* Obtener denuncias
    const GetInspections = async () => {

        //Obteniendo los codigos de localidad unicos
        //const codeLoc = [...new Set(houses.map(house => house.codeLoc))];
        //console.log(aux);
        console.log("ingreso GetInspections");
        
        try {
            const resultado = await ClienteAxios.get('/api/inspecciones');

            dispatch({
                type: GET_INSPECTIONS,
                payload: resultado.data
            });
            
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
                GetInspections,
                AddInspection
            }}
        >
            {props.children}
        </InspectionContext.Provider>
    );
}

export default InspectionState;