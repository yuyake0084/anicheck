/* @flow */

import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import * as homeActions from '@client/actions/home';
import type { Home as HomeType, Dispatch } from '@client/types';
import { List } from '@client/components';
import { Result } from './styles';

type Props = {
  home: HomeType,
  fetchAnimes: Function,
};

export class Home extends React.PureComponent<Props> {
  componentDidMount() {
    const { fetchAnimes } = this.props;

    fetchAnimes();
  }

  render() {
    const { home } = this.props;

    return (
      <>
        <Result>{`全${home.list.length}件`}</Result>
        <List dataArray={home.list} />
      </>
    );
  }
}

const connector = connect(
  ({ home }) => ({ home }),
  (dispatch: Dispatch) => ({
    fetchAnimes: () => dispatch(homeActions.fetchAnimes()),
  }),
);

export default compose(connector)(Home);
