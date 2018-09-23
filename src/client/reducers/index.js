/* @flow */

import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

const reducers = {
  router,
};

export type Reducers = typeof reducers;
export default combineReducers(reducers);
