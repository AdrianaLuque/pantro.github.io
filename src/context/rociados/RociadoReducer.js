import {
    BTN_ADD_ROCIADO
}from '../../types';

export default (state, action) => {
    switch(action.type) {
        case BTN_ADD_ROCIADO:
            return{
                ...state,
                statusBtnAddRoc:true
            }
        
        default:
            return state;
    }
}