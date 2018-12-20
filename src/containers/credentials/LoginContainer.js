
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'

import { login, showAlert } from '../../store/actions'
import LoginScreen from '../../screens/Credentials/Login'

const validate = values => {
	const errors          = {}
	      errors.username = ''
	      errors.password = ''
	var   username        = values.username;
	var   password        = values.password
	if(values.username === undefined){
    	username = '';
  	}
	if(values.password === undefined){
	    password = '';
	}

	if(username.length === 0) {
		errors.username = 'Bắt buộc'
	} else if (!isNaN(username)) {
		if(username.length != 10) {
			errors.username = "Bắt buộc 10 ký tự số"
		}
	} else {
		if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(username)) {
			errors.username = "Email không đúng định dạng"
		}
	}

	if(password.length < 8) {
		errors.password = 'Tối thiểu 8 ký tự'
	}
	return errors
}

const selector = formValueSelector('login')

const LoginForm = reduxForm({
	form: 'login',
	validate
})(LoginScreen)

const mapStateToProps = (state, ownProps) => {
    return {
    	username: selector(state, 'username'),
    	password: selector(state, 'password'),
    	alert   : state.alert
    };
}
 
const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (token) => {
            dispatch(login(token))
        },
        showAlert: (data) => {
        	dispatch(showAlert(data))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
