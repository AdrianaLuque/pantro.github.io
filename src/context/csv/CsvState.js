import React, { useReducer} from 'react';
import * as d3 from 'd3';

import CsvContext from './CsvContext';
import CsvReducer from './CsvReducer';
import { 
    CSV_HOUSES,
    CSV_PARTICIPANTS_INMUNE,
    CSV_HEALTH_POSTS,
    UPDATE_HOUSES,
    CSV_CLEAN
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
    const CsvHouses = async (fileCsv, usuApp) => {
        
        if (Object.keys(fileCsv).length !== 0) {
            const arrayFileCsv = fileCsv.split('&');
            for (let i = 0; i < arrayFileCsv.length; i++) {
                //Obtener CSV
                let pathCsv = require('../../catchment-area/' + arrayFileCsv[i] + '.csv');
                
                try {
                    let results = await d3.csv(pathCsv);
                    
                    let newResults = [];
                    results.forEach(house => {
                      //Eliminando viviendas que no tienen GPS
                      if(house.LATITUDE !== null && house.LATITUDE !== "" && house.LATITUDE !== "NA"){
                        //Obtener solo las columna que necesitamos dependiendo del app que toca
                        if ("vectorpoint"=== usuApp )
                            newResults.push( (({ UNICODE, LATITUDE, LONGITUDE, color }) => ({ UNICODE, LATITUDE, LONGITUDE, color }))(house) );
                        else if ("bluepoint"=== usuApp )
                            newResults.push( (({ UNICODE, LATITUDE, LONGITUDE, group_num, order, color }) => ({ UNICODE, LATITUDE, LONGITUDE, group_num, order, color }))(house) );
                      }
                    });
                                     
                    //Lo hago asi para que me diga si hay algun error al leer cada archivo CSV
                    dispatch({
                        type: CSV_HOUSES,
                        payload: newResults
                    });
                    
                } catch (error) {
                    console.log(error);
                }
            }
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
    
    const UpdateHouses = async (newHouses) => {
        //Obtener CSV
        dispatch({
            type: UPDATE_HOUSES,
            payload: newHouses
        });
    };

    const CsvClean = () => {
        dispatch({
            type: CSV_CLEAN
        });
    }

    return(
        <CsvContext.Provider
            value={{
                houses: state.houses,
                participantsInmune: state.participantsInmune,
                healthPosts: state.healthPosts,
                CsvHouses,
                CsvParticipantsInmune,
                CsvHealthPosts,
                UpdateHouses,
                CsvClean
            }}
        >
            {props.children}
        </CsvContext.Provider>
    );
}

export default CsvState;