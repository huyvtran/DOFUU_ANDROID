import React, { Component } from 'react'

import { TouchableOpacity, StyleSheet, ScrollView, View, Animated, Dimensions, Image} from 'react-native'

import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from 'react-native-maps'

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
	Text,
	Button,
	Icon,
	Spinner,
} from 'native-base'

import { styles, colors, text, spacing, aligns} from '../styles'
import {formatPrice} from '../utils'

const { width, height } = Dimensions.get("window");
const ASPECT_RATION     = width/height
const LATITUDE_DELTA    = 0.0922
const LONGITUDE_DELTA   = ASPECT_RATION*LATITUDE_DELTA
import SearchBox from '../components/SearchBox'

class Location extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getCurrentLocation()
    }

    _confirmDestination() {
        const {navigation} = this.props
    }

    render() {
        const {navigation, destination, address, shipPrice, store} = this.props
        return(
            <View style={styles.container}>
                {
                    destination.latitude &&  
                    <MapView
                        provider      = {PROVIDER_GOOGLE}
                        style         = {styles.map}
                        region        = {destination}
                        minZoomLevel  = {15}
                        rotateEnabled = {false}
                        cacheEnabled
                    >
                        <Marker coordinate={{latitude: store.lat, longitude: store.lng}} />
                        <Marker coordinate={destination}>
                        <Image
                                style  = {{width:45, height:45}}
                                source = {require('../assets/img/destination_flag.png')}
                            />
                        </Marker>
                    </MapView>  
                }
                <Header transparent searchBar rounded>            
                    <Item rounded style={[colors.white, {flex:4}]}>
                        <TouchableOpacity><Icon name='arrow-back' style={text.textBlack} /></TouchableOpacity>

                        <Input onFocus={() => navigation.navigate('Locating')} 
                            placeholder = "Chọn vị trí nhận"
                            value       = {address}
                        ></Input>
                    </Item>
                </Header>
                <View style={[styles.cardRadius, {
                    backgroundColor: '#FAFAFA',
                    height         : 85,
                    width          : '100%',
                    borderTopWidth : 0.5,
                    borderColor    : '#FAFAFA',
                    bottom         : 0,
                    position       : 'absolute',
                    flex           : 1
                }]}>
                    <Content padder>
                        <Text>Phí vận chuyển: <Text style={text.fontWeightBold}>{formatPrice(shipPrice)}</Text></Text>
                        <Button rounded block small style={colors.greenDarken3} onPress={() => navigation.navigate('Checkout')}>
                            <Text style={text.textWhite}>Xác nhận vị trí nhận</Text>
                        </Button>
                    </Content>	
                </View>
            </View>
        )
    }
}
const customStyles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
        width : '100%',
        flex  : 1
    }
})
export default Location