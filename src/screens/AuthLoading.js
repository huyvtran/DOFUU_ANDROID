import React, { Component } from 'react'

import {
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';

import {
    Text,
    Spinner 
} from 'native-base'

import { styles, aligns } from '../styles'

class AuthLoading extends Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const { onLogin } = this.props
        const userToken   = await AsyncStorage.getItem('token')
        const cityId      = await AsyncStorage.getItem('flag_c') || 10001
        this._fetchCities()
        this._getCurrentCity(cityId)
        if(userToken) {
          onLogin(userToken)
        }
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };

    _fetchCities = () => {
        const {fetchCities} = this.props
        fetchCities()
    }

    _getCurrentCity = (cityId) => {
        const {getCurrentCity} = this.props
        getCurrentCity(cityId)
    }

    render() {
      console.log('loading auth')
        return (
            <View style={[styles.container, aligns.alignCenter, aligns.justifyCenter]}>
                <Spinner color="grey" />
                <StatusBar barStyle="default" />
            </View>
        )
    }
}

export default AuthLoading
