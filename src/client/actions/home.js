/* @flow */

import type { Dispatch, GetState } from '@client/types';
import cookie from '@client/utils/cookie';

const apiVersion = 1;

export const homeSyncing = () => (dispatch: Dispatch) => dispatch({ type: 'HOME_SYNCING' });

export const fetchFavorites = () => (dispatch: Dispatch) => {
  const favorites = cookie.getValue();
  let payload;

  if (favorites != null) {
    payload = favorites;
  } else {
    const dataArray = [];

    cookie.setValue(JSON.stringify(dataArray));
    payload = dataArray;
  }

  dispatch({ type: 'DONE_FETCH_FAVORITES', payload });
};

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

export const registerFavorite = (id: number) => (dispatch: Dispatch) => {
  cookie.setValue(JSON.stringify([...cookie.getValue(), id]));
  dispatch({ type: 'DONE_REGISTER_FAVORITE', payload: id });
};
