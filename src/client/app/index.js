/* @flow */

import React from 'react';
import { renderRoutes } from 'react-router-config';
import Helmet from 'react-helmet';
import { hot } from 'react-hot-loader';

import '@client/styles/reset';
import config from '@config';
import { Footer, Header } from '@client/components';
import { Wrapper, Main } from './styles';

type Props = {
  route: Object,
};

const App = ({ route }: Props) => (
  <Wrapper>
    <Helmet {...config.app} />
    <Header />
    <Main>{renderRoutes(route.routes)}</Main>
    <Footer />
  </Wrapper>
);

export default hot(module)(App);
