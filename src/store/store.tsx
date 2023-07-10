import { applyMiddleware, createStore } from 'redux';
import dataReducer from './redusers/leventsList-reduser';
import createSagaMiddleware from 'redux-saga';

import newsWatcher from './sagas/leventsList-saga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(dataReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(newsWatcher);

export default store;