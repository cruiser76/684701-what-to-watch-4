import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

import Tabs from './tabs.jsx';

configure({adapter: new Adapter()});
const mockStore = configureStore([]);

const mockEvent = {
  preventDefault() {}
};

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
    level: `Good`,
    starring: [`Ivan`]
  },
  link: `movie-page.html`,
  key: `1`,
};

const props = {
  movie,
  activeElement: `Overview`,
};

const reviews = [
  {
    'id': 1,
    'user': {
      'id': 4,
      'name': `Kate Muir`
    },
    'rating': 8.9,
    'comment': `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
    'date': `2019-05-08T14:13:56.569Z`
  }
];

const store = mockStore({
  REVIEW: {currentReviews: reviews}
});

it(`Click on tab calls callback once`, () => {
  const setActiveElement = jest.fn();

  const tabs = mount(
      <Provider store={store}>
        <Tabs
          {...props}
          setActiveElement={setActiveElement}
        />
      </Provider>
  );

  const links = tabs.find(`.movie-nav__link`);
  expect(links).toHaveLength(3);

  links.at(1).simulate(`click`, mockEvent);
  expect(setActiveElement).toHaveBeenCalledTimes(1);
});
