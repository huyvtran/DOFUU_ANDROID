import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text
} from 'react-native'

import { 
    Header,
    Left,
    Button,
    Icon,
    Item,
    Input
} from 'native-base'

import { text, styles, colors, spacing} from '../styles'

export default class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstQuery: '',
        }
    }
    static navigationOptions = ({ navigation }) => ({
        header: <Header searchBar rounded style={[colors.white, styles.raised]} androidStatusBarColor='#B71C1C'>
                    <Left >
                        <Button style={[styles.circle]} transparent onPress={() => navigation.goBack() }>
                            <Icon name='arrow-back' style={text.textBlack} />
                        </Button>
                    </Left>
                    <Item rounded style={[colors.greyLighten4, {flex:4}]}>
                        <Icon name="ios-search" />
                        <Input placeholder="Tìm kiếm món, quán ăn..." autoFocus/>
                    </Item>
                </Header>
    })
    render() {
        return (
            <View>
                <Text>Search</Text>
            </View>
        )
    }
}