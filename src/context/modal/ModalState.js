import React, {useReducer} from 'react';

import ModalContext from './ModalContext';
import ModalReducer from './ModalReducer';
import { 
    SHOW_MODAL,
    CLOSE_MODAL
} from '../../types';

const ModalState = props => {
    
    //Inicializacion de variables
    const initialState = {
        modal: false,
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(ModalReducer, initialState);

    //Funciones
    const ShowModal = () => {
        dispatch({
            type: SHOW_MODAL
        });
    };

    const CloseModal = () => {
        dispatch({
            type: CLOSE_MODAL
        });
    };

    return(
        <ModalContext.Provider
            value={{
                //Varianles
                modal: state.modal,
                //Funciones
                ShowModal,
                CloseModal
            }}
        >
            {props.children}
        </ModalContext.Provider>
    );
}

export default ModalState;