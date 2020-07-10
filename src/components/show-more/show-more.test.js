import React from 'react';
import renderer from 'react-test-renderer';

import ShowMore from './show-more.jsx';

const props = {
  onMoreBtnClick: () => {},
  isMoreBtnShow: true
};

it(`Show-more render correctly`, () => {
  const tree = renderer
    .create(
        <ShowMore
          {...props}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
