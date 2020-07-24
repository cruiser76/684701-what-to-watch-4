import React from 'react';
import renderer from 'react-test-renderer';

import Footer from './footer.jsx';

it(`Footer should render Footer`, () => {
  const tree = renderer
    .create(
        <Footer
          href={`#`}
        />).toJSON();

  expect(tree).toMatchSnapshot();
});
