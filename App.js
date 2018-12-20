import React, { Component } from 'react';

import {
	YellowBox
} from 'react-native';

YellowBox.ignoreWarnings([
	"Warning: isMounted(...) is deprecated",
	"Module RCTImageLoader"
]);

import { Provider } from 'react-redux';

import store from './src/store/configStore'

import RootStack from './src/navigation'

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<RootStack />
			</Provider>
		)
	}
}
