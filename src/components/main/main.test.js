import React from 'react';
import renderer from 'react-test-renderer';

import Main from './main.jsx';

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
  genresList: [`All genres`],
  activeGenre: `All genres`,
  numberMoviesInList: 8,
  onCardClick: () => {},
  onMoreBtnClick: () => {},
  onGenreClick: () => {},
};

it(`Main should render Main`, () => {
  const tree = renderer
    .create(
        <Main
          {...props}
        />, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
