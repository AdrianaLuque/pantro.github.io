import React, {useReducer} from 'react';

import SpinnerContext from './SpinnerContext';
import SpinnerReducer from './SpinnerReducer';
import { 
    CHANGE_SPINNER
} from '../../types';

const SpinnerState = props => {
    
    const initialState = {
        spinner: false
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(SpinnerReducer, initialState);

    //Funciones
    const ChangeSpinner = () => {
        dispatch({
            type: CHANGE_SPINNER
        });
    }

    return(
        <SpinnerContext.Provider
            value={{
                spinner: state.spinner,
                ChangeSpinner
            }}
        >
            {props.children}
        </SpinnerContext.Provider>
    );
}

export default SpinnerState;