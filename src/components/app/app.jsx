import React from 'react';
import PropTypes from 'prop-types';

import Main from './../main/main.jsx';

const GENRES_LIST = [
  `Comedie`, `Crime`, `Documentary`, `Drama`, `Horror`, `Kids & Family`, `Romance`, `Sci-Fi`, `Thriller`
];

const App = (props) => {
  const {movieTitle, genre, releaseDate, movies} = props;

  return (
    <Main
      movieTitle={movieTitle}
      genre={genre}
      releaseDate={releaseDate}
      movies = {movies}
    />
  );
};

App.propTypes = {
  movieTitle: PropTypes.string.isRequired,
  genre: PropTypes.oneOf(GENRES_LIST).isRequired,
  releaseDate: PropTypes.number.isRequired,
  movies: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default App;
