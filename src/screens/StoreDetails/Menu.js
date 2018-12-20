import React, { Component } from 'react'
import {
    ScrollView,
    View,
    Modal,
    Dimensions,
    TouchableOpacity,
    AsyncStorage,
    Alert,
    FlatList,
    ListView,
    Text,
} from 'react-native'

import { 
    Header,
    Left,
    Body,
    Right,
    Button,
    Icon,
    List,
    ListItem,
    Item,
    Input,
    Card,
    CardItem,
    Tabs,
    Tab,
    TabHeading,
    ScrollableTab,
    Spinner,
    Thumbnail,
    Badge
} from 'native-base'

import { Col, Grid } from 'react-native-easy-grid';

import Spacer from '../../components/commons/Spacer'
import Divider from '../../components/commons/Divider'
import Loading from '../../components/commons/Loading'
import ProductDialog from '../../components/ProductDialog'
import ImageDialog from '../../components/commons/ImageDialog'
import CartDialog from '../../components/CartDialog'

import { text, styles, colors, spacing, aligns} from '../../styles'
import { formatPrice, activityTime, image } from '../../utils'
import API from '../../services/api'

class Catalogues extends Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            filterCatalogue: props.filterCatalogue,
            activeTab      : -1,
            store          : props.store
        }
    }

    _filterByType = (value) => {
        console.log(value)
        const {store} = this.state
        if(value === -1) {
            this.setState({
                activeTab : value,
                catalogues: store.catalogues
            })
            return
        }
        const data    = store.catalogues.filter(catalogue => {
            return catalogue.id === value
        })
        this.setState({
            activeTab : value,
            catalogues: data
        })
    }

    render() {
        const {filterCatalogue, activeTab} = this.state
        console.log(activeTab)
        return(
            <FlatList 
                extraData                      = {this.state}
                data                           = {filterCatalogue}
                horizontal                     = {true}
                showsHorizontalScrollIndicator = {false}
                renderItem                     = {({item, i}) => {
                    return(
                        <View style={{flex:1, flexDirection: 'column'}}>
                            <Button full onPress={()=> this._filterByType(item.id)} style={activeTab===item.id ? colors.greyLighten4 : colors.white}><Text style={{color: 'black'}}>{item.name}</Text></Button>
                        </View>
                    )
                }}
                keyExtractor = {item => item.name}
            />
        )
    }
}

