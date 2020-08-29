import { 
    GET_DENUNCIATIONS,
    ADD_DENUNCIATION,
    EDIT_DENUNCIATION,
    UPDATE_DENUNCIATION,
    DISABLE_EDIT_DENUNCIATION,
    BTN_ADD_DENUNCIATION,
    BTN_EDIT_DENUNCIATION,
    CLEAN_BTN_DENUNCIATION
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case GET_DENUNCIATIONS:
            return{
                ...state,
                valueEditDen: {},
                denunciations: action.payload,
                selectEdit: false,
                statusBtnAdd: false,
                statusBtnEdit: false

            };
        case ADD_DENUNCIATION:
            return{
                ...state,
                denunciations: [...state.denunciations, action.payload]
            };
        case EDIT_DENUNCIATION:
            return{
                ...state,
                denunciations: state.denunciations.map( denunciation => denunciation.DEN_ID_CUSTOM === action.payload.DEN_ID_CUSTOM ? action.payload : denunciation)
            };
        case UPDATE_DENUNCIATION:
            return{
                ...state,
                valueEditDen : action.payload,
                selectEdit: true
            };
        case DISABLE_EDIT_DENUNCIATION:
            return{
                ...state,
                selectEdit: false,
                statusBtnEdit: false
            };
        case BTN_ADD_DENUNCIATION:
            return {
                ...state,
                statusBtnAdd: true,
                statusBtnEdit: false
            }
        case BTN_EDIT_DENUNCIATION:
            return {
                ...state,
                statusBtnAdd: false,
                statusBtnEdit: true
            }
        case CLEAN_BTN_DENUNCIATION:
            return {
                ...state,
                statusBtnAdd: false,
                statusBtnEdit: false
            }
        default:
            return state;
    }
}