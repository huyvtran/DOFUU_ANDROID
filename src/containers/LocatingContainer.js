import LocatingScreen from '../screens/Locating'

import { connect } from 'react-redux'
import { showAlert, getCurrentLocation, getAddressPredictions, toggleSearchResult, getSelectedAddress } from '../store/actions'

const mapStateToProps = (state) => {
    return {
        myLocation     : state.location.myLocation,
        predictions    : state.location.predictions || [],
        selectedAddress: state.location.selectedAddress
    };
}
 
const mapDispatchToProps = (dispatch) => {
    return {
        showAlert            : (data) => { dispatch(showAlert(data)) },
        getCurrentLocation   : () => {dispatch(getCurrentLocation())},
        toggleSearchResult   : () => {dispatch(toggleSearchResult())},
        getAddressPredictions: (keywords) => {dispatch(getAddressPredictions(keywords))},
        getSelectedAddress   : (placeId) => {dispatch(getSelectedAddress(placeId))}
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(LocatingScreen);
