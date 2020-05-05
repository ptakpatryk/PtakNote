import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducer/auth';
import appContent from './reducer/appContent';

const rootReducer = combineReducers({
  app: appContent,
  auth: authReducer,
});
const composeEnhancers =
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

/* eslint-disable no-underscore-dangle */
const store = createStore(rootReducer, compose(applyMiddleware(thunk), composeEnhancers));

export default store;
