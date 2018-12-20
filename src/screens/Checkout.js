import React, { Component } from 'react'

import { StyleSheet, Text, ScrollView, View, Animated, Dimensions, Platform} from 'react-native'

import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from 'react-native-maps'

import {
	Header,
	Title,
	Content,	
	Left,
	Body,
	Right,
	Card,
	CardItem,
	Badge,
	Form,
	Separator,
	List,
	ListItem,
	Item,
	Input,
	Label,
	Button,
	Icon,
	Spinner,
} from 'native-base'

import { Field } from 'redux-form'
import API from '../services/api'
import moment from 'moment-timezone'
import {formatPrice} from '../utils'
import { styles, colors, text, spacing, aligns} from '../styles'
import Modal from 'react-native-modal'
import DateTimePicker from 'react-native-modal-datetime-picker';
import Divider from '../components/commons/Divider'
const { width, height } = Dimensions.get("window");

const deviceWidth  = Dimensions.get("window").width;
const deviceHeight = Platform.OS === "ios"
? Dimensions.get("window").height
:                                                                                                              require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");

const CARD_HEIGHT     = height / 4;
const CARD_WIDTH      = CARD_HEIGHT - 50
const ASPECT_RATION   = width/height
const LATITUDE_DELTA  = 0.0922
const LONGITUDE_DELTA = ASPECT_RATION*LATITUDE_DELTA

const renderField = ({icon = false, iconName, input, label, type, placeholder, secureText = false, meta: { touched, error, warning }}) => {
	var hasError = false;
    if(error !== undefined){
      hasError = true;
    }
	return (
		<Item rounded last style={[spacing.my2]} error= {touched && error !== undefined}>
        	{(icon) ? <Icon name={iconName} type="MaterialCommunityIcons"  /> : null}
            <Input {...input} secureTextEntry={secureText} placeholder={placeholder} />
            {(touched) && ((error && <Text style={text.error}>{error}</Text>) || (warning && <Text style={text.warning}>{warning}</Text> ))}
        </Item>	      
	)
}


