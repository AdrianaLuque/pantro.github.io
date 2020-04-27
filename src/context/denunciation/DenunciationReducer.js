import { 
    GET_DENUNCIATIONS,
    ADD_DENUNCIATION
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case GET_DENUNCIATIONS:
            return{
                denunciations: action.payload
        };
        case ADD_DENUNCIATION:
            return{
                denunciations: [...state.denunciations, action.payload]
        };
        default:
            return state;
    }
}