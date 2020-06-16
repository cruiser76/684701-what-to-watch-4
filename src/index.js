import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app.jsx';

const init = () => {

  const Promo = {
    FILM: `The Grand Budapest Hotel`,
    GENRE: `Drama`,
    RELEASE: 2014
  };

  const Movies = [
    `Fantastic Beasts: The Crimes of Grindelwald`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`, `We need to talk about Kevin`, `What We Do in the Shadows`,
    `Revenant`, `Johnny, English`, `Shutter Island`, `Pulp Fiction`, `No Country for Old Men`, `Snatch`, `Moonrise Kingdom`,
    `Seven Years in Tibet`, `Midnight Special`, `War of the Worlds`, `Dardjeeling Limited`, `Orlando`, `Mindhunter`
  ];

  ReactDOM.render(
      <App
        movieTitle = {Promo.FILM}
        genre = {Promo.GENRE}
        releaseDate = {Promo.RELEASE}
        movies = {Movies}
      />,
      document.querySelector(`#root`)
  );
};

init();
