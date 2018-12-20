import { 
    FETCH_STORE, 
    FETCH_STORE_SUCCESS, 
    FETCH_STORE_FAILURE, 
    END_FETCH_STORE, 
    SET_STORE, 
    DESTROY_STORE,
    DESTROY_FETCH_STORE 
} from '../constants'
const initialState = {
    stores    : [],
    store     : null,
    isFetching: false,
    error     : false,
    ended     : false
}

export default function storeReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_STORE: 
            return {...state, isFetching: true}
        case FETCH_STORE_SUCCESS: 
            var   stores     = action.stores
            const newRecords = state.stores
            stores.forEach(item => {
                newRecords.push(item)
            })
            return {...state, isFetching: false, stores: newRecords}
        case END_FETCH_STORE: 
            return {...state, isFetching: false, ended: true}
        case SET_STORE: 
            return {...state, store: action.store}
        case DESTROY_STORE: 
            return {...state, store: null}
        case FETCH_STORE_FAILURE: 
            return {...state, isFetching: false, error: true}
        case DESTROY_FETCH_STORE: 
        console.log(initialState)
            return {...state, stores: [], isFetching: false, error: false, ended:false }
        default: 
            return state 
    }
}