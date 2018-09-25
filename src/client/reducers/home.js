/* @flow */

import moment from 'moment';
import type { State, Action } from '@client/types/home';

const initialState = {
  isSyncing: false,
  year: moment().format('YYYY'),
  quarter: moment().format('Q'),
  favorites: [],
  list: [],
};

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'HOME_SYNCING':
      return {
        ...state,
        isSyncing: true,
      };

    case 'DONE_FETCH_FAVORITES':
      return {
        ...state,
        favorites: action.payload,
      };

    case 'DONE_FETCH_ANIMES':
      return {
        ...state,
        isSyncing: true,
        list: action.payload,
      };

    case 'DONE_REGISTER_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    case 'DONE_UNREGISTER_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(id => id !== action.payload),
      };

    default:
      return state;
  }
};
