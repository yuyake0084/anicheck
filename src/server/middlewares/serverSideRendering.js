/* @flow */

import type { $Request, $Response } from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ServerStyleSheet } from 'styled-components';
import Helmet from 'react-helmet';
import { getLoadableState } from 'loadable-components/server';
import createHistory from 'history/createMemoryHistory';
import renderHtml from '@server/utils/renderHtml';
import assets from '../../../public/webpack-assets.json';

export default (req: $Request, res: $Response) => {
  console.log(req);
};
