import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';

import GenresList from './genres-list.jsx';

configure({
  adapter: new Adapter()
});

const mockEvent = {
  preventDefault() {}
};

it(`Click on Genre calls callback once`, () => {
  const onGenreClick = jest.fn();

  const genresList = shallow(
      <GenresList
        genresList={[`All genre`, `Drama`]}
        onGenreClick={onGenreClick}
        activeGenre={`All genre`}
      />
  );

  const genre = genresList.find(`.catalog__genres-item`);
  expect(genre).toHaveLength(2);

  genre.at(1).simulate(`click`, mockEvent);
  expect(onGenreClick).toHaveBeenCalledTimes(1);
});
