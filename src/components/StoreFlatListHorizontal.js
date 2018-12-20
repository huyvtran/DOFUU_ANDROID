import React, { Component } from 'react'

import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native'

import { 
    Card,
    CardItem,
    Text,
    Thumbnail,
    Body
} from 'native-base'

import { image, formatPrice } from '../utils'
import {text, colors, styles, spacing} from '../styles'

import Divider from './commons/Divider'

class Item extends Component {  
    render() {
        const { item, navigation } = this.props
        return (
            <Card style={[styles.cardRadius, {height: 160, width: 120}]}>
                <TouchableOpacity onPress={() => navigation.navigate('Menu', { storeId: item.id, name: item.name }) }>
                    <View  style={[spacing.ma1, { justifyContent: 'center', alignItems: 'center'}]}>
                        <Card style={{ borderRadius: 50 }}>
                            <Thumbnail
                            source = {{uri: image(item.avatar)}}
                            />
                        </Card>
                        <Text style={[text.textRed, text.fontWeightBold]}>Giảm {item.coupon[0].discountPercent > 0 ? item.coupon[0].discountPercent+'%' : formatPrice(item.coupon[0].discountPrice) }</Text>
                    </View>    
                    <Divider inset={true} style={spacing.my1} />
                    <View style={spacing.ma1}>
                        <Text numberOfLines={2} style={[text.textDark, text.textCenter]}>{item.name}</Text>    
                    </View>     
                </TouchableOpacity>               
            </Card>
        )
    }
}


export default class StoreFlatListHorizontal extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const { stores } = this.props
        return(
            <FlatList 
                extraData  = {this.props}
                horizontal = {true}
                data       = {stores}
                style      = {colors.greyLighten4}
                renderItem = {({item, index}) => {
                    return (
                        <Item item={item} index={index} navigation={this.props.navigation}></Item>
                    )
                }}
                keyExtractor                   = { (item, index) => item.name}
                showsHorizontalScrollIndicator = {false}
            >
            </FlatList>
        )
    }
}

