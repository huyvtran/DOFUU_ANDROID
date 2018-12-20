import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk'
//Redux saga
// import createSagaMiddleware from 'redux-saga';
// import rootSaga from './sagas/rootSaga';

//Middleware
// const sagaMiddleware = createSagaMiddleware();

import allReducers from './reducers'

const middlewares = [thunk];

const store       = createStore(
	allReducers,
	{},
	applyMiddleware(...middlewares)
)
// sagaMiddleware.run(rootSaga);
export default store;
