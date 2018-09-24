/* @flow */

import type { Dispatch, GetState } from '@client/types';

const apiVersion = 1;

export const homeSyncing = () => (dispatch: Dispatch) => dispatch({ type: 'HOME_SYNCING' });

export const fetchAnimes = (nextYear: ?string, nextQuarter: ?string) => async (
  dispatch: Dispatch,
  getState: GetState,
  axios: any,
) => {
  dispatch(homeSyncing());

  const { home } = getState();
  const year = nextYear != null ? nextYear : home.year;
  const quarter = nextQuarter != null ? nextQuarter : home.quarter;
  const { data } = await axios({
    url: `http://api.moemoe.tokyo/anime/v${apiVersion}/master/${year}/${quarter}`,
    method: 'GET',
  });

  dispatch({ type: 'DONE_FETCH_ANIMES', payload: data });
};
