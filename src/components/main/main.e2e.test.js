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
  },
];

it(`Should movie-card-title click`, () => {
  const movieCardClickHandle = jest.fn();

  const main = mount(
      <Main
        movieTitle={movieTitle}
        genre={genre}
        releaseDate={releaseDate}
        movies = {movies}
        movieCardClickHandle={movieCardClickHandle}
      />
  );

  const catalogLink = main.find(`.small-movie-card__link`);
  catalogLink.simulate(`click`);

  expect(movieCardClickHandle.mock.calls.length).toBe(1);
});
