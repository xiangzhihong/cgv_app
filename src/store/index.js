import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import reducers from './reducers';
import rootSaga from './sagas';
import persistConfig from './persist';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, applyMiddleware(...middlewares));

store.persist = persistStore(store);

sagaMiddleware.run(rootSaga);

export default store;
