const initialState = {
	routeName: '',
	index    : 0,
	show     : false,
	type     : 'success',
	message  : '',
	close    : false,
}

export default function alertReducer(state = initialState, action) {
	switch(action.type) {
		case 'SHOW_ALERT': 
			return {...state, close: action.alert.close, routeName: action.alert.routeName, index: action.alert.index, show: true, type: action.alert.type, message: action.alert.message}
		case 'CLOSE_ALERT': 
			return {...state, close: false, routeName: '', index: 0, show: false, type: 'success', message: ''}
		default: 
			return state
	}
}