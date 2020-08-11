import React , {useReducer} from 'react';

//Importar archivos de context
import RociadoContext from './RociadoContext';
import RociadoReducer from './RociadoReducer';

//Importar de type
import { BTN_ADD_ROCIADO } from '../../types';


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

    return (
        
        <RociadoContext.Provider
            value = {{
                statusBtnAddRoc : state.statusBtnAddRoc,
                PressBtnAddRoc
            }}
        >
            {props.children}
        </RociadoContext.Provider>
    )
}

export default RociadoState;