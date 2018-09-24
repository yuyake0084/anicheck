/* @flow */

import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import { createLogger } from 'redux-logger';

import rootReducer from './reducers';

export default (history: Object, initialState: Object = {}) => {
  const middlewares = [thunk.withExtraArgument(axios), routerMiddleware(history)];
  let middleware;

  if (!__DEV__ && !__SERVER__) {
    middleware = applyMiddleware(...middlewares);
  } else {
    middleware = applyMiddleware(...middlewares, createLogger());
  }

  const composeEnhancers =
    (__DEV__ && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
  const enhancers = composeEnhancers(middleware);
  const store = createStore(rootReducer, initialState, enhancers);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      try {
        const nextReducer = require('./reducers').default;

        store.replaceReducer(nextReducer);
      } catch (error) {
        console.error(`==> 😭  Reducer hot reloading error ${error}`);
      }
    });
  }

  return store;
};
