import { 
    GET_INSPECTIONS,
    ADD_INSPECTION,
    BTN_INSPECTION
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
        case BTN_INSPECTION:
            return{
                ...state,
                inspPasive: action.payload==='inspPasive'? true : false,
                inspActive: action.payload==='inspActive'? true : false,
            };
        default:
            return state;
    }
}