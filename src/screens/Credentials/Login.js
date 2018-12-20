import React, { Component } from 'react'

import { View, Image, AsyncStorage, ScrollView } from 'react-native'

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


class Login extends Component {

    static navigationOptions = ({ navigation }) => ({
        title      : 'ĐĂNG NHẬP',
        tabBarLabel: 'ĐĂNG NHẬP',
        tabBarIcon : ({ tintColor, focused }) => (
			<Icon type="MaterialCommunityIcons" name={"login-variant"} style={{ color: tintColor, fontSize: 25 }} />
		)
    })

	constructor(props) {
	    super(props)
	    this.state = {
	        loading: false,
	        token  : null
	    }

	    this._login = this._login.bind(this)
    }

    _login(values) {
    	var   vm                                 = this
    	const { loading, token }                 = vm.state
    	const { navigation, onLogin, showAlert } = vm.props
    	const { username, password }             = values
    	if(!loading) {
	    	vm.setState({loading: true})	    	
	    	setTimeout(() => {
	    		API.post('/Credentials/Login', {email: username, password: password}).then(response => {
	    			if(response.data.type === 'error') {
	    				vm.setState({loading: false})
	    				showAlert({routeName: navigation.state.routeName, index: 0, type: 'error', message: response.data.message, close: true})
	    			} else {
	    				deviceStorage.saveItem('token', response.data.access_token)
						deviceStorage.saveItem('expires_in', response.data.expires_in)
	    				onLogin(response.data.access_token)	    
	    				navigation.navigate('App')				
	    			}
	    		}).catch(error => {
	    			vm.setState({loading: false})
	    			if(error.response.status === 401) {
	    				showAlert({routeName: navigation.state.routeName, index: 0, type: 'error', message: 'Email hoặc mật khẩu không đúng', close: true})
					}
	    		})
	    	}, 100)
    	}
    }

    _loginFB() {
    	
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
    	const { handleSubmit, reset, username, password, navigation } = this.props;
    	const { loading }                                             = this.state
        return (
            <View style={[styles.container, colors.white]}>
            	<ScrollView>
            		<View style={[aligns.alignCenter, aligns.justifyCenter, colors.white, {flex:1}]}>
	            			
	            		<Image source={require('../../assets/img/logo96x96.png')}  style={[styles.cardRadius, spacing.mt4, {width: 72, height: 72}]}/>
	            			
	            		<CardItem>
	            			<Text style={[text.headline, text.fontWeightBold, text.textRedDarken]}>
	            				Dofuu.com
	            			</Text>
	            		</CardItem>
            		</View>

	            	<Card transparent style={[styles.cardRadius, spacing.ma5, {flex:2}]} >	   
	            		
	            		<Text style={[text.fontWeightBold, text.textDark, {alignSelf: 'center'}]}>
            				Đăng nhập với tài khoản
            			</Text>  	
            			
						<Form>
								
							<CardItem>   
								<Body>
									<Field 
									name        = "username"
									icon        = {true}
									iconName    = {isNaN(username) ? 'email' : 'phone'}
									placeholder = 'Email hoặc số điện thoại'
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
								</Body>					          
					        </CardItem>   			            
						</Form>

					    <CardItem >
					    	<Body>
					    		<Button block rounded small disabled={loading} style={!loading ? colors.redAccent4 : null} iconLeft onPress={handleSubmit(this._login)}>
				            		{(loading ) ? <Spinner color='white' /> : <Text>Đăng nhập </Text>}	
							    </Button>	
					    	</Body>					    	
	            		</CardItem>       	
	                </Card>
					<Divider inset />
	                <Card transparent style={{flex:1}}>
	                	<Text style={[text.fontWeightBold, text.textDark, {alignSelf: 'center'}]}>
            				Đăng nhập nhanh với
            			</Text>  	
						<CardItem footer style={styles.cardFooter}>
					    	<Body>
					    		<Button block rounded small style={colors.indigoLighten1} iconLeft onPress={()=> this._loginFB()} >
					    			<Icon name='facebook-box' type="MaterialCommunityIcons" style={{fontSize: 28}} />
				            		<Text>Tiếp tục với facebook</Text>
							    </Button>	
					    	</Body>					    	
	            		</CardItem> 
	                </Card>        			
	           	</ScrollView>                  
            </View>
        )
    }
}

export default Login

