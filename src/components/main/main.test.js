import React from 'react';
import renderer from 'react-test-renderer';

import Main from './main.jsx';

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
  }
];

const movieCardClickHandle = () => {};

it(`Main should render Main`, () => {
  const tree = renderer
    .create(
        <Main
          movieCardClickHandle={movieCardClickHandle}
          movieTitle={movieTitle}
          genre={genre}
          releaseDate={releaseDate}
          movies = {movies}
        />, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
