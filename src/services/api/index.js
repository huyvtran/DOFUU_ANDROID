import axios from 'axios'
import { AsyncStorage } from 'react-native'


axios.defaults.baseURL = `http://192.168.1.8:8082/api/m`;
// axios.create({
// 	  baseURL: `https://www.dofuu.com/api/m`
// });

axios.interceptors.request.use(async (config) => {
	config.headers.common        = {'Accept' : 'application/json', 'X-Requested-With' : 'XMLHttpRequest'}
	config.headers.Authorization = `Bearer `+ await AsyncStorage.getItem('token')
	return config
})

axios.interceptors.response.use(async (response) => {
	const token = response.headers['Authorization'] || response.data['token']
	token && await AsyncStorage.setItem('token', token)
	return response
}, async function (error) {

	if(error.response.status === 401) {
		await AsyncStorage.removeItem('token');
	}

	return Promise.reject(error);
})

export default axios
