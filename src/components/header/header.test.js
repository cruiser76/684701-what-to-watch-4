import React from 'react';
import renderer from 'react-test-renderer';

import Header from './header.jsx';

it(`Header should render Header`, () => {
  const tree = renderer
    .create(
        <Header
          authorizationStatus={`NO_AUTH`}
          href={`main.html`}
        />).toJSON();

  expect(tree).toMatchSnapshot();
});
