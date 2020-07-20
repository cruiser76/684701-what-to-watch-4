import React from 'react';
import renderer from 'react-test-renderer';

import MoviePage from './movie-page.jsx';

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
    level: `Good`,
    starring: [``]
  },
  link: `movie-page.html`,
  key: `fantastic-beasts-the-crimes-of-grindelwald`,
};

it(`Movie Page is render correctly`, () => {
  const tree = renderer
    .create(
        <MoviePage
          movie={movie}
          onPlayButtonClick={()=>{}}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
