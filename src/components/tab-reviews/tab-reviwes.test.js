import React from 'react';
import renderer from 'react-test-renderer';

import TabReviews from './tab-reviews.jsx';

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
  loadReviews: () => {},
  reviews
};

it(`Tab should render correctly`, () => {
  const tree = renderer
    .create(
        <TabReviews
          {...props}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
