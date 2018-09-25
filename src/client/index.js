/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import { renderRoutes } from 'react-router-config';
import { loadComponents } from 'loadable-components';

import configureStore from './utils/configureStore';
import routes from './routes';

const initialState = window.__INITIAL_STATE;
const history = createHistory();
const store = configureStore(history, initialState);
const render = (Routes: Array<Object>) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>{renderRoutes(Routes)}</ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

loadComponents().then(() => {
  render(routes);
});

if (module.hot) {
  module.hot.accept('./routes', () => {
    try {
      const nextRoutes = require('./routes').default;

      render(nextRoutes);
    } catch (error) {
      console.error(`==> Routes hot reloading error ${error}`);
    }
  });
}
