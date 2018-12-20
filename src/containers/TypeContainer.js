import { connect } from 'react-redux'

import { fetchStoreFromAPI, defaultStore } from '../store/actions'

import TypeScreen from '../screens/TypeStore'

function mapStateToProps(state) {
	return {
        isFetching: state.store.isFetching,
        stores    : state.store.stores
	}
}

function mapDispatchToProps(dispatch) {
	return {
        fetchStoreByType : (data) => dispatch(fetchStoreFromAPI(data)),
        destroyFetchStore: () => dispatch(defaultStore())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TypeScreen);
