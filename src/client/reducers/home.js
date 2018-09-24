/* @flow */

import type { State, Action } from '@client/types/home';

const initialState = {
  isSyncing: false,
  list: [],
};

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};
