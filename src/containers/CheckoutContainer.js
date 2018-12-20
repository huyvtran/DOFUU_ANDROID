import CheckoutScreen from '../screens/Checkout'

import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { showAlert, getCurrentLocation, getDistanceMatrix } from '../store/actions'


const validate = values => {
	const errors       = {}
	      errors.name  = ''
	      errors.phone = ''
	
	var name  = values.name
	var phone = values.phone
    
	if(values.name === undefined){
    	name = '';
      }
      
  	if(values.phone === undefined){
    	phone = '';
  	}

	if(name.length === 0) {
		errors.name = 'Bắt buộc'
	} 

	if(phone.length != 10) {
		errors.phone = 'Bắt buộc 10 ký tự số'
	} else if(isNaN(phone)) {
		errors.phone = 'Phải là ký tự số'
	}

	return errors
}

const selector = formValueSelector('checkout')

// const CheckoutForm = reduxForm({
// 	form: 'checkout',
// 	validate
// })(CheckoutScreen)

const mapStateToProps = (state) => {
    console.log(state)
    return {
        name               : 'Nguyễn Trung Trực',
        phone              : '0932903406',
        cart               : state.cart.cart,
        store              : state.store.store,
        currentCity        : state.city.currentCity,
        user               : state.auth.user,
        alert              : state.alert,
        myLocation         : state.location.myLocation,
        destinationAddress : state.location.destinationAddress,
        destinationLocation: state.location.destinationLocation,
        selectedAddress    : state.location.selectedAddress,
        matrix             : state.location.matrix,
        shipPrice          : state.location.shipPrice
    };
}
 
const mapDispatchToProps = (dispatch) => {
    return {
		showAlert         : (data) => { dispatch(showAlert(data)) },
		getCurrentLocation: () => {dispatch(getCurrentLocation())},
		getDistanceMatrix : () => {dispatch(getDistanceMatrix())}
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(CheckoutScreen);
