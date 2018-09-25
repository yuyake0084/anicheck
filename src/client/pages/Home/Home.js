/* @flow */

import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import * as homeAction from '@client/actions/home';
import type { Home as HomeType, Dispatch } from '@client/types';
import { List } from '@client/components';
import { Result } from './styles';

type Props = {
  home: HomeType,
  fetchFavorites: Function,
  fetchAnimes: Function,
  registerFavorite: (animeId: number) => void,
  unregisterFavorite: (animeId: number) => void,
};

export class Home extends React.PureComponent<Props> {
  componentDidMount() {
    const { fetchFavorites, fetchAnimes } = this.props;

    fetchFavorites();
    fetchAnimes();
  }

  handleClickLike = (e: SyntheticEvent<HTMLDivElement>, animeId: number, isFavorited: boolean) => {
    e.preventDefault();

    const { registerFavorite, unregisterFavorite } = this.props;

    if (!isFavorited) {
      registerFavorite(animeId);
    } else {
      unregisterFavorite(animeId);
    }
  };

  render() {
    const { home } = this.props;

    return (
      <>
        <Helmet title="ホーム" />
        <Result>{`チェック済 ${home.favorites.length}本 / 全${home.list.length}本`}</Result>
        <List
          dataArray={home.list}
          favorites={home.favorites}
          handleClickLike={this.handleClickLike}
        />
      </>
    );
  }
}

const connector = connect(
  ({ home }) => ({ home }),
  (dispatch: Dispatch) => ({
    fetchFavorites: () => dispatch(homeAction.fetchFavorites()),
    fetchAnimes: () => dispatch(homeAction.fetchAnimes()),
    registerFavorite: (animeId: number) => dispatch(homeAction.registerFavorite(animeId)),
    unregisterFavorite: (animeId: number) => dispatch(homeAction.unregisterFavorite(animeId)),
  }),
);

export default compose(connector)(Home);
