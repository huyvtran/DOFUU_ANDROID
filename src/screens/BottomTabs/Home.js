import React, { Component } from 'react'

import { 
    ScrollView,
    View, 
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native'

import {
    Content,
    Left,
    Header,
    Item,
    Body,
    Card,
    CardItem,
    Text,
    Input,
    Picker,
    Button,
    Icon,
    Thumbnail,
    Spinner
} from 'native-base'

import { formatTime, activityTime, typeIcon } from '../../utils'
import { text, styles, colors, spacing} from '../../styles'



import API from '../../services/api'
import Spacer from '../../components/commons/Spacer'
import StoreFlatListHorizontal from '../../components/StoreFlatListHorizontal'

export default class Home extends Component {

    static navigationOptions = ({ navigation }) => (
    {
		title      : `Khám phá`,
		tabBarLabel: 'Khám phá',
		tabBarIcon : ({ tintColor, focused }) => (
			<Icon type="MaterialCommunityIcons" name={focused ? "home" : "home-outline"} style={{ color: tintColor, fontSize: 25 }} />
		),
	})

    constructor(props) {
        super(props)
        this.state = {
            cities: [],
            types : [],
            deal  : {
                stores: []
            },
            all : {
                stores: []
            },
            end    : false,
            loading: false
        }
    }
    
    _fetchStoreWithDeal(query) {
        const {currentCity} = this.props
        const url           = `/Store/FetchDealStores`
        var   data          = query
        var   params        = { cityId: currentCity.id }
        API.post(url, data, { params, withCredentials: true }).then(response => {
            if(response.status === 200) {
                  console.log(response.data.stores)
                this.setState({ deal: {...this.state.deal, stores: response.data.stores} })
            }
        })
    }

    _fetchType() {
        const url    = `/Type/FetchAllTypes`
        var   data   = {}
        var   params = {}
        API.post(url, data, {params, withCredentials: true}).then(response => {
            if(response.status === 200) {
                console.log('type', response.data)
                this.setState({types: response.data.types})
            }
        })
    }

    _fetchAllStore() {
        const { all, loading, end } = this.state
        const {currentCity}         = this.props
        const cityId                = currentCity.id
        var   offset                = all.stores.length
        const url                   = `/Store/FetchAllStores`
        const data                  = { typeId: 0, offset: offset, cityId: cityId }
        if(!loading && !end) {
            this.setState({loading: true})
            setTimeout(() => {
                API.post(url, data, { withCredentials:true }).then(response => {
                    if(response.status === 200) {
                        var stores = response.data.stores
                        if(stores.length === 0) {
                            this.setState({end: true})
                        }

                        const newRecords = all.stores
                        stores.forEach(item => {
                            newRecords.push(item)
                        })                      
                        this.setState({ all: {...all, stores: newRecords} })
                    }
                }).finally(() => {
                    this.setState({loading: false})
                })
            }, 50)            
        }        
    }

    componentDidMount () {
        this._fetchType()
    }

    componentDidUpdate(prevProps) {
        if(prevProps.currentCity !== this.props.currentCity) {
            const query = { did:0, tid:0, page:0 }
            this._fetchStoreWithDeal(query)
            this._fetchAllStore()
        }
    }

    _renderHeader = () => {
        return null
    };

    _renderFooter = () => {
        const { loading } = this.state
        if (!loading) return null;
        
        return (
            <Spinner color="grey" />
        );
    };

    render() {
        const { deal, types, all, loading }       = this.state
        const { navigation, cities, currentCity } = this.props
        return (
            <View style={styles.container}>
                <Header searchBar rounded style={[colors.white, styles.raised]} androidStatusBarColor='#B71C1C'>
                    <Item rounded style={[colors.greyLighten4, {flex: 1}]}>
                    <Picker
                        note
                        style = {{width: 100}}
                    >
                        { 
                            cities.map((city, index) => {
                                return (
                                    <Picker.Item label={city.name} value={city.id} key={index}/>
                                )
                            })
                        }                           
                    </Picker>
                        <Input  style = {{ flex: 9}} placeholder="Tìm kiếm món, quán ăn..." onFocus  = {() => navigation.state.routeName != 'Search' ? navigation.navigate('Search') : null}/>
                    </Item>
                </Header>
                <FlatList
                    showsVerticalScrollIndicator = {false}
                    extraData                    = {this.props}
                    data                         = {all.stores}
                    ListHeaderComponent          = {() => (
                        <View>
                             <Card transparent>
                                <CardItem header style={[{height: 35}]}>
                                    <Text style={text.textRedAccent}>Hot Deals</Text>
                                </CardItem>          
                                <StoreFlatListHorizontal stores={deal.stores} {...this.props}></StoreFlatListHorizontal>
                            </Card>
                            <Card transparent>
                                <FlatList 
                                    extraData  = {this.state}
                                    horizontal = {true}
                                    data       = {types}
                                    renderItem = {({item, index}) => {
                                        return (
                                        <Card style={[styles.cardRadius, {height: 70, width: 70}]} key={index}>
                                            <TouchableOpacity
                                                onPress = {() => navigation.navigate('Type', {typeId: item.id, name: item.name})}
                                            >
                                            <View  style={[spacing.ma1, { justifyContent: 'center', alignItems: 'center'}]}>                                  
                                                <Thumbnail small square
                                                source = {{uri: 'https://www.dofuu.com'+typeIcon(item.name, 'type')}}
                                                />                                    
                                                <Text numberOfLines={1}>{item.name}</Text>
                                            </View>       
                                            </TouchableOpacity>                                   
                                        </Card>
                                        )
                                    }}
                                    keyExtractor                   = { (item, index) => item.name}
                                    showsHorizontalScrollIndicator = {false}
                                    onEndThreshold                 = {0}
                                    ItemSeparatorComponent         = {() => <View style={spacing.ma2} />}
                                />    
                            </Card>
                        </View>
                    )}
                    renderItem = {({item}) => ( 
                        <Card style={styles.cardRadius}>
                            <CardItem button onPress={() => navigation.navigate('StoreDetail', { storeId: item.id, name: item.name })} header style={[styles.cardHeader, colors.redDarken4, {height:30}]}>
                                <Icon name="time" style={[text.textLight, styles.iconSize]}></Icon>
                                <Text style={text.textLight}>{activityTime(item.activities)}</Text>
                                <Spacer/>
                                <Text style={text.textLight}>{item.type.name}</Text>
                            </CardItem>
                            <CardItem button onPress={() => navigation.navigate('StoreDetail', { storeId: item.id, name: item.name })} >
                                <Card style={{ borderRadius: 50 }}>
                                    <Thumbnail source = {{uri: 'https://www.dofuu.com'+item.avatar}}></Thumbnail>
                                </Card>
                                <Body style={spacing.ml3}>
                                    <Text numberOfLines={1}>{item.name}</Text>
                                    <Text numberOfLines={1} style={text.textDark}>{item.address}</Text>
                                    { !!item.coupon ? <Text style={[text.textRedAccent, text.fontWeightBold, text.fontItalic]}>{item.coupon.title}</Text> :null}
                                </Body>
                            </CardItem>
                            <CardItem footer style={[styles.cardFooter, colors.greyLighten5, {height:30}]}>
                                <Spacer/>
                                <Icon type="MaterialCommunityIcons" name="eye" style={[text.textDark, styles.iconSize]}></Icon>
                                <Text style={[text.textDark, spacing.mr2]}>{item.views}</Text>
                                <Icon type="MaterialCommunityIcons" name="message-reply-text" style={[text.textDark, styles.iconSize]}></Icon>
                                <Text style={[text.textDark, spacing.mr2]}>{item.totalComment}</Text>
                                <Icon type="MaterialCommunityIcons" name="heart" style={[text.textDark, styles.iconSize]}></Icon>
                                <Text style={[text.textDark, spacing.mr2]}>{item.likes}</Text>
                                <Icon type="MaterialCommunityIcons" name="bookmark-outline" style={[text.textDark, styles.iconSize]}></Icon>
                            </CardItem>
                        </Card>
                    )}
                    keyExtractor          = {item => item.id.toString()}
                    initialNumToRender    = {8}
                    ListFooterComponent   = {this._renderFooter.bind(this)}
                    onEndReached          = {() => this._fetchAllStore()}
                    onEndReachedThreshold = {0.5}
                >
                </FlatList>
            </View>
        )
    }
}

const home = StyleSheet.create({
    searchbar: {
        margin      : 4,
        height      : 40,
        borderRadius: 18,
        elevation   : 0
    },
});