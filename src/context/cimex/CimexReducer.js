import { 
    ADD_CIMEX
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case ADD_CIMEX:
            return{
                ...state,
                inspections: [...state.inspections, action.payload]
            };
        default:
            return state;
    }
}