import React, { Component } from 'react'

import {
    View,
    ScrollView
} from 'react-native'

import { 
    Header,
    Left,
    Body,
    Right,
    Card,
    Button,
    Text,
    Icon,
    Item,
    Input
} from 'native-base'

import StoreFlatListVertical from '../components/StoreFlatListVertical'

import { text, styles, colors} from '../styles'

class TypeStore extends Component {
    constructor(props) {
        super(props)
    }
    
    _loadStore() {
        const {fetchStoreByType, stores} = this.props
        const typeId                     = this.props.navigation.state.params.typeId
        const data                       = {cityId: 10001, stores: stores, typeId: typeId}
        fetchStoreByType(data)
    }
    
    _destroyStore() {
        const {destroyFetchStore} = this.props
        destroyFetchStore()
    }

    componentDidMount() {
        this._loadStore()
    }
    
    componentWillUnmount() {
        this._destroyStore()
    }

    static navigationOptions = ({ navigation }) => ({
        header: <Header searchBar rounded style={[colors.white, styles.raised]} androidStatusBarColor='#B71C1C'>
                    <Left >
                        <Button style={[styles.circle]} transparent onPress={() => navigation.goBack() }>
                            <Icon name='arrow-back' style={text.textBlack} />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={[text.title, text.fontWeightLight]}>{navigation.state.params.name}</Text>
                    </Body>
                    <Right>
                        <Button style={[styles.circle]} transparent onPress={() => navigation.state.routeName != 'Search' ? navigation.navigate('Search') : null}>
                            <Icon name='search' style={text.textBlack} />
                        </Button> 
                    </Right>
                </Header>
    })
    
    render() {
        const { stores } = this.props
        return (
            <View style={styles.container}>                
                <StoreFlatListVertical stores={stores} {...this.props} fetchStore={() => this._loadStore()}></StoreFlatListVertical>
            </View>
        )
    }
}

export default TypeStore