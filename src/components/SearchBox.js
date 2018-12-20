import React, {Component} from 'react'

import {Text, Dimensions, StyleSheet, TouchableOpacity} from 'react-native'
import {
    Left,
    Header, 
    View, 
    InputGroup, 
    Input,
    Item,
    Icon,
} from 'native-base'

import {styles, spacing, colors, text} from '../styles'
import { Button } from 'react-native-elements';

const  {width}         = Dimensions.get('window')
export const SearchBox = ({toggleSearchResult, getAddressPredictions, navigation}) => {
    function handleInput(val) {
        console.log(this)
        getAddressPredictions(val)
    }
    return (
        <Header transparent searchBar rounded>
            
            <Item rounded style={[colors.white, {flex:4}]}>
                <TouchableOpacity onPress={() => navigation.goBack()}><Icon name='arrow-back' style={text.textBlack} /></TouchableOpacity>
          
                <Input onFocus={() => toggleSearchResult()} 
                    placeholder  = "Chọn vị trí nhận"
                    onChangeText = {handleInput.bind(this)}></Input>
            </Item>
        </Header>
    )
}
export default SearchBox