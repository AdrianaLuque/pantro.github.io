import { 
    SHOW_SPINNER,
    HIDE_SPINNER
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case SHOW_SPINNER:
            return{
                spinner: true
            }
        case HIDE_SPINNER:
            return{
                spinner: false
            }
        default:
            return state;
    }
}