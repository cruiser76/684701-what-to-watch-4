import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app.jsx';
import Films from './mocks/films.js';

const init = () => {

  const Promo = {
    FILM: `The Grand Budapest Hotel`,
    GENRE: `Drama`,
    RELEASE: 2014
  };

  ReactDOM.render(
      <App
        movieTitle = {Promo.FILM}
        genre = {Promo.GENRE}
        releaseDate = {Promo.RELEASE}
        movies = {Films}
      />,
      document.querySelector(`#root`)
  );
};

init();
