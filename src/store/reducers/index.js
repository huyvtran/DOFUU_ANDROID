import { combineReducers } from 'redux'
import {reducer as formReducer } from 'redux-form'

import auth from './auth'
import alert from './alert'
import cart from './cart'
import city from './city'
import store from './store'
import location from './location'

export default rootReducer =  combineReducers({
	form: formReducer,
	alert,
	auth,
	cart,
	city,
	store,
	location
})

