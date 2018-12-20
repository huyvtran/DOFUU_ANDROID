import { Dimensions } from 'react-native'

import { 
    GET_CURRENT_LOCATION,
    GET_ADDRESS_PREDICTIONS, 
    TOGGLE_SEARCH_RESULT, 
    GET_SELECTED_ADDRESS,
    GET_DISTANCE_MATRIX,
    CALCULATE_SHIP
} from '../constants'

const {width, height} = Dimensions.get('window')
const ASPECT_RATION   = width/height
const LATITUDE_DELTA  = 0.0922
const LONGITUDE_DELTA = ASPECT_RATION*LATITUDE_DELTA

const initialState = {
    myLocation         : {},
    predictions        : [],
    modalSearch        : false,
    modalHistory       : true,
    selectedAddress    : {},
    destinationLocation: {},
    destinationAddress : '',
    matrix             : {},
    shipPrice          : 0
}

export default function cartReducer(state = initialState, action) {
    switch(action.type) {
        case GET_CURRENT_LOCATION: 
            return {...state, 
                myLocation : {
                    latitude      : action.position.coords.latitude,
                    longitude     : action.position.coords.longitude,
                    latitudeDelta : LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                }, 
                destinationLocation : {
                    latitude      : action.position.coords.latitude,
                    longitude     : action.position.coords.longitude,
                    latitudeDelta : LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                }
            }
        case TOGGLE_SEARCH_RESULT: 
            return {...state, modalSearch: true, modalHistory: false}
        case GET_ADDRESS_PREDICTIONS: 
            return {...state, predictions: action.predictions}
        case GET_DISTANCE_MATRIX: 
            return {...state, matrix: action.matrix.rows[0].elements[0], destinationAddress: action.matrix.destination_addresses[0].slice(0, -9) }
        case GET_SELECTED_ADDRESS: 
            return {...state, 
                selectedAddress: {
                    address : action.payload.address.slice(0, -9),
                    location: {
                        latitude      : action.payload.latitude,
                        longitude     : action.payload.longitude,
                        latitudeDelta : LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA
                    }                
                }, 
                destinationAddress : action.payload.address.slice(0, -9),
                destinationLocation: {
                    latitude      : action.payload.latitude,
                    longitude     : action.payload.longitude,
                    latitudeDelta : LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                },
                predictions: []
            }
        case CALCULATE_SHIP: 
            return {...state,
                    shipPrice: action.shipPrice
                }
        default: 
            return state 
    }
}