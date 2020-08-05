import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import history from './../../history.js';

import Review from './review.jsx';

const movie =
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
  key: `1`,
};

const props = {
  rating: 5,
  comment: `Test`,
  movie,
  onSubmit: () => {},
  setComment: () => {},
  isSavingReview: false,
  onRadioBtnClick: () => {},
};

it(`Review should render`, () => {
  const tree = renderer
    .create((
      <Router history={history}>
        <Review
          {...props}
        />
      </Router>
    ), {
      createNodeMock: () => {
        return {};
      }
    }).toJSON();

  expect(tree).toMatchSnapshot();
});
