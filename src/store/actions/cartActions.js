import { 
    FETCH_ALL_CART, 
    FETCH_CART, 
    ADD_CART, 
    MINUS_CART, 
    DESTROY_CART, 
    UPDATE_CART, 
    OPEN_CHECKOUT, 
    CLOSE_CHECKOUT, 
    OPEN_CART, 
    CLOSE_CART
} from '../constants'
import { AsyncStorage } from 'react-native'

function _openCheckout(cart) {
    return {
        type: OPEN_CHECKOUT,
        cart: cart
    }
}

function _closeCheckout() {
    return {
        type: CLOSE_CHECKOUT
    }
}

function _openCart() {
    return {
        type: OPEN_CART
    }
}

function _closeCart() {
    return {
        type: CLOSE_CART
    }
}

function _fetchCart(data) {
    return {
        type: FETCH_CART,
        data: data
    }
}

function _fetchAllCart(carts) {
    return {
        type: FETCH_ALL_CART,
        data: carts
    }
}

function _updateCart(index, cart) {
    return {
        type : UPDATE_CART,
        index: index,
        cart : cart,
    }
}

function _addCart(cart) {
    return {
        type: ADD_CART,
        cart: cart
    }
}

function _minusCart(data) {
    return {
        type: MINUS_CART,
        cart: data
    }
}

function _destroyCart() {
    return {
        type: DESTROY_CART
    }
}

export function openCheckout(cart) {
    return (dispatch) => {
        dispatch(_openCheckout(cart))
    }
}

export function closeCheckout() {
    return (dispatch) => {
        dispatch(_closeCheckout())
    }
}

export function openCart() {
    return (dispatch) => {
        dispatch(_openCart())
    }
}

export function closeCart() {
    return (dispatch) => {
        dispatch(_closeCart())
    }
}

export function fetchAllCart() {
    return async (dispatch) => {
        var storage = await AsyncStorage.getItem('carts')
        var carts   = JSON.parse(storage)
        if(carts) {
            dispatch(_fetchAllCart(carts))
        }
    }
}

export function updateCart(payload) {
    return (dispatch, getState) => {
        const cartIndex = getState().cart.carts.findIndex(cart => cart.instance === payload.instance)
        if(cartIndex > -1) {
            console.log('payload', payload)    
            dispatch(_updateCart(cartIndex, payload))
            AsyncStorage.setItem('carts', JSON.stringify(getState().cart.carts))
        }
    }
}


export function fetchCartFromStorage(store) {
    return async (dispatch) => {      
        //GET CART IN STORAGE
        var storage = await AsyncStorage.getItem('carts')
        //CONVERT TO JSON
        var carts = JSON.parse(storage)
        var cart  = null
        var array = []
        //IF CARTS EXIST 
        if(carts) {
            //FIND CART IN CARTS
            cart = carts.find(cart => cart.instance === store.id)
            // !EXIST 
            if(!cart) {
                cart = { instance: store.id, store: store, items: [] }
                carts.push(cart)
                await AsyncStorage.setItem('carts', JSON.stringify(carts))  
            }
        } else {
            cart = Object.assign({}, { instance: store.id, store: store, items: [] })
            array.push(cart)
            carts = array
            await AsyncStorage.setItem('carts', JSON.stringify(carts))  
        }
        console.log(carts)
        dispatch(_fetchCart({carts:carts, cart: cart}))
    }
}

export function addToCart(payload) {
    return (dispatch, getState) => {
        console.log('add to cart')
        var   cart         = getState().cart.cart
        const productIndex = cart.items.findIndex(item => {
            return item.rowId === payload.rowId
        })
        console.log('idx', productIndex)
        if(productIndex > -1) {
            //CHƯA XONG
            dispatch(_updateCart({index: productIndex, product: payload}))
        } else {
            cart.items.push(payload)
            dispatch(_addCart(cart))
        }
        AsyncStorage.setItem('carts', JSON.stringify(getState().cart.carts))        
    }
}



export function minusFromCart(payload) {
    return (dispatch) => {
        dispatch(minusCart(payload))
    }
}

export function defaultCart() {
    return (dispatch) => {
        dispatch(destroyCart())
    }
}

export function updateToCarts(cart) {

}