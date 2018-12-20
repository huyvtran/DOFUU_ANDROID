import AuthLoadingScreen from '../screens/AuthLoading'

import { connect } from 'react-redux'
import { checkAuth, login, fetchCities, getCurrentCity } from '../store/actions'

const mapStateToProps = (state) => {
    return {
		isLoggedIn: state.auth.isLoggedIn,
		token     : state.auth.token,
		user      : state.auth.user
    };
}
 
const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (token) => {
            dispatch(login(token))
        },
        fetchCities: () => {
            dispatch(fetchCities())
        },
        getCurrentCity: (cityId) => {
            dispatch(getCurrentCity(cityId))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
