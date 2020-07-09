import React from 'react';
import renderer from 'react-test-renderer';

import {App} from './app.jsx';

const movieTitle = `Fantastic Beasts: The Crimes of Grindelwald`;
const genre = `Drama`;
const releaseDate = 2014;
const promo = {
  movieTitle,
  genre,
  releaseDate
};

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
      level: `Good`,
      filmLink: ``
    },
    link: `movie-page.html`,
    key: `fantastic-beasts-the-crimes-of-grindelwald`,
  }
];

const props = {
  movies,
  promo,
  currentMovie: null,
  genresList: [`All genre`],
  activeGenre: `All genre`,
  isMoreBtnShow: true,
  onCardClick: () => {},
  onMoreBtnClick: () => {},
  onGenreClick: () => {},
};

it(`App should render App`, () => {
  const tree = renderer
    .create(
        <App
          {...props}
        />, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
