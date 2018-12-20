import ProfileScreen from '../../screens/BottomTabs/Profile'

import { connect } from 'react-redux'
import { logout } from '../../store/actions'

const mapStateToProps = (state) => {
    return {
		isLoggedIn: state.auth.isLoggedIn,
		user      : state.auth.user
    };
}
 
const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(logout())
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
