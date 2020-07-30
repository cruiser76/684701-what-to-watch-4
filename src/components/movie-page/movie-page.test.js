import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import history from './../../history.js';

import MoviePage from './movie-page.jsx';

const movies =
  [{
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
      starring: [``]
    },
    link: `movie-page.html`,
    key: 1,
  }];

const match = {
  params: {
    id: 1
  }
};

it(`Movie Page is render correctly`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <MoviePage
            match={match}
            movies={movies}
            onPlayButtonClick={() => {}}
            onMyListClick={() => {}}
            authorizationStatus={`NO_AUTH`}
          />
        </Router>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
