/* @flow */

import React from 'react';
import { hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import { renderRoutes } from 'react-router-config';
import { loadComponents } from 'loadable-components';

import configureStore from './configureStore';
import routes from './routes';

const initialState = window.__INITIAL_STATE;
const history = createHistory();
const store = configureStore(history, initialState);

const render = (Routes: Array<Object>) => {
  hydrate(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>{renderRoutes(Routes)}</ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

loadComponents.then(() => render(routes));
