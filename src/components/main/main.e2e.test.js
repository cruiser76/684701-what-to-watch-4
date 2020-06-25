import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Main from './main.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const movieTitle = `Fantastic Beasts: The Crimes of Grindelwald`;
const genre = `Drama`;
const releaseDate = 2014;
const movies = [
  {
    src: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    link: `movie-page.html`,
    key: `fantastic-beasts-the-crimes-of-grindelwald`
  },
];

it(`Should movie-card-title click`, () => {
  const onMovieCardTitleClick = jest.fn();

  const main = mount(
      <Main
        movieTitle={movieTitle}
        genre={genre}
        releaseDate={releaseDate}
        movies = {movies}
        onMovieCardTitleClick={onMovieCardTitleClick}
      />
  );

  const catalogLink = main.find(`.small-movie-card__link`);
  catalogLink.simulate(`click`);

  expect(onMovieCardTitleClick.mock.calls.length).toBe(1);
});
