/* @flow */

import loadable from 'loadable-components';

import { Error, Loading } from '@client/components';

export default loadable(() => import('./Home'), {
  Error,
  Loading,
});
