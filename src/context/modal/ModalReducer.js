import { 
    SHOW_MODAL,
    CLOSE_MODAL
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case SHOW_MODAL:
        case CLOSE_MODAL:
            return{
                modal: !state.modal
            };
        default:
            return state;
    }
}