import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './cart/cartReducer';
import rootSaga from './cart/cartSagas';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const store = createStore(reducers, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);

export default store;
