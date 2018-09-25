/* @flow */

import type { Dispatch, GetState } from '@client/types';
import cookie from '@client/utils/cookie';

const apiVersion = 1;

export const homeSyncing = () => (dispatch: Dispatch) => dispatch({ type: 'HOME_SYNCING' });

export const fetchFavorites = () => (dispatch: Dispatch, getState: GetState) => {
  const favorites = cookie.getValue();
  let payload;

  if (favorites != null) {
    payload = favorites;
  } else {
    const { home } = getState();

    payload = home.favorites;
    cookie.setValue(JSON.stringify(payload));
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

export const registerFavorite = (animeId: number) => (dispatch: Dispatch) => {
  cookie.setValue(JSON.stringify([...cookie.getValue(), animeId]));
  dispatch({ type: 'DONE_REGISTER_FAVORITE', payload: animeId });
};

export const unregisterFavorite = (animeId: number) => (dispatch: Dispatch, getState: GetState) => {
  const { home } = getState();

  cookie.setValue(home.favorites.filter(id => id !== animeId));
  dispatch({ type: 'DONE_UNREGISTER_FAVORITE', payload: animeId });
};
