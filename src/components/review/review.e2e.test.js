import React from 'react';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Router} from 'react-router-dom';
import history from './../../history.js';

import Review from './review.jsx';

const movie = {
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
  key: 1,
};

const props = {
  rating: 5,
  comment: `Test Test Test Test Test Test Test Test Test Test Test Test Test`,
  movie,
  isSavingReview: false,
  onSubmit: () => {},
  setComment: () => {},
  onRadioBtnClick: () => {},
};

configure({adapter: new Adapter()});


it(`clicking on buttons in Review calls calbacks`, () => {
  const onSubmit = jest.fn();
  const setComment = jest.fn();
  const onRadioBtnClick = jest.fn();

  const screen = mount(
      <Router history={history}>
        <Review
          {...props}
          onSubmit={onSubmit}
          setComment={setComment}
          onRadioBtnClick={onRadioBtnClick}
        />
      </Router>

  );

  const ratingBtn = screen.find(`.rating__input`).at(1);
  ratingBtn.simulate(`change`, {target: {checked: true}});
  expect(onRadioBtnClick).toHaveBeenCalledTimes(1);

  const textArea = screen.find(`.add-review__textarea`);
  textArea.simulate(`change`, {target: {value: `test`}});
  expect(setComment).toHaveBeenCalledTimes(1);

  screen.find(`form`).simulate(`submit`);
  expect(onSubmit).toHaveBeenCalledTimes(1);
});
