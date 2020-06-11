import React, {useReducer} from 'react';

import SpinnerContext from './SpinnerContext';
import SpinnerReducer from './SpinnerReducer';
import { 
    SHOW_SPINNER,
    HIDE_SPINNER
} from '../../types';

const SpinnerState = props => {
    
    const initialState = {
        spinner: false
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(SpinnerReducer, initialState);

    //Funciones
    const ShowSpinner = () => {
        dispatch({
            type: SHOW_SPINNER
        });
    }
    const HideSpinner = () => {
        dispatch({
            type: HIDE_SPINNER
        });
    }

    return(
        <SpinnerContext.Provider
            value={{
                spinner: state.spinner,
                ShowSpinner,
                HideSpinner
            }}
        >
            {props.children}
        </SpinnerContext.Provider>
    );
}

export default SpinnerState;