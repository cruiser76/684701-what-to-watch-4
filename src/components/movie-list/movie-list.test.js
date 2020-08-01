import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import history from './../../history.js';

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
      level: `Good`,
      filmLink: ``
    },
    link: `movie-page.html`,
    key: `fantastic-beasts-the-crimes-of-grindelwald`,
  }
];

const props = {
  movies,
  numberMoviesInList: 8,
  onCardClick: () => {},
  setActiveElement: () => {},
  cardId: ``,
  isLoadingMovies: false
};

it(`Movie-list is render correctly`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <MovieList
            {...props}
          />
        </Router>, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