class Menu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            screenWidth        : Dimensions.get("window").width,
            screenHeight       : Dimensions.get("window").height,
            loading            : true,
            catalogues         : null,
            store              : null,
            cart               : props.cart,
            subTotal           : 0,
            stickyHeaderIndices: [],
            data               : [],
            query              : '',
            filterCatalogue    : [{name: 'Tất cả', id: -1}],
            activeTab          : -1
        }
        this._openCart      = this._openCart.bind(this)
        this._renderHeader  = this._renderHeader.bind(this)
        this._renderProduct = this._renderProduct.bind(this)
        this._renderItem    = this._renderItem.bind(this)
        this._renderCart    = this._renderCart.bind(this)
    }
    // static navigationOptions = ({ navigation }) => ({
    //     header: <Header searchBar rounded style={[colors.white, styles.raised]} androidStatusBarColor='#B71C1C' hasTabs >
    //                <Left >
    //                     <Button style={[styles.circle]} transparent onPress={() => navigation.goBack() }>
    //                         <Icon name='arrow-back' style={text.textBlack} />
    //                     </Button>
    //                 </Left>
    //                 <Body>
    //                     <Text style={[text.subheading, text.fontWeightRegular, text.textRedAccent]}></Text>
    //                 </Body>
    //                 <Right>
    //                     <Button style={[styles.circle]} transparent onPress={() => navigation.state.routeName != 'Search' ? navigation.navigate('Search') : null}>
    //                         <Icon name='search' style={text.textBlack} />
    //                     </Button>
    //                 </Right>
    //             </Header>,
    //     title      : `Thực đơn`,
    //     tabBarLabel: 'Thực đơn'
    // })
    
    _showStore(id) {
        const { setStore } = this.props
        const { loading }  = this.state
        const url          = `/Store/${id}/ShowStore`
        const data         = {}
        const params       = {}
        if(loading) {
            this.setState({loading: true})
            return new Promise((resolve, reject) => {
                API.post(url, data, {params, withCredentials:true}).then(response => {
                    if(response.status === 200) {
                        setStore(response.data.store)                        
                        this.setState({store: response.data.store, loading: false, catalogues: response.data.store.catalogues})
                        var newArray = this.state.filterCatalogue
                        response.data.store.catalogues.forEach(catalogue => {
                            newArray.push({name: catalogue.name, id: catalogue.id})
                        })
                        this.setState({filterCatalogue: newArray})
                    }
                    resolve(response)
                }).catch(error => {                    
                    this.setState({loading: false})
                })
            })    
        }
    }
    
    _getCart = async () => {
        const { store } = this.state
        var   array     = [{ instance: 100000040, items: []}, { instance: 100000062, items: []}]
        await AsyncStorage.setItem('carts', JSON.stringify(array))  
    }
    _showCart = async () => {
        try {
            let myData = JSON.parse(await AsyncStorage.getItem('carts'))
            alert(myData)
            console.log(JSON.parse(await AsyncStorage.getItem('carts')))
        } catch(error) {
            console.log(error.message)
        }
    }
    _removeCart = async () => {
        try {
            AsyncStorage.removeItem('carts')
        } catch (error) {
            console.log(error.message)
        }
    }

    _fetchCart = async () => {
        const { store } = this.state
        this.props.fetchCart(store)
        console.log('props', this.props)
    }

    _destroyCart = async () => {
        const { cart } = this.state
        if(cart.items.length === 0) {

        }
    }

    componentDidMount() {
        // const {navigation} = this.props
        // this._showStore(navigation.state.params.storeId).then(response => {
        //     if(response.status == 200) {
        //         this._fetchCart()
        //     }
        // })
        this._showStore(100000040).then(response => {
            if(response.status == 200) {
                this._fetchCart()
            }
        })
    }

    _chooseProduct(product) {
        this.refs.product.open(product).then(response => {

        })
    }
    
    _openCart(cart) {
        const { openCart } = this.props
        openCart()
    }
    
    _handleSearch = text => {
        const {store}     = this.state
        const formatQuery = text.toLowerCase()
        const data        = store.catalogues.filter(item => {
            return item.products.some((product) => product.name.toLowerCase().indexOf(formatQuery) > -1)
        })
        this.setState({
            query     : formatQuery,
            catalogues: data
        })
    }

    _filterByType = (value) => {
        const {store, activeTab} = this.state
        this.refs.listRef.scrollToOffset({y: 0, animated: true})
        if(activeTab != value) {
            if(value === -1) {
                this.setState({
                    activeTab : value,
                    catalogues: store.catalogues
                })
                return
            }
            const data    = store.catalogues.filter(catalogue => {
                return catalogue.id === value
            })
            this.setState({
                activeTab : value,
                catalogues: data
            })
        }
    }

    _openImage(image) {
        this.refs.image.open(image)
    }

    _renderProduct(product) {
		return (
            <View style={[spacing.mx2]} key={product.id.toString()}>
                <Card style={[styles.cardRadius]}>
                    <CardItem header button  style={[styles.cardHeader, colors.redDarken4, {height: 30}]} onPress={() => this._chooseProduct(product)}>
                        <Text style={this.state.query!='' && product.name.indexOf(this.state.query.toLowerCase())>-1 ? [colors.yellow, text.textBlack]  : text.textLight }> { product.name } </Text>
                    </CardItem>
                    <CardItem button onPress={() => this._chooseProduct(product)} style={styles.cardFooter}>
                        <Card style={{ borderRadius: 50 }}>
                            <Thumbnail source={{uri: image(product.image)}} />
                        </Card>
                        <Body style={spacing.ml3}>
                            <Grid>
                                { product.sizes.map((size, i) => {
                                    if(size.price > 0) {
                                        return (
                                            <Col key={size.name}>
                                                <Body>	
                                                    <Text>{size.name}</Text>
                                                    <Text style={text.fontWeightBold}>{formatPrice(size.price)}</Text>
                                                </Body>		
                                            </Col>                                            
                                        )
                                    }
                                })}	
                            </Grid>                       
                            <Text>{product.description}</Text>
                        </Body>
                    </CardItem>										
                </Card>
            </View>
		)
    }
    
    _renderSize(sizes) {
        if(sizes.length == 0) null
       
            return (
                sizes.map((size, i) => 
                {
                    return(
                        <Col key={size.name}>
                            <Button large transparent>
                                <Body>	
                                    <Text style={text.caption}>{size.name}</Text>
                                    <Text style={text.fontWeightBold}>{formatPrice(size.price)}</Text>
                                </Body>					
                            </Button>
                        </Col>
                    )               
                }
            )
        )		
    }

    _renderHeader = () => {
        const { store, query } = this.state
        return (
            <Card>
                <CardItem header style={[styles.borderRadius, styles.cardHeader, colors.greyLighten4, {height: 30}]} >
                    <Text style={[text.textBlack, text.fontWeightRegular]}>{store.type.name}</Text>
                    <Spacer></Spacer>
                    <Icon name="time" style={[text.textBlack, styles.iconSize]}></Icon>
                    <Text style={[text.textBlack, text.fontWeightRegular]}>{activityTime(store.activities)}</Text>
                </CardItem>
                <Divider/>
                <CardItem cardBody style={spacing.ma2}>
                    <Card style={{ borderRadius: 50 }}>
                        <TouchableOpacity onPress={() => this._openImage(store.avatar)}>
                            <Thumbnail source={{ uri: image(store.avatar) }} large />
                        </TouchableOpacity>
                    </Card>
                    <Body style={spacing.ml2}>                   
                       
                        <CardItem >
                            <Grid>
                                <Col style={[aligns.alignCenter]} >
                                    <Icon type="MaterialCommunityIcons" name="eye" style={[text.textDark]}></Icon>
                                    <Text style={[text.textDark, spacing.mr2]}>{store.views}</Text>
                                </Col>

                                <Col style={[aligns.alignCenter]}>
                                    <Icon type="MaterialCommunityIcons" name="message-reply-text" style={[text.textDark]}></Icon>
                                    <Text style={[text.textDark, spacing.mr2]}>{store.totalComment}</Text>
                                </Col>

                                <Col style={[aligns.alignCenter]}>
                                    <TouchableOpacity style={[aligns.justifyCenter, aligns.alignCenter, styles.circle]} small  onPress={() => alert('like')} transparent>
                                        <Icon type="MaterialCommunityIcons" name="heart-outline" style={[text.textPink]}></Icon>
                                    </TouchableOpacity>
                                    <Text style={[text.textDark, spacing.mr2]}>{store.likes}</Text>
                                </Col>

                                <Col style={[aligns.alignCenter]}>
                                    <TouchableOpacity small  onPress={() => alert('favorite')} transparent>
                                        <Icon type="MaterialCommunityIcons" name="bookmark-outline" style={[text.textBlue]}></Icon>
                                    </TouchableOpacity>
                                    <Text style={[text.textDark, spacing.mr2]}>Lưu</Text>
                                </Col>

                            </Grid> 
                        </CardItem>
                        <Text style={text.textBlack}>{store.address}</Text>
                    </Body>
                </CardItem>    
                <Header searchBar rounded style={[colors.white, styles.raised]} androidStatusBarColor='#B71C1C'>
                    <Item rounded style={[colors.greyLighten4]}>
                        <Icon name="ios-search" />
                        <Input autoCorrect={false} placeholder="Tìm kiếm món" autoFocus onChangeText={(text) => this._handleSearch(text)} value={query} />
                    </Item>
                </Header>                    
            </Card>
        )
    }

    _renderItem({ item }) {
        return (
            <View>                
                <ListItem itemDivider>
                  <Body style={{ marginRight: 40 }}>
                    <Text style={{ fontWeight: "bold" }}>
                      {item.name}
                    </Text>
                  </Body>
                  <Right />
                </ListItem>
                {
                    item.products.map(product => {
                        return(
                            this._renderProduct(product)
                        )
                    })
                }
            </View>
        )
    }

    _subTotal(product) {
        if(!!product) {
            var total        = 0
            var totalTopping = 0
            var subTotal     = 0
            if(product.toppings.length > 0) {
                product.toppings.forEach(topping => {
                    totalTopping = totalTopping + parseInt(topping.price)
                })
            }
            if(!!product.size) {
                total = parseInt(product.size.price) + totalTopping
            }
        }
        subTotal = parseInt(total*product.qty)
        return parseInt(subTotal)
    }
    
    _total() {
        const { cart } = this.state
        
        var total = 0
        
        if(cart.items.length>0) {
            cart.items.forEach(item => {
                total = parseInt(total) + parseInt(item.subTotal)
            })
        }
        this.setState({subTotal: total})
    }

    _increase(product) {
        const {cart}       = this.state
        var   indexProduct = cart.items.findIndex(item => item.rowId === product.rowId)

        if(indexProduct > -1) {
            product.qty      = ++product.qty
            product.subTotal = this._subTotal(product)
            Object.assign(cart.items[indexProduct], product)
            this.props.updateCart(cart)
            this.setState({cart: cart}, () => this._total())
        }
    }

    _decrease(product) {
        const { cart }     = this.state
        var   indexProduct = cart.items.findIndex(item => item.rowId === product.rowId)
        if(indexProduct > -1) {
            if(cart.items[indexProduct].qty > 1) {
                cart.items[indexProduct].qty--
                cart.items[indexProduct].subTotal = this._subTotal(product)
            } else if (cart.items[indexProduct].qty == 1) {
                cart.items.splice(indexProduct, 1)
            }
            this.props.updateCart(cart)
            this.setState({cart: cart}, () => this._total())
        }
    }

    _renderCart = () => {
        const { cart, subTotal } = this.state
        if(!cart) return null
        return (
            <Card style={colors.greenDarken2}>
                <CardItem header>
                    <Left>
                        <Thumbnail source={{uri: image(cart.store.avatar)}} small></Thumbnail>
                        <Body>
                            <Text style={[text.fontWeightBold, text.textDark]}>
                                {cart.store.name}
                            </Text>
                        </Body>
                    </Left>                            
                </CardItem>
                
                <List style={colors.greyLighten5} >  
                    {
                        cart.items.map((product, index) => {
                            return(
                                <ListItem last={index+1===cart.items.length} style={[{minHeight:30}, colors.greyLighten5]} key={index.toString()}>                                  
                                    <Left>
                                        <Body>
                                            <Text style={text.fontWeightThin}>{product.name}</Text>
                                            {
                                                (product.toppings.length === 0) ? null: (<Text numberOfLines={2} style={text.fontWeightBold}>{product.toppings.map(item => item.name)}</Text>)
                                            }
                                            {
                                                (!product.memo) ? null: (<Text style={text.textRedAccent}>{product.memo}</Text>)
                                            }
                                        </Body>
                                    </Left>
                                    <Right>  
                                        <Body>
                                            <CardItem style={[colors.transparent]}>                              
                                                <TouchableOpacity onPress={() => this._decrease(product)}>
                                                    <Icon type="MaterialCommunityIcons" name="minus-circle" style={text.textGreyLighten1}></Icon>
                                                </TouchableOpacity>                                           
                                                <Text style={[text.fontWeightBold, spacing.pr1]}>{product.qty}</Text>               
                                                <TouchableOpacity onPress={() => this._increase(product)}>
                                                    <Icon type="MaterialCommunityIcons" name="plus-circle" style={text.textGreenDarken3}></Icon>                                                                                
                                                </TouchableOpacity>  
                                            </CardItem>
                                            <Text style={[text.textRedAccent, text.fontWeightBold]}>{formatPrice(product.subTotal)}</Text>
                                        </Body>                                    
                                    </Right>
                                </ListItem>       
                            )
                        })
                    }                            
                </List>
                <Card transparent>
                    <CardItem>
                        <Left><Text>Tạm tính: </Text></Left>
                        <Right><Text style={text.fontWeightBold}>{formatPrice(subTotal)}</Text></Right>
                    </CardItem>
                </Card>
                <Divider />
                <Button block style={[colors.redAccent4, spacing.mt2]} small onPress={()=> this._agree()} >
                    <Text style={text.textWhite}>Xác nhận đơn hàng</Text>
                </Button>    
            </Card>     
        ) 
    }

    render() {
        const { loading, store, catalogues, filterCatalogue, activeTab } = this.state
        const { navigation, cart }                                       = this.props
        if (loading && !store) return <Spinner color="grey" />
        return (
            <View style={styles.container}>       
                <Header searchBar rounded style={[colors.white, styles.raised]} androidStatusBarColor='#B71C1C' hasTabs >
                   <Left >
                        <Button style={[styles.circle]} transparent onPress={() => navigation.goBack() }>
                            <Icon name='arrow-back' style={text.textBlack} />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={[text.subheading, text.fontWeightRegular, text.textRedAccent]}></Text>
                    </Body>
                    <Right>
                        <Button style={[styles.circle]} transparent onPress={() => this._openCart(cart)}>
                            <Icon type="MaterialCommunityIcons" name='cart' style={text.textBlack} />
                            {cart && cart.items.length>0 ? <Badge style={{ position: 'absolute', right:0 }}><Text>{cart.items.length}</Text></Badge> : null}
                        </Button>
                    </Right>
                </Header>    
                {
                    this._renderHeader()
                }
                <FlatList 
                    data                         = {catalogues}
                    showsVerticalScrollIndicator = {false}
                    ListHeaderComponent          = {
                        () => {
                            return(
                                <FlatList 
                                    extraData                      = {this.state.filterCatalogue}
                                    data                           = {filterCatalogue}
                                    horizontal                     = {true}
                                    showsHorizontalScrollIndicator = {false}
                                
                                    renderItem                     = {({item, i}) => {
                                        return(
                                            <View style={{flex:1, flexDirection: 'column'}}>
                                                <Button full onPress={()=> this._filterByType(item.id)} style={activeTab===item.id ? colors.greyLighten4 : colors.white}><Text style={[spacing.mx2, {color: 'black'}]}>{item.name}</Text></Button>
                                            </View>
                                        )
                                    }}
                                    keyExtractor = {item => item.name}
                                />
                            )}
                    }
                    renderItem          = {this._renderItem}
                    keyExtractor        = {item => item.name}
                    stickyHeaderIndices = {[0]}
                    ref                 = "listRef"
                />                                            
                
                <ProductDialog ref="product" {...this.props}  store={store}/>
                <CartDialog navigation={this.props.navigation} />

                <ImageDialog ref="image" {...this.props} />
            </View>
        )
    }
}
export default Menu