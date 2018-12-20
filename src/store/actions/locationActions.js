import {
    GET_CURRENT_LOCATION, 
    GET_ADDRESS_PREDICTIONS, 
    TOGGLE_SEARCH_RESULT, 
    GET_SELECTED_ADDRESS,
    GET_DISTANCE_MATRIX,
    CALCULATE_SHIP
} from '../constants'

import RNGooglePlaces from 'react-native-google-places'
import API from '../../services/api';

function _getCurrentLocation(position) {
    return {
        type    : GET_CURRENT_LOCATION,
        position: position
    }
}

function _getAddressPredictions(results) {
    return {
        type       : GET_ADDRESS_PREDICTIONS,
        predictions: results
    }
}

function _getSelectedAddress(results) {
    return {
        type   : GET_SELECTED_ADDRESS,
        payload: results
    }
}

function _getDistanceMatrix(results) {
    return {
        type  : GET_DISTANCE_MATRIX,
        matrix: results
    }
}

function _calculateShip(shipPrice) {
    return {
        type     : CALCULATE_SHIP,
        shipPrice: shipPrice
    }
}

//GET MY LOCATION
export function getCurrentLocation() {
    return (dispatch) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                dispatch(_getCurrentLocation(position))
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }
}

//TOGGLE SEARCH RESULT MODAL
export function toggleSearchResult() {
    return {
        type: TOGGLE_SEARCH_RESULT
    }
}

// GET ADDRESS FROM GOOGLE PLACE
export function getAddressPredictions(userInput) {
    return (dispatch, store) => {
        RNGooglePlaces.getAutocompletePredictions(userInput, {
            latitude : 10.045162,
            longitude: 105.746857,
            radius   : 10,
            country  : "VN"
        }).then((results) => {
            console.log('result', results)
            dispatch(_getAddressPredictions(results))
        }).catch((error) => {
            console.log(error.message)
        })
    }
}

// GET SELECTED ADDRESS
export function getSelectedAddress(payload) {
    return (dispatch, getState) => {
        RNGooglePlaces.lookUpPlaceByID(payload).then((results) => {
            dispatch(_getSelectedAddress(results))
        }).catch((error) => {
            console.log(error.message)
        })
    }
}

export function getDistanceMatrix() {
    return (dispatch, getState) => {
        const start = getState().store.store
        // const start             = {lat: 10.028322, lng: 105.777388}
        const destination       = getState().location.destinationLocation
        const formatStart       = start.lat+','+start.lng
        const formatDestination = destination.latitude+","+destination.longitude
        const params            = {
            origins     : formatStart,
            destinations: formatDestination,
            mode        : 'driving',
            key         : 'AIzaSyDcgdQrZHE-lpVIYSCQc7vEfAAL9HvZk0Q'
        }
        API.get('https://maps.googleapis.com/maps/api/distancematrix/json', 
            {params}
        ).then(response => {
            dispatch(_getDistanceMatrix(response.data))
            dispatch(calculateShip())
        })
    }
}

export function calculateShip() {
    return (dispatch, getState) => {
        const service    = getState().city.currentCity.service
        const deliveries = getState().city.currentCity.deliveries
        const distance   = parseFloat(getState().location.matrix.distance.text.split(' ')[0])
        const unit       = 1000
        var   shipPrice  = 0
        const user       = getState().auth.user
   
        deliveries.forEach(item => {
            if(item.from <= distance && item.to >= distance && service.minRange >= distance) {
                if(user.freeShip) {
                    shipPrice = 0
                } else {
                    shipPrice = parseFloat(item.price)
                }
            } else if(item.from <= distance && item.to >= distance && service.maxRange >= distance && service.minRange <= distance) {
                shipPrice = Math.round(parseFloat(item.price)*distance/unit)*unit
            }
        })
        dispatch(_calculateShip(shipPrice))
    }
}