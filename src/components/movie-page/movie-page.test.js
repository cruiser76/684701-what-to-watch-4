import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import history from './../../history.js';

import MoviePage from './movie-page.jsx';
import {Provider} from 'react-redux';

const mockStore = configureStore([]);

const movies =
  [{
    'id': `1`,
    'name': `The Grand Budapest Hotel`,
    'poster_image': `img/the-grand-budapest-hotel-poster.jpg`,
    'preview_image': `img/the-grand-budapest-hotel.jpg`,
    'background_image': `img/the-grand-budapest-hotel-bg.jpg`,
    'background_color': `#ffffff`,
    'video_link': `https://some-link`,
    'preview_video_link': `https://some-link`,
    'description': `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
    'rating': 8.9,
    'scores_count': 240,
    'director': `Wes Andreson`,
    'starring': [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
    'run_time': 99,
    'genre': `Comedy`,
    'released': 2014,
    'is_favorite': false
  }];

const match = {
  params: {
    id: `1`
  }
};

const store = mockStore({
  DATA: {
    isLoadingMovies: false,
    movies
  },
  CONDITION: {
    activeGenre: `All genres`,
  },
  USER: {
    authorizationStatus: `NO_AUTH`
  },
  REVIEW: {
    currentReviews: [{
      "id": 1,
      "user": {
        "id": 4,
        "name": `Kate Muir`
      },
      "rating": 8.9,
      "comment": `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
      "date": `2019-05-08T14:13:56.569Z`
    }],
  }}
);

it(`Movie Page is render correctly`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <Provider store={store}>
            <MoviePage
              match={match}
              onPlayButtonClick={() => {}}
              onMyListClick={() => {}}
            />
          </Provider>
        </Router>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
