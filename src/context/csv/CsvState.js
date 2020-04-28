import React, {useReducer} from 'react';
import * as d3 from 'd3';

import CsvContext from './CsvContext';
import CsvReducer from './CsvReducer';
import { 
    READ_CSV
} from '../../types';

const CsvState = props => {
    
    const initialState = {
        housesCsv: []
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(CsvReducer, initialState);

    //Funciones
    const ReadCsv = async () => {
        //d3.csv(fileCsv, function(data) { console.log(data); });
        //Obtener CSV
        const fileCsv= "test";
        const pathCsv = require('../../catchment-area/' + fileCsv + '.csv');
        
        try {
            const results = await d3.csv(pathCsv);
            //console.log(results); //Aqui veo los objetos

            dispatch({
                type: READ_CSV,
                payload: results
            });
            
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <CsvContext.Provider
            value={{
                housesCsv: state.housesCsv,
                ReadCsv
            }}
        >
            {props.children}
        </CsvContext.Provider>
    );
}

export default CsvState;