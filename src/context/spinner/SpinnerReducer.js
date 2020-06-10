import { 
    CHANGE_SPINNER
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case CHANGE_SPINNER:
            return{
                spinner: !state.spinner
            }
        default:
            return state;
    }
}