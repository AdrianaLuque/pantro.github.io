import { 
    CSV_HOUSES,
    CSV_PARTICIPANTS_INMUNE,
    CSV_HEALTH_POSTS,
    UPDATE_HOUSES
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case CSV_HOUSES:
            return{
                ...state,
                houses: state.houses.concat(action.payload)
            };
        case CSV_PARTICIPANTS_INMUNE:
            return{
                ...state,
                participantsInmune: action.payload
            };
        case CSV_HEALTH_POSTS:
            return{
                ...state,
                healthPosts: action.payload
            };
        case UPDATE_HOUSES:
            return{
                ...state,
                houses: action.payload
            };
        default:
            return state;
    }
}