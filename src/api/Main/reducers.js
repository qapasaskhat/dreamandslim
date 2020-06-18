import {
    FETCH_BEGIN,
    FETCH_ERROR,
    FETCH_SUCCESS,
} from './actions'

const initianState = {
    items: {},
    loading: false,
    error: null,
}

export default function fetchApi(state = initianState,action){
    switch(action.type){
        case FETCH_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FETCH_SUCCESS:
            return{
                ...state,
                loading: false,
                items: action.payload.items,
            }
        case FETCH_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload.error,
                items:{}
            }
        default:
            return state
    }
}