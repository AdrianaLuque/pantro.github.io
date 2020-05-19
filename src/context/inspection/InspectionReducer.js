import { 
    GET_INSPECTIONS,
    ADD_INSPECTION
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case GET_INSPECTIONS:
            return{
                ...state,
                inspections: action.payload
            };
        case ADD_INSPECTION:
            return{
                ...state,
                inspections: [...state.inspections, action.payload]
            };
        default:
            return state;
    }
}