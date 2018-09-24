/* @flow */

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
      },
    ],
  },
];
