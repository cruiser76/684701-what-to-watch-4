import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from "redux-mock-store";

import {App} from './app.jsx';
import {Provider} from 'react-redux';

const mockStore = configureStore([]);

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
  promo: movies[0],
  currentMovie: movies[0],
  genresList: [`All genres`],
  activeGenre: `All genres`,
  numberMoviesInList: 8,
  onCardClick: () => {},
  onMoreBtnClick: () => {},
  onGenreClick: () => {},
  playingMovie: movies[0],
  onPlayButtonClick: () => {},
  onExitButtonClick: () => {},
  login: () => {},
  isSignIn: false,
  postReview: () => {},
  isLoadingMovies: false,
  isLoadingPromo: false,
  isSavingReview: false,
  onMyListClick: () => {},
  authorizationStatus: `NO_AUTH`,
  loadFavorite: () => {}
};

const store = mockStore({
  USER: {authorizationStatus: `NO_AUTH`}
});

it(`App should render App`, () => {
  const tree = renderer
    .create(
        <Provider store={store}>
          <App
            {...props}
          />
        </Provider>
        , {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
