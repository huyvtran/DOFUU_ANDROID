import LocationScreen from '../screens/Location'

import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { showAlert, getCurrentLocation } from '../store/actions'

const mapStateToProps = (state) => {
    console.log(state)
    return {
        store          : state.store.store,
        destination    : state.location.selectedAddress.location ? state.location.selectedAddress.location: state.location.myLocation,
        address        : state.location.selectedAddress.address || 'Vị trí hiện tại',
        selectedAddress: state.location.selectedAddress,
        shipPrice      : state.location.shipPrice
    };
}
 
const mapDispatchToProps = (dispatch) => {
    return {
		showAlert         : (data) => { dispatch(showAlert(data)) },
		getCurrentLocation: () => {dispatch(getCurrentLocation())},
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(LocationScreen);
