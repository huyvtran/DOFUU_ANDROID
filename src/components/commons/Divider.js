import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

class Divider extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static propTypes = {
        inset      : PropTypes.bool,
        color      : PropTypes.string,
        borderColor: PropTypes.string,
        orientation: PropTypes.oneOf(['left', 'center', 'right'])
    };

    static defaultProps = {
        inset      : false,
        orientation: 'left',
        color      : 'rgba(0,0,0,.12)',
        borderColor: '#e8e8e8'
    };

    render() {
        const props = this.props;
        return (
            <View style={[{justifyContent: 'flex-start', alignItems: 'center'}]}>
                <View
                    style = {[styles.divider, {width: props.inset ? '90%' : '100%'}]}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    divider : {
        borderStyle: 'solid',
        borderWidth: 0.2,
        borderColor: 'rgba(0,0,0,.12)'
    }
});

export default Divider;