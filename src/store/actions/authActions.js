import API from '../../services/api'
import { AsyncStorage } from 'react-native'

export const _login = (data) => {
	return {
		type : 'LOGIN',
		token: data
	}
}

export const _setToken = (token) => {
	return {
		type : 'SET_TOKEN',
		token: token
	}
}
export const _logout = () => {
	return {
		type: 'LOGOUT'
	}
}

export const _checkAuth = (data) => {
	return {
		type: 'CHECK_AUTH',
		data: data
	}
}

const _setUser = (data) => {
	return {
		type: 'SET_USER',
		user: data
	}
}

export const signup = (username, password) => {
    return (dispatch) => {
    };
};

export const login = (token) => {
	return (dispatch) => {
		dispatch(_login(token))
		dispatch(getAuth())
	}
}

export const logout = () => {
	return (dispatch) => {
		AsyncStorage.multiRemove(['token', 'expires_in'])
        dispatch(_logout())
	}
}

export function getAuth() {
    return (dispatch, getState) => {
		API.post('http://192.168.1.8:8082/api/auth/df', {}, {withCredentials: true}).then(response => {
			if(response.status === 200) {
				dispatch(_setUser(response.data.data))
			}
		}).catch(error => {
			dispatch(_logout())
		})
    }
}
