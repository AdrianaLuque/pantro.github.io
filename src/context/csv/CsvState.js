import React, {useReducer} from 'react';
import * as d3 from 'd3';

import CsvContext from './CsvContext';
import CsvReducer from './CsvReducer';
import { 
    CSV_HOUSES,
    CSV_PARTICIPANTS_INMUNE,
    CSV_HEALTH_POSTS
} from '../../types';

const CsvState = props => {
    
    const initialState = {
        houses: [],
        participantsInmune: [],
        healthPosts: []
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(CsvReducer, initialState);

    //Funciones
    const CsvHouses = async () => {
        //d3.csv(fileCsv, function(data) { console.log(data); });
        //Obtener CSV
        const fileCsv= "test2";
        const pathCsv = require('../../catchment-area/' + fileCsv + '.csv');
        
        try {
          const results = await d3.csv(pathCsv);
          
            dispatch({
                type: CSV_HOUSES,
                payload: results
            });
            
        } catch (error) {
            console.log(error);
        }
    };
          
    const CsvParticipantsInmune = async () => {
        //Obtener CSV
        const fileCsv= "registro_participantes_inmune";
        const pathCsv = require('../../files/' + fileCsv + '.csv');
                
        try {
          const results = await d3.csv(pathCsv);
          
            dispatch({
                type: CSV_PARTICIPANTS_INMUNE,
                payload: results
            });
            
        } catch (error) {
            console.log(error);
        }
    };

    const CsvHealthPosts = async () => {
        //Obtener CSV
        const fileCsv= "PUESTOS DE SALUD AQP_modificado_06022020";
        const pathCsv = require('../../files/' + fileCsv + '.csv');
                
        try {
          const results = await d3.csv(pathCsv);
          
            dispatch({
                type: CSV_HEALTH_POSTS,
                payload: results
            });
            
        } catch (error) {
            console.log(error);
        }
    };

    return(
        <CsvContext.Provider
            value={{
                houses: state.houses,
                participantsInmune: state.participantsInmune,
                healthPosts: state.healthPosts,
                CsvHouses,
                CsvParticipantsInmune,
                CsvHealthPosts
            }}
        >
            {props.children}
        </CsvContext.Provider>
    );
}

export default CsvState;