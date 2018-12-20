import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'

import { showAlert } from '../../store/actions'
import RegisterScreen from '../../screens/Credentials/Register'

const validate = values => {
	const errors          = {}
	      errors.name     = ''
	      errors.email    = ''
	      errors.phone    = ''
	      errors.password = ''
	      errors.comfirm  = ''

	var name     = values.name
	var email    = values.email
	var phone    = values.phone
	var password = values.password
	var confirm  = values.confirm

	if(values.name === undefined){
    	name = '';
  	}
  	if(values.email === undefined){
    	email = '';
  	}
  	if(values.phone === undefined){
    	phone = '';
  	}
	if(values.password === undefined){
	    password = '';
	}
	if(values.confirm === undefined){
	    confirm = '';
	}

	if(name.length === 0) {
		errors.name = 'Bắt buộc'
	} 

	if(email.length === 0) {
		errors.email = 'Bắt buộc'
	} else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
		errors.email = "Email không đúng định dạng"
	}

	if(phone.length != 10) {
		errors.phone = 'Bắt buộc 10 ký tự số'
	} else if(isNaN(phone)) {
		errors.phone = 'Phải là ký tự số'
	}

	if(password.length < 8) {
		errors.password = 'Tối thiểu 8 ký tự'
	}

	if(confirm != password) {
		errors.confirm = 'Mật khẩu không khớp'
	}
	return errors
}


const selector = formValueSelector('register')

const RegisterForm = reduxForm({
	form: 'register',
	validate
})(RegisterScreen)


const mapStateToProps = (state, ownProps) => {
    return {
        name    : selector(state, 'name'),
        email   : selector(state, 'email'),
        phone   : selector(state, 'phone'),
        password: selector(state, 'password'),
        confirm : selector(state, 'confirm'),
        alert   : state.alert
    };
}
 
const mapDispatchToProps = (dispatch) => {
    return {
        onLogin  : (username, password) => { dispatch(login(username, password)) },
        showAlert: (data) => { dispatch(showAlert(data)) },
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
