/* @flow */

import express from 'express';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import hpp from 'hpp';

import { port } from '@config';
import serverSideRendering from './middlewares/serverSideRendering';

const app = express();

if (!__DEV__) {
  app.use(
    express.static(path.resolve(process.cwd(), 'public'), {
      setHeaders: res => res.set('Service-Worker-Allowed', '/')
    })
  );
} else {
  const webpack = require('webpack');
}

app.use('/', serverSideRendering);

if (port) {

}
