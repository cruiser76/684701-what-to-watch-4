import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';
import ShowMore from './show-more';

configure({
  adapter: new Adapter()
});

it(`Click on showmore-btn calls callback once`, () => {
  const onMoreBtnClick = jest.fn();

  const moreBtn = shallow(
      <ShowMore
        onMoreBtnClick={onMoreBtnClick}
        isMoreBtnShow={true}
      />
  ).find(`button`);

  moreBtn.simulate(`click`);

  expect(onMoreBtnClick).toHaveBeenCalledTimes(1);

});
