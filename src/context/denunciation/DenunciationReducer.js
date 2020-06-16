import { 
    GET_DENUNCIATIONS,
    ADD_DENUNCIATION,
    UPDATE_DENUNCIATION,
    INIT_DENUNCIATION,
    DISABLE_EDIT_DENUNCIATION
} from '../../types';

const initDenunciation = {
    den_id_custom: 'DEN-XXXXXX',
    usu_cuenta: '',
    usu_microred: '',
    den_fecha_recepcion: new Date(),
    den_medio: '',
    den_agente_nombre:'',
    den_tipo: '',
    den_insecto: '',
    den_insecto_otro:'',
    //-falta variable imagen
    den_habitante_nombre:'',
    den_habitante_telefono1:'',
    den_otro_telefono:false,
    den_habitante_telefono2:'',
    den_provincia: '',
    den_distrito:'',
    den_localidad:'',
    den_direccion:'',
    den_referencia:'',
    den_fecha_probable_inspeccion: null
};

export default (state, action) => {
    switch (action.type) {
        case GET_DENUNCIATIONS:
            return{
                ...state,
                denunciations: action.payload
            };
        case ADD_DENUNCIATION:
            return{
                ...state,
                denunciations: [...state.denunciations, action.payload]
            };
        case UPDATE_DENUNCIATION:
            return{
                ...state,
                denunciation : action.payload,
                editDen: true

            };
        case INIT_DENUNCIATION:
            return{
                ...state,
                denunciation: initDenunciation
            };
        case DISABLE_EDIT_DENUNCIATION:
            return{
                ...state,
                editDen: false

            };

        default:
            return state;
    }
}