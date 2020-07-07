import { 
    LOGIN_INTO,
    LOGIN_ERROR,
    LOGIN_END
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case LOGIN_INTO:
            //localStorage.setItem('token', action.payload.token);
            return{
                ...state,
                authenticated: true,
                user: action.payload,
                message: null,
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
                message: action.payload,
                cargando: false
            }
        default:
            return state;
    }
}