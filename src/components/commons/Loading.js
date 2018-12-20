import React, { Component } from 'react'
import { View } from 'react-native';
import { Spinner } from 'native-base';
import { aligns } from '../../styles'

class Loading extends Component {
	constructor(props) {
	  	super(props);
	}

	render() {
		return (
				<View style={[aligns.alignCenter, aligns.justifyCenter]}><Spinner color='grey' /></View>
		)
	}
}

export default Loading;