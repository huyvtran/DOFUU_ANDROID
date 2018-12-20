import { 
    FETCH_ALL_CART, 
    FETCH_CART, ADD_CART, 
    MINUS_CART, DESTROY_CART, 
    UPDATE_CART, OPEN_CHECKOUT, 
    CLOSE_CHECKOUT, 
    OPEN_CART, 
    CLOSE_CART 
} from '../constants'

const initialState = {
    carts         : [],
    cart          : null,
    checkoutDialog: false,
    isFetching    : false,
    error         : false,
    cartDialog    : false
}

export default function cartReducer(state = initialState, action) {
    switch(action.type) {
        case OPEN_CHECKOUT: 
            return {...state, checkoutDialog: true, cart: action.cart}
        case CLOSE_CHECKOUT: 
            return {...state, checkoutDialog: false, cart: null}
        case OPEN_CART: 
            return {...state, cartDialog: true}
        case CLOSE_CART: 
            return {...state, cartDialog: false}
        case FETCH_ALL_CART: 
            return {...state, carts: action.data}
        case FETCH_CART: 
            return {...state, carts: action.data.carts, cart: action.data.cart}
        case ADD_CART: 
            return {...state, cart: action.cart}
        case MINUS_CART: 
            return {...state, carts: carts, cart: cart}
        case UPDATE_CART:   //DONT CHANGE
            var carts = Object.assign(state.carts[action.index], action.cart)
            return {...state, carts: state.carts}
        case DESTROY_CART: 
            return {...state, cart: null}
        default: 
            return state 
    }
}