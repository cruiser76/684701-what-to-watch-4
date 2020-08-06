import React from 'react';
import renderer from 'react-test-renderer';

import TabOverview from './tab-overview.jsx';

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
};

it(`Tab should render correctly`, () => {
  const tree = renderer
    .create(
        <TabOverview
          {...props}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
