import React, { Component } from 'react'

import { Text, StyleSheet, ScrollView, View, Animated, Dimensions, Image} from 'react-native'

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

import {GoogleAutoComplete} from 'react-native-google-places-autocomplete'

import {
    Header,
	Content,
    Left,
    Right,
	Body,
	Card,
	CardItem,
    Form,
    List,
    ListItem,
	Item,
	Input,
	Label,
	Button,
	Icon,
	Spinner,
} from 'native-base'

import { styles, colors, text, spacing, aligns} from '../styles'
import { Field } from 'redux-form'

import SearchBox from '../components/SearchBox'
const {width} = Dimensions.get('window')

class Locating extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    _selectedAddress(placeId) {
        const {getSelectedAddress, navigation} = this.props
        getSelectedAddress(placeId)
        navigation.navigate('Location')

    }

    render() {
        const {getAddressPredictions, toggleSearchResult, predictions} = this.props
        console.log(this.props)
        return(
            <View style={styles.container}>
                <SearchBox navigation={this.props.navigation} getAddressPredictions={getAddressPredictions} toggleSearchResult={toggleSearchResult} />        
                <List style={[spacing.mt2, colors.white, styles.cardRadius, spacing.mx2]}>
                    <ListItem last button avatar>
                        <Left >
                            <Icon name="google-maps" type="MaterialCommunityIcons"></Icon>
                        </Left> 
                        <Body>
                            <Text>Vị trí hiện tại</Text>
                        </Body>
                    </ListItem>
                </List>
                <View style={[spacing.mt2, colors.white, styles.cardRadius, spacing.mx2]}>
                    <List 
                        dataArray = {predictions}
                        renderRow = {(item) => 
                            <View>
                                <ListItem button avatar onPress={() => this._selectedAddress(item.placeID)}>
                                    <Left >
                                        <Icon name="map-marker" type="MaterialCommunityIcons"></Icon>
                                    </Left> 
                                    <Body>
                                        <Text>{item.primaryText}</Text>
                                        <Text note>{item.secondaryText}</Text>
                                    </Body>
                                </ListItem>
                            </View>
                        }
                    />
                </View> 
                <List style={[spacing.mt2, colors.white, styles.cardRadius, spacing.mx2]}>
                    <ListItem last button avatar>
                        <Left >
                            <Icon name="google-maps" type="MaterialCommunityIcons"></Icon>
                        </Left> 
                        <Body>
                            <Text>Chọn trên bản đồ</Text>
                        </Body>
                    </ListItem>
                </List>
                
            </View>
        )
    }
}

const customStyles = StyleSheet.create({
    searchResultsWrapper: {
        top            : 100,
        position       : 'absolute',
        width          : width,
        height         : 1000,
        backgroundColor: '#fff',
        opacity        : 0.9,
        marginLeft     : 15,
        marginRight    : 10,
        borderRadius   : 8
    },
    leftContainer: {
        flexWrap  : 'wrap',
        alignItems: 'flex-start'
    },
    leftIcon: {
        fontSize: 20,
        color   : '#7D7D7D'
    }
})

export default Locating