import { 
    READ_CSV
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case READ_CSV:
            return{
                ...state,
                housesCsv: action.payload
            };
        default:
            return state;
    }
}