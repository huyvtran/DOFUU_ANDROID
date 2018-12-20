import { 
    FETCH_CITIES,
    GET_CURRENT_CITY
} from '../constants'

import API from '../../services/api'

function _fetchCities(cities) {
    return {
        type  : FETCH_CITIES,
        cities: cities
    }
}

function _getCurrentCity(city) {
    return {
        type: GET_CURRENT_CITY,
        city: city
    }
}

export function fetchCities() {
    return (dispatch) => {
        const url    = `/City/FetchAllCities`
        var   data   = {}
        var   params = {}
        API.post(url, data, {params, withCredentials: true}).then(response => {
            if(response.status === 200) {
                dispatch(_fetchCities(response.data.cities))
            }
        })
    }
}

export function getCurrentCity(cityId) {
    return (dispatch, getState) => {
        const url    = `/City/${cityId}/ShowCity`
        var   data   = {}
        var   params = {}
        API.post(url, data, {params, withCredentials: true}).then(response => {
            if(response.status === 200) {
                dispatch(_getCurrentCity(response.data.city))
            }
        })
    }
}