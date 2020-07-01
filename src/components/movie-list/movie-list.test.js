import React from 'react';
import renderer from 'react-test-renderer';

import MovieList from './movie-list.jsx';

const movies = [
  {
    img: {
      src: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      posterSrc: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      bgSrc: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`
    },
    brief: {
      title: `Fantastic Beasts: The Crimes of Grindelwald`,
      genre: `Drama`,
      year: `2000`,
      score: `9`,
      level: `Good`
    },
    link: `movie-page.html`,
    key: `fantastic-beasts-the-crimes-of-grindelwald`,
  }
];

const movieCardClickHandle = () => {};

it(`Movie-list is render correctly`, () => {
  const tree = renderer
    .create(
        <MovieList
          movies={movies}
          movieCardClickHandle={movieCardClickHandle}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});