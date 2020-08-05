import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import history from '../../history.js';
import configureStore from 'redux-mock-store';

import Header from './header.jsx';
import {Provider} from 'react-redux';

const mockStore = configureStore([]);

const store = mockStore({
  USER: {authorizationStatus: `NO_AUTH`}
});

it(`Header should render Header`, () => {
  const tree = renderer
    .create(
        <Provider store={store}>
          <Router history={history}>
            <Header
              authorizationStatus={`NO_AUTH`}
            >
            </Header>
          </Router>
        </Provider>

    ).toJSON();

  expect(tree).toMatchSnapshot();
});
