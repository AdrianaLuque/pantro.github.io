import { 
    GET_DENUNCIATIONS,
    ADD_DENUNCIATION,
    UPDATE_DENUNCIATION
} from '../../types';

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
                denunciation : action.payload
            };
        default:
            return state;
    }
}