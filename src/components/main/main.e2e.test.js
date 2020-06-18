import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from './main.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const movieTitle = `Fantastic Beasts: The Crimes of Grindelwald`;
const genre = `Drama`;
const releaseDate = 2014;
const movies = [
  `Fantastic Beasts: The Crimes of Grindelwald`
];

it(`Should movie-card-title click`, () => {
  const onMovieCardTitleClick = jest.fn();

  const main = shallow(
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
