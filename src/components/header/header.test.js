import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import history from './../../history.js';
import Header from './header.jsx';

it(`Header should render Header`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <Header
            authorizationStatus={`NO_AUTH`}
          >
          </Header>
        </Router>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
