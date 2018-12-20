import React, { Component } from 'react'

import { 
	View, 
	Image, 
	AsyncStorage,
	ScrollView
} from 'react-native'

import {
	Header,
	Content,
	Left,
	Body,
	Card,
	CardItem,
	Form,
	Item,
	Input,
	Label,
	Text,
	Button,
	Icon,
	Spinner,
} from 'native-base'

import Divider from '../../components/commons/Divider'

import { Field } from 'redux-form'
import { connect } from 'react-redux'

import { styles, colors, text, spacing, aligns} from '../../styles'
import API from '../../services/api'
import deviceStorage from '../../services/deviceStorage';

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

class Register extends Component {

    static navigationOptions = ({ navigation }) => ({      
        title      : 'ĐĂNG KÝ',
        tabBarLabel: 'ĐĂNG KÝ',
        tabBarIcon : ({ tintColor, focused }) => (
			<Icon type="MaterialCommunityIcons" name={"account-plus"} style={{ color: tintColor, fontSize: 25 }} />
		)
    })

	constructor(props) {
	    super(props)
	    this.state = {
	        loading: false
	    }
	    this._register = this._register.bind(this)
    }

    _register(values) {
    	var   vm                             = this
    	const { loading }                    = vm.state
    	const {alert, navigation, showAlert} = this.props
    	if(!loading) {
	    	vm.setState({error: '', loading: true})	    	
	    	setTimeout(() => {

	    		API.post('/Credentials/Register', values, {withCredentials: true}).then(response => {
	    			if(response.status === 201) {
	   					this.props.showAlert({routeName: 'Login', index: 0, type: response.data.type, message: response.data.message, close: true})
	   					navigation.navigate('Login')
	    			}
	    		}).catch((error) => {
	    			if(error.response.status == 422) {
						var mes = ''

						Object.values(error.response.data.errors).map((item) => {
							mes += item[0] + ' ';
						})
						showAlert({routeName: navigation.state.routeName, index: 0, type: 'error', message: mes, close: true})
					}
	    		}).finally(() => {
	    			vm.setState({error: '', loading: false})
	    		})

	    	}, 100)
    	}
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

    render() {
    	const { handleSubmit, reset, name, email, phone, password, confirm, alert } = this.props;
    	const { loading }                                                           = this.state
        return (
            <View style={[styles.container,  aligns.justifyCenter, colors.white]}>
            	<ScrollView>	
            		<View style={[aligns.alignCenter, aligns.justifyCenter, colors.white, {flex: 1}]}>
	            			
	            		<Image source={require('../../assets/img/logo96x96.png')}  style={[styles.cardRadius, spacing.mt4, {width: 72, height: 72}]}/>
	            			
	            		<CardItem>
	            			<Text style={[text.headline, text.fontWeightBold, text.textRedDarken]}>
	            				Dofuu.com
	            			</Text>
	            		</CardItem>
            		</View>
				
	            	<Card transparent style={[styles.cardRadius, spacing.ma5, {flex:3}]}>	
            			<Text style={[text.fontWeightBold, text.textDark, {alignSelf: 'center'}]}>
            				Tạo tài khoản
            			</Text>
						<Form>
							{
								this._renderAlert()
							}							
							<CardItem>   
								<Body>
									<Field 
										name        = "name"
										icon        = {true}
										iconName    = {'account'}
										placeholder = 'Họ và tên'
										component   = {renderField}
									/>

									<Field 
										name        = "email"
										icon        = {true}
										iconName    = {'gmail'}
										placeholder = 'Địa chỉ email'
										component   = {renderField}
									/>

									<Field 
										name        = "phone"
										icon        = {true}
										iconName    = {'cellphone'}
										placeholder = 'Số điện thoại'
										component   = {renderField}
									/>

									<Field 
										name        = "password"
										icon        = {true}
										iconName    = {'lock'}
										placeholder = 'Mật khẩu'
										secureText  = {true}
										component   = {renderField}
									/>

									<Field 
										name        = "confirm"
										icon        = {true}
										iconName    = {'lock'}
										placeholder = 'Xác nhận mật khẩu'
										secureText  = {true}
										component   = {renderField}
									/>
						         
								</Body>					          
					        </CardItem>  		            
				        </Form>
					    <CardItem >
					    	<Body>
					    		<Button block disabled={loading} rounded small style={!loading ? colors.redAccent4 : null} onPress={handleSubmit(this._register)} >
				            		{(loading ) ? <Spinner color='white' /> : <Text>Đăng Ký </Text>}				            		
							    </Button>	
					    	</Body>					    	
	            		</CardItem>       	      
	                </Card>    
	            </ScrollView>        
            </View>
        )
    }
}

export default Register

