/* @flow */

import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

type Props = {};

export class Home extends React.PureComponent<Props> {
  componentDidMount() {
    console.log('did');
  }

  render() {
    return (
      <>
        <div>hoge</div>
      </>
    );
  }
}

const connector = connect();

export default compose(connector)(Home);
