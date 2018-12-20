import { 
    FETCH_CITIES,
    GET_CURRENT_CITY
} from '../constants'

const initialState = {
    currentCity: {},
    cities     : []
}

export default function cityReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_CITIES: 
            return {...state, cities: action.cities}
        case GET_CURRENT_CITY: 
            return {...state, currentCity: action.city}
        default: 
            return state 
    }
}