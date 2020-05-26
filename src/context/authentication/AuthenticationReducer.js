import { 
    LOGIN_EXIT,
    LOGIN_ERROR,
    LOGIN_END
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case LOGIN_EXIT:
            //localStorage.setItem('token', action.payload.token);
            return{
                ...state,
                authenticated: true,
                user: action.payload,
                mensaje: null,
                cargando: false
            }
        case LOGIN_ERROR:
        case LOGIN_END:
            //localStorage.removeItem('token');
            return{
                ...state,
                //token: null,
                user: {},
                authenticated: null,
                //mensaje: action.payload,
                cargando: false
            }
        default:
            return state;
    }
}