/* @flow */

import type { $Request, $Response } from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import { ServerStyleSheet } from 'styled-components';
import { getLoadableState } from 'loadable-components/server';
import createHistory from 'history/createMemoryHistory';

import renderHtml from '@server/utils/renderHtml';
import routes from '@client/routes';

import configureStore from '@client/configureStore';
import assets from '../../../public/webpack-assets.json';

export default (req: $Request, res: $Response) => {
  const history = createHistory();
  const store = configureStore(history);
  const loadBranchData = (): Promise<any> => {
    const branch = matchRoutes(routes, req.path);
    const promises = branch.map(({ route, match }) => {
      if (route.loadData) {
        return Promise.all(
          route
            .loadData({ params: match.params, getState: store.getState })
            .map(item => store.dispatch(item)),
        );
      }

      return Promise.resolve(null);
    });

    return Promise.all(promises);
  };

  (async () => {
    try {
      await loadBranchData();

      const sheet = new ServerStyleSheet();
      const staticContext = {};
      const AppComponent = (
        <Provider store={store}>
          <StaticRouter location={req.path} context={staticContext}>
            {renderRoutes(routes)}
          </StaticRouter>
        </Provider>
      );
      const head = Helmet.renderStatic();
      const initialState = store.getState();

      if (staticContext.url) {
        res.status(301).setHeader('Location', staticContext.url);
        res.end();

        return;
      }

      const loadableState = await getLoadableState(AppComponent);
      const status = staticContext.status === '404' ? 404 : 200;
      const htmlContent = renderToString(sheet.collectStyles(AppComponent));
      const styles = sheet.getStyleTags();
      const loadableStateTag = loadableState.getScriptTag();

      res
        .status(status)
        .send(renderHtml(head, assets, htmlContent, initialState, styles, loadableStateTag));
    } catch (err) {
      res.status(404).send('Not Found');

      console.error(new Error(err));
    }
  })();
};
