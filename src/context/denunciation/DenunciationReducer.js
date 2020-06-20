import { 
    GET_DENUNCIATIONS,
    ADD_DENUNCIATION,
    EDIT_DENUNCIATION,
    UPDATE_DENUNCIATION,
    DISABLE_EDIT_DENUNCIATION
} from '../../types';
import { initDenunciation } from '../../resources';

export default (state, action) => {
    switch (action.type) {
        case GET_DENUNCIATIONS:
            return{
                ...state,
                denunciations: action.payload
            };
        case ADD_DENUNCIATION:
            return{
                ...state,
                denunciations: [...state.denunciations, action.payload],
                valueAddDen : initDenunciation
            };
        case UPDATE_DENUNCIATION:
            return{
                ...state,
                valueEditDen : action.payload,
                boolEdit: true

            };
        case DISABLE_EDIT_DENUNCIATION:
            return{
                ...state,
                boolEdit: false

            };

        default:
            return state;
    }
}