class Checkout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            stores   : [],
            selected : undefined,
            region   : {
                latitude      : 10.045162,
                longitude     : 105.746857,
                latitudeDelta : 0.04864195044303443,
                longitudeDelta: 0.040142817690068
			},
			dialog             : false,
			timeReceive        : '',
			dateReceive        : moment().tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY'),
			isTimePickerVisible: false
        };
    }

    _renderAlert() {
    	const { alert, navigation } = this.props
    	if(!alert.show && alert.index === 0 && alert.routeName != navigation.state.routeName) return null

    		return(
    			<CardItem > 
    				<Text style={alert.type == 'success' ? text.success : [text.error, text.fontWeightBold] }>{alert.message}</Text>
    			</CardItem>
    		)	
	}
	
	getDirection() {
		const {getDistanceMatrix} = this.props
		getDistanceMatrix()
	}

	open() {
		this.setState({dialog: true})
	}

	cancel() {
		this.setState({dialog: false})
	}

	_showTimePicker = () => this.setState({ isTimePickerVisible: true });

	_hideTimePicker = () => this.setState({ isTimePickerVisible: false });
  
	_handleTimePicked = (time) => {
		const now = moment(time).tz('Asia/Ho_Chi_Minh').format('HH:mm')
		console.log(now)
	  this._hideTimePicker();
	};

	async componentWillMount() {
		await this.props.getCurrentLocation()
    }

	componentDidUpdate(prevProps) {
        if(prevProps.destinationLocation !== this.props.destinationLocation) {
            this.getDirection()
        }
    }

	componentDidMount() {

	}

	_renderCart = () => {
		const {cart} = this.props
		if(cart.items.length === 0 ) null
		return (
			cart.items.map((item, index) => {
					return (
					<ListItem key={index}>
						<Left>
							<Badge style={[aligns.justifyCenter, aligns.alignCenter, {height:30, width:30, borderRadius: 50}]}><Text style={[text.textWhite, {fontSize: 10}]}>{item.qty}</Text></Badge>
							<Body>
								<Text style={text.fontWeightBold}>{item.name}</Text>
								<Text style={text.textDark}>{item.memo}</Text>
							</Body>
						</Left>
						<Right>
							<Text>{formatPrice(item.subTotal)}</Text>
						</Right>										
					</ListItem>
					)
			})		
		)
	}

    render() {
		const { handleSubmit, 
			reset, 
			name, 
			phone, 
			alert, 
			myLocation, 
			cart,
			destinationAddress,
			matrix,
			navigation,
			shipPrice,
			store
		} = this.props;
		const { loading, dialog, dateReceive } = this.state
		console.log(store)
        return(
            <View  style={styles.container}>  
				<Header style={[colors.white, styles.raised]} androidStatusBarColor='#B71C1C'> 
				<Left>
					<Button transparent rounded>
					<Icon name='arrow-back' style={text.textDark} />
					</Button>
				</Left>
				<Body>
					<Title style={text.textDark}>{store.name}</Title>
				</Body>
				</Header>
                <ScrollView>			
					<View style={styles.container}>		
						<Separator>
							<Text>THÔNG TIN ĐẶT HÀNG</Text>
						</Separator>
						<List style={[styles.cardRadius, colors.white, spacing.ma2]}>	
							<ListItem icon>
								<Left>
								<Button style={colors.blue} rounded transparent>
									<Icon active name="account" type="MaterialCommunityIcons" style={text.textWhite} />
								</Button>
								</Left>
								<Body>
									<Text>{name}</Text>
								</Body>
								<Right>
								<Button small transparent onPress={() => this.open()}>
									<Text style={text.textBlue}>Sửa</Text>
								</Button>
								</Right>
							</ListItem>

							<ListItem icon>
								<Left>
								<Button style={colors.redDarken3} rounded transparent>
									<Icon active name="cellphone" type="MaterialCommunityIcons" style={text.textWhite} />
								</Button>
								</Left>
								<Body>
									<Text>{phone}</Text>
								</Body>
								<Right>
								<Button small transparent>
									<Text style={text.textBlue}>Sửa</Text>
								</Button>
								</Right>
							</ListItem>

							<ListItem icon>
								<Left>
								<Button style={colors.indigoLighten1} rounded transparent>
									<Icon active name="map-marker" type="MaterialCommunityIcons" style={text.textWhite} />
								</Button>
								</Left>
								<Body>
									<Text>{destinationAddress ? destinationAddress : null}</Text>
								</Body>
								<Right>
								<Button small transparent onPress={() => navigation.navigate('Location')}>
									<Text style={text.textBlue}>Sửa</Text>
								</Button>
								</Right>
							</ListItem>

							<ListItem icon last>
								<Left>
								<Button style={colors.greenDarken3} rounded transparent>
									<Icon active name="clock" type="MaterialCommunityIcons" style={text.textWhite} />
								</Button>
								</Left>
								<Body>
									<Text>Giao vào <Text style={text.fontWeightBold}> 17: 50 </Text> hôm nay ngày {dateReceive}</Text>
								</Body>
								<Right>
								<Button small transparent onPress={this._showTimePicker}>
									<Text style={text.textBlue}>Sửa</Text>
								</Button>
								</Right>
							</ListItem>

						</List>

						<Separator>
							<Text>ĐƠN HÀNG</Text>
						</Separator>
						
						<List style={[styles.cardRadius, colors.white, spacing.ma2]}>	
						{
							this._renderCart()
						}				
						
						<ListItem last>
							<Left>
								<Text>Tổng {cart.items.length} món: </Text>
							</Left>
							<Right>
								<Text style={text.fontWeightBold}>280,000đ</Text>
							</Right>
						</ListItem>

						<ListItem last>
							<Left>
								<Text>Phí vận chuyển: <Text style={text.textRedAccent}>{matrix.distance ? matrix.distance.text : null}</Text></Text>
							</Left>
							<Right>
								<Text style={text.fontWeightBold}>{formatPrice(shipPrice)}</Text>
							</Right>
						</ListItem>
						</List>    
					</View>
	            </ScrollView>    
				<View style={{
					backgroundColor: '#FAFAFA',
					height         : 85,
					borderTopWidth : 0.5,
					borderColor    : '#FAFAFA'
				}}>
					
						<ListItem last>
							<Left>
								<Text>Tổng cộng: </Text>
							</Left>
							<Right>
								<Text style={text.fontWeightBold}>292.000đ</Text>
							</Right>
						</ListItem>
						<Button  block small rounded rightIcon style={colors.greenDarken3}>
							<Icon name='cart' style={text.textWhite} />
							<Text style={text.textWhite}>Xác nhận đơn hàng</Text>
						</Button>
					
                </View>
				
				<Modal
					isVisible       = {this.state.dialog}
					onBackdropPress = {() => this.setState({ dialog: false })}
					deviceWidth     = {deviceWidth}
					deviceHeight    = {deviceHeight*3/4}
					style           = {{margin:0, justifyContent: "flex-end"}}
            	>
					<View style={[{height: deviceHeight*2/4, bottom:0}, colors.white]}>
						<Header style={colors.white} androidStatusBarColor="#D50000">
							<Button transparent onPress={() => this.cancel()} rounded >
								<Icon name='close' style={text.textDark}></Icon>
							</Button>										
							<Body>
								<Text>

								</Text>
							</Body>
							<Right>
								<Button transparent onPress={() => this.cancel()} rounded >
									<Text style={text.textBlue}>Xong</Text>
								</Button>	
							</Right>
						</Header> 
						<Divider></Divider>       
						<Form style={spacing.mx2}>

							<Field 
								name        = "name"
								icon        = {true}
								iconName    = {'account'}
								placeholder = 'Họ tên'
								component   = {renderField}
							/>

							<Field 
								name        = "phone"
								icon        = {true}
								iconName    = {'cellphone'}
								placeholder = 'Số điện thoại'
								component   = {renderField}
							/>
						
						</Form>                          
					</View>                
				</Modal>

				<DateTimePicker
					isVisible = {this.state.isTimePickerVisible}
					onConfirm = {this._handleTimePicked}
					onCancel  = {this._hideTimePicker}
					mode      = {'time'}
				/>
            </View>
            
        )
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }
}

const scopedStyles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex  : 1,
        height: CARD_HEIGHT
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
        width : '100%',
        flex  : 1
	},
})

export default Checkout