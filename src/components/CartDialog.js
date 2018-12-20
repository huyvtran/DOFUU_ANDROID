import React, { Component } from 'react'
import {
    Text,
    Modal, 
	ScrollView, 
	View, 
	Dimensions, 
    TouchableOpacity
} from 'react-native'

import { Col, Grid } from 'react-native-easy-grid';

import {
    Header,
    Content,
    Body,
    Left,
    Right,
    Button,
    Icon,
    Title,
    Card,
    CardItem,
    Thumbnail,
    List,
    ListItem,
    Radio,
    CheckBox,
    Separator,
    Item,
    Input   
} from 'native-base'

import Loading from './commons/Loading'
import Spacer from './commons/Spacer'
import Divider from './commons/Divider'
import ImageDialog from './commons/ImageDialog'

import { image, formatPrice, toUpperCase } from '../utils'
import { spacing, styles, colors, text, aligns } from '../styles'
import { connect } from 'react-redux'
import { openCart, closeCart, addToCart, updateCart } from '../store/actions/cartActions'
const { width, height } = Dimensions.get("window");

class CartDialog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            resolve : null,
            reject  : null,
            dialog  : false,
            loading : false,
            disabled: true,
            subTotal: 0,
            default : {
                instance: null,
                store   : null,
                items   : []
            },
            editedItem: {
                instance: null,
                store   : null,
                items   : []
            },
            progress: false
        }
        this._totalProduct = this._totalProduct.bind(this)
    }

    async open(item) {
        this.setState({dialog: true, loading: true, editedItem: Object.assign({}, this.state.default)})
        
        this.setState({editedItem: Object.assign(this.state.editedItem, item), loading:false})
        return new Promise((resolve, reject) => {
            this.setState({resolve: resolve, reject: reject})
        })
    }

    _cancel() {
       const {closeCart} = this.props
       closeCart()
    }

    _agree() {
        const {navigation, closeCart} = this.props
        closeCart()
        navigation.navigate('Checkout')
    }

    _addToCart() {
        var { cart, carts } = this.props
        var { editedItem}   = this.state
        if(!this.state.progress) {
            this.setState({progress: true}, () => {
                this.props.addToCart(editedItem)
            })

            this.setState({progress: false}, () => {
                this.cancel()
            })
        }
    }

    _totalProduct() {
        var product = this.state.editedItem
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
        this.setState({editedItem: {...this.state.editedItem, subTotal: subTotal}})
        return parseInt(subTotal)
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
        const { cart } = this.props
        
        var total = 0
        
        if(cart.items.length>0) {
            cart.items.forEach(item => {
                total = parseInt(total) + parseInt(item.subTotal)
            })
        }
        this.setState({subTotal: total})
    }

    _increase(product) {
        const {cart}       = this.props
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
        const { cart }     = this.props
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

    _changeMemo(product, text) {
        const { cart }     = this.props
        var   indexProduct = cart.items.findIndex(item => item.rowId === product.rowId)
        if(indexProduct > -1) {
            cart.items[indexProduct].memo = text
            this.props.updateCart(cart)
        }
    }
    
    componentDidUpdate(prevProps) {
        if(prevProps.cartDialog !== this.props.cartDialog) {
            this._total()
        }
    }

    render() {
        const { cart, cartDialog } = this.props
        const { subTotal }         = this.state
        if(!cartDialog) return null; 
        return (
            <Modal
                animationType  = "slide"
                transparent    = {false}
                visible        = {cartDialog}
                onRequestClose = {() => this._cancel()}
            >
               
                    <View style={styles.container}>
                        <Header style={colors.redDarken4} androidStatusBarColor="#D50000" >
                            <Left>
                                <Button transparent onPress={() => this._cancel()} rounded >
                                    <Icon name='close' style={text.textLight}></Icon>
                                </Button>	
                            </Left>
                            <Body>
                                <Text style={[text.fontWeightBold, text.textLight]}>
                                    {cart.store.name}
                                </Text>
                            </Body>     	 
                        </Header>
                        {
                             cart.items.length>0 ?              
                        <ScrollView>
                        <Content style={colors.greyLighten5} >  
                            {
                                cart.items.map((product, index) => {
                                    return(
                                        <View key={index.toString()}>
                                            <ListItem last style={[styles.cardRadius, {minHeight:30}, colors.white]} >                                  
                                                <Left>
                                                    <Body>
                                                        <Text style={text.fontWeightThin}>{product.name}</Text>
                                                        {
                                                            (product.toppings.length === 0) ? null: (<Text numberOfLines={2} style={text.fontWeightBold}>{product.toppings.map(item => item.name+ ', ')} </Text>)
                                                        }
                                                        <Item rounded style={[colors.greyLighten4, { height: 35 }]}>
                                                            <Input 
                                                            placeholder  = "Ghi chú"
                                                            onChangeText = {(memo) => this._changeMemo(product, memo) }
                                                            value        = {product.memo}
                                                            />
                                                        </Item>
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
                                                        <Text style={[text.fontWeightBold]}>{formatPrice(product.subTotal)}</Text>
                                                    </Body>                                    
                                                </Right>
                                            </ListItem>
                                            <Divider/>      
                                        </View> 
                                    )
                                })
                            }                            
                        </Content>
                        </ScrollView>
                        :                          <Text>Bạn chưa có món nào trong giỏ hàng</Text>
                        }
                        
                        <View style={[styles.cardHeader, {
                            backgroundColor: '#FAFAFA',
                            height         : 85,
                            borderTopWidth : 0.5,
                            borderColor    : '#FAFAFA'
                        }]}>
                            <CardItem style={[styles.cardHeader, spacing.ma0]}>
                                    <Text>Tổng cộng: </Text>
                                    <Spacer/>
                                    <Text style={[text.fontWeightBold, text.textRedAccent]}>{formatPrice(subTotal)}</Text>
                            </CardItem>
                            <Content padder>
                                
                                <Button disabled={cart.items.length===0} block small rounded rightIcon style={ cart.items.length>0 ? colors.greenDarken3 : null } onPress={() => this._agree()}>
                                    <Icon name='cart' />
                                    <Text style={text.textWhite}>Xác nhận đơn hàng</Text>
                                </Button>
                            </Content>	
                        </View>
                        <ImageDialog ref="image" />
                    </View>                      
                           
            </Modal>
        )
    }
}

function mapStateToProps(state) {
	return {
        carts     : state.cart.carts,
        cart      : state.cart.cart,
        store     : state.store.store,
        cartDialog: state.cart.cartDialog
	}
}

function mapDispatchToProps(dispatch) {
	return {
        closeCart : () => dispatch(closeCart()),
        addToCart : (product) => dispatch(addToCart(product)),
        updateCart: (cart) => dispatch(updateCart(cart)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CartDialog)