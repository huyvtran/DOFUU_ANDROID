import React, {Component} from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'

import { fetchCartFromStorage, addToCart, setStore, destroyStore, openCart } from '../../store/actions'

import MenuScreen from '../../screens/StoreDetails/Menu'

function mapStateToProps(state) {
	return {
        carts: state.cart.carts,
        cart : state.cart.cart,
        store: state.store.store
	}
}

function mapDispatchToProps(dispatch) {
	return {
		setStore    : (store) => dispatch(setStore(store)),
		destroyStore: () => dispatch(destroyStore()),
		fetchCart   : (store) => dispatch(fetchCartFromStorage(store)),
		addToCart   : (product) => dispatch(addToCart(product)),
		openCart    : () => dispatch(openCart())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen)
