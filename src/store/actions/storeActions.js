import { 
    FETCH_STORE, 
    FETCH_STORE_SUCCESS, 
    FETCH_STORE_FAILURE, 
    END_FETCH_STORE, 
    SET_STORE, 
    DESTROY_STORE,
    DESTROY_FETCH_STORE 
} from '../constants'

import API from '../../services/api'

function _fetchStore() {
    return {
        type: FETCH_STORE
    }
}

function _fetchStoreSuccess(data) {
    return {
        type  : FETCH_STORE_SUCCESS,
        stores: data.stores
    }
}

function _endFetchStore() {   
    return {
        type: END_FETCH_STORE
    }
}

export const setStore = (store) => {
    return {
        type : SET_STORE,
        store: store
    }
}

export const destroyStore = () => {
    return {
        type: DESTROY_STORE
    }
}

function _getStoreFailure() {
    return {
        type: FETCH_STORE_FAILURE
    }
}

function destroyFetchStore() {
    return {
        type: DESTROY_FETCH_STORE
    }
}

export function fetchStoreFromAPI(payload) {
    return (dispatch, getState) => {
        if(!getState().store.isFetching && !getState().store.ended) {
            dispatch(_fetchStore())
            const url  = `/Store/FetchStoresByType`
            const data = {cityId: getState().city.currentCity.id, offset: payload.stores.length, typeId: payload.typeId}
            setTimeout(() => {
                API.post(url, data, { withCredentials:true }).then(response => {
                   
                    if(response.status === 200) {
                        if(response.data.stores.length>0) {                     
                            dispatch(_fetchStoreSuccess(response.data))
                        } else {
                            dispatch(_endFetchStore())
                        }
                    }
                }).catch(error => {
                    dispatch(_getStoreFailure())
                })
            }, 50)            
        }
    }
}


export function defaultStore() {
    return (dispatch) => {
        dispatch(destroyFetchStore())
    }
}