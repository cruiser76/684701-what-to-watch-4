import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app.jsx';

const init = () => {

  const promo = {
    film: `The Grand Budapest Hotel`,
    genre: `Drama`,
    release: `2014`
  };

  ReactDOM.render(
      <App
        movieTitle = {promo.film}
        genre = {promo.genre}
        releaseDate = {promo.release}
      />,
      document.querySelector(`#root`)
  );
};

init();
