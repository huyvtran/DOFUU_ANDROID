import HomeScreen from '../../screens/BottomTabs/Home'

import { connect } from 'react-redux'
import {  } from '../../store/actions'

const mapStateToProps = (state) => {
    return {
		isLoggedIn : state.auth.isLoggedIn,
		user       : state.auth.user,
		cities     : state.city.cities,
		currentCity: state.city.currentCity
    };
}
 
const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
