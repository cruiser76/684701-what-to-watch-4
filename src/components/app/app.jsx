import React from 'react';
import PropTypes from 'prop-types';

import Main from './../main/main.jsx';

const onMovieCardTitleClick = () => {};

const App = (props) => {
  const {movieTitle, genre, releaseDate, movies} = props;

  return (
    <Main
      movieTitle={movieTitle}
      genre={genre}
      releaseDate={releaseDate}
      movies={movies}
      onMovieCardTitleClick={onMovieCardTitleClick}
    />
  );
};

App.propTypes = {
  movieTitle: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  releaseDate: PropTypes.number.isRequired,
  movies: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default App;
