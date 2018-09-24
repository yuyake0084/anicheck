/* @flow */

import React from 'react';
import { renderRoutes } from 'react-router-config';
import Helmet from 'react-helmet';
import { hot } from 'react-hot-loader';

import config from '@config';
import { Wrapper, Main } from './styles';

type Props = {
  route: Object,
};

const App = ({ route }: Props) => (
  <Wrapper>
    <Helmet {...config.app} />
    <Main>{renderRoutes(route.routes)}</Main>
  </Wrapper>
);

export default hot(module)(App);
