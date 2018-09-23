/* @flow */

import express from 'express';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import hpp from 'hpp';
import chalk from 'chalk';

import { host, port } from '@config';
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
  const webpackConfig = require('../../tools/webpack/config.babel');
  const compiler = webpack(webpackConfig);
  
  compiler.apply(new webpack.ProgressPlugin());

  app.use(
    require('webpack-dev-middleware')(compiler, {
      publicPath: webpackConfig.output.publicPath,
      headers: { 'Access-Control-Allow-Origin': '*' },
      hot: true,
      quiet: true, // Turn it on for friendly-errors-webpack-plugin
      noInfo: true,
      stats: 'minimal',
      serverSideRender: true
    })
  );

  app.use(
    require('webpack-hot-middleware')(compiler, {
      log: false,
    })
  );
}

app.use('/', serverSideRendering);

if (port) {
  app.listen(port, host, err => {
    const url = `http://${host}:${port}`;
  
    if (err) console.error(chalk.red(`==> ${err}`));
  
    console.info(chalk.green(`==> 🌎  Listening at ${url}`));
  }); 
} else {
  console.error(
    chalk.red('==> 😇')
  );
}
