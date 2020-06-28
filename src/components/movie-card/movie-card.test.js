import React from 'react';
import renderer from 'react-test-renderer';

import MovieCard from './movie-card.jsx';

const movie = {
  src: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  link: `movie-page.html`,
  key: `fantastic-beasts-the-crimes-of-grindelwald`
};
const mouseEnterHandle = () => {};
const onMovieCardTitleClick = () => {};

it(`movie card was render correctly`, () => {
  const tree = renderer
    .create(
        <MovieCard
          mouseEnterHandle={mouseEnterHandle}
          onMovieCardTitleClick={onMovieCardTitleClick}
          movie={movie}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
