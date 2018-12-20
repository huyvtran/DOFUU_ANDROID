import { AsyncStorage } from 'react-native';

const deviceStorage = {
    async saveItem(key, value) {
	    try {
	      	await AsyncStorage.setItem(key, value);
	    } catch (error) {

	    }
	},

	async getItem(key) {
	    try {
	      const value = await AsyncStorage.getItem(key);
	      return value
	    } catch (error) {
	    
	    }
	},

	async removeItem(key) {
	    try{
	    	await AsyncStorage.removeItem(key)
	    } catch (error) {
	    
	    }
	}
};

export default deviceStorage;