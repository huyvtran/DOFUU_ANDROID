const initialState = {
    isLoggedIn: false,
    user      : null,
    token     : null,
    loading   : false
}

export default function authReducer(state = initialState, action) {
	switch(action.type) {
		case 'LOGIN': 
			return Object.assign({}, state, {isLoggedIn: true, token: action.token})
		case 'SET_USER': 
			return {...state, user: action.user}
		case 'AUTH_LOADING': 
			return {...state, loading: !state.loading}
		case 'LOGOUT': 
			return Object.assign({}, state, {isLoggedIn: false, token: null, user: null})
		default: 
			return state
	}
}