import React from 'react';
import renderer from 'react-test-renderer';

import App from './app.jsx';

const movieTitle = `Fantastic Beasts: The Crimes of Grindelwald`;
const genre = `Drama`;
const releaseDate = 2014;
const movies = [
  `Fantastic Beasts: The Crimes of Grindelwald`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`, `We need to talk about Kevin`, `What We Do in the Shadows`,
  `Revenant`, `Johnny, English`, `Shutter Island`, `Pulp Fiction`, `No Country for Old Men`, `Snatch`, `Moonrise Kingdom`,
  `Seven Years in Tibet`, `Midnight Special`, `War of the Worlds`, `Dardjeeling Limited`, `Orlando`, `Mindhunter`
];

it(`App should render App`, () => {
  const tree = renderer
    .create(
        <App
          movieTitle={movieTitle}
          genre={genre}
          releaseDate={releaseDate}
          movies = {movies}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
