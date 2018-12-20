import React, { Component } from 'react'

import { createStackNavigator, createMaterialTopTabNavigator, createSwitchNavigator } from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import AuthLoadingContainer from '../containers/AuthLoadingContainer'
import LoginContainer from '../containers/credentials/LoginContainer'
import RegisterContainer from '../containers/credentials/RegisterContainer'
import HomeContainer from '../containers/bottomtabs/HomeContainer'
import TypeContainer from '../containers/TypeContainer'
import ProfileContainer from '../containers/bottomtabs/ProfileContainer'
import MenuContainer from '../containers/storedetails/MenuContainer'
import CheckoutContainer from '../containers/CheckoutContainer'
import LocationContainer from '../containers/LocationContainer'
import LocatingContainer from '../containers/LocatingContainer'


import SearchScreen from '../screens/Search'

const TestStack = createStackNavigator({
    Location: LocationContainer,
    Checkout: CheckoutContainer,
    Locating: LocatingContainer
}, 
{
    navigationOptions: {
        header    : null,
        headerLeft: null
    },
    initialRouteName: 'Checkout',
})


const CredentialTabNavigator = createMaterialBottomTabNavigator({
    Login   : LoginContainer,
    Register: RegisterContainer
}, 
{
    initialRouteName: 'Login',
    activeTintColor : '#B71C1C',
    barStyle        : { backgroundColor: 'white' },
    shifting        : true
})

const AppStack = createMaterialBottomTabNavigator({
    Home   : HomeContainer,
    Profile: ProfileContainer,

},{
    initialRouteName: 'Home',
    activeTintColor : '#B71C1C',
    barStyle        : { backgroundColor: 'white' },
    shifting        : true
});

const RootStack = createStackNavigator({
    Home       : AppStack,
    Type       : TypeContainer,
    StoreDetail: MenuContainer,
    Location   : LocationContainer,
    Checkout   : CheckoutContainer,
    Locating   : LocatingContainer
}, 
{
    navigationOptions: {
        header    : null,
        headerLeft: null
    },
    initialRouteName: 'Home',
})

const Root = createSwitchNavigator(
    {
        AuthLoading: AuthLoadingContainer,
        App        : RootStack,
        Auth       : CredentialTabNavigator,
    },
    {
        initialRouteName: 'AuthLoading',
    }
  );

export default Root
// export default TestStack