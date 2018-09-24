/* @flow */

import moment from 'moment';
import type { State, Action } from '@client/types/home';

const initialState = {
  isSyncing: false,
  year: moment().format('YYYY'),
  quarter: moment().format('Q'),
  list: [],
};

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'HOME_SYNCING':
      return {
        ...state,
        isSyncing: true,
      };

    case 'DONE_FETCH_ANIMES':
      return {
        ...state,
        isSyncing: true,
        list: action.payload,
      };

    default:
      return state;
  }
};
