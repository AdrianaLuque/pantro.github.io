import { 
    GET_DENUNCIATIONS,
    ADD_DENUNCIATION,
    UPDATE_DENUNCIATION,
    INIT_DENUNCIATION,
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
                denunciations: [...state.denunciations, action.payload]
            };
        case UPDATE_DENUNCIATION:
            return{
                ...state,
                denunciation : action.payload,
                editDen: true

            };
        case INIT_DENUNCIATION:
            return{
                ...state,
                denunciation: initDenunciation
            };
        case DISABLE_EDIT_DENUNCIATION:
            return{
                ...state,
                editDen: false

            };

        default:
            return state;
    }
}