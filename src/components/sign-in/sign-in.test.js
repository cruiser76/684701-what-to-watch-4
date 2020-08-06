import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import history from '../../history.js';

import SignIn from './sign-in.jsx';

it(`SignIn should render SignIn`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <SignIn
            onSubmit={() => {}}
          />
        </Router>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
