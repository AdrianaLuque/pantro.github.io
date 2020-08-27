import {
    BTN_ADD_ROCIADO, ADD_ROCIADO, DISABLED_BTN_ADD_ROCIADO
}from '../../types';

export default (state, action) => {
    switch(action.type) {
        case BTN_ADD_ROCIADO:
            return{
                ...state,
                statusBtnAddRoc:true
            };
        case DISABLED_BTN_ADD_ROCIADO:
            return{
                ...state,
                statusBtnAddRoc:false
            };
        case ADD_ROCIADO:
            return{
                //Aca no cargaria lo del payload, porque no le veo motivo de guardarlo en un array
                ...state,
                statusBtnAddRoc:false
            };
        
        default:
            return state;
    }
}