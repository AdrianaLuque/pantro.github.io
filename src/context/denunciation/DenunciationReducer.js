import { 
    GET_DENUNCIATION
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case GET_DENUNCIATION:
            return{
                denunciations: action.payload
        };
        default:
            return state;
    }
}