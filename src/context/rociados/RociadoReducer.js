import {
    BTN_ROC, 
    BTN_ADD_ROCIADO, 
    ADD_ROCIADO, 
    DISABLED_BTN_ADD_ROCIADO,
    GET_ROCIADOS
}from '../../types';

export default (state, action) => {
    switch(action.type) {
        case BTN_ROC:
            return{
                ...state,
                statusBtnRoc:true
            }
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
        case GET_ROCIADOS:
            return{
                ...state,
                rociados: action.payload
            };
        
        default:
            return state;
    }
}