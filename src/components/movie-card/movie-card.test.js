import React from 'react';
import renderer from 'react-test-renderer';

import MovieCard from './movie-card.jsx';

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
    filmLink: ``
  },
  link: `movie-page.html`,
  key: `fantastic-beasts-the-crimes-of-grindelwald`,
};

const props = {
  setActiveElement: () => {},
  onCardClick: () => {},
  isPlaying: false,
  movie,
  children: <div></div>,
  switchPlayerPlayEvent: () => {}
};

it(`movie card was render correctly`, () => {
  const tree = renderer
    .create(
        <MovieCard
          {...props}
        />, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
