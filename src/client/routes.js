/* @flow */

import * as homeAction from '@client/actions/home';
import asyncHome from '@client/pages';
import App from './app';

export default [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: asyncHome,
        loadData: () => [homeAction.fetchAnimes()],
      },
    ],
  },
];
