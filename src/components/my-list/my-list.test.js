import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from "redux-mock-store";
import {Router} from 'react-router-dom';
import history from '../../history.js';

import MyList from './my-list.jsx';


const mockStore = configureStore([]);

const adaptMovies =
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
    filmLink: ``
  },
  link: `movie-page.html`,
  key: `1`,
}];

const user = {
  'id': 1,
  'email': `Oliver.conner@gmail.com`,
  'name': `Oliver.conner`,
  'avatar_url': `/img/1.png`
};

const props = {
  onCardClick: () => {},
};

const favoriteMovies =
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

const store = mockStore({
  DATA: {
    isLoadingFavorite: false,
    favoriteMovies
  },
  USER: {
    user
  }
});

it(`MyList should render correctly`, () => {
  const tree = renderer
    .create(
        <Provider store={store}>
          <Router history={history}>
            <MyList
              {...props}
              movies={adaptMovies}
            />
          </Router>
        </Provider>,
        {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
