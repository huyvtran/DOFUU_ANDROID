import React, { Component } from 'react';
import { View } from 'react-native';

class Spacer extends Component {
    render() {
        const props = this.props;
        return (
            <View style={{flexGrow: 1}}>
            </View>
        );
    }
}

export default Spacer;