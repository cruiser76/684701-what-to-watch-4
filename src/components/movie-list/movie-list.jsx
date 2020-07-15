import React from 'react';
import PropTypes from 'prop-types';

import MovieCard from './../movie-card/movie-card.jsx';

const MovieList = (props) => {
  const {movies, onCardClick, numberMoviesInList, setActiveElement, activeElement} = props;

  return (
    <div className="catalog__movies-list">
      {movies.slice(0, numberMoviesInList).map((film) => {
        return (
          <MovieCard
            key={film.key}
            onCardClick={onCardClick}
            setActiveElement={setActiveElement}
            isPlaying={activeElement === film.key}
            movie={film}
          />
        );
      })}
    </div>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  onCardClick: PropTypes.func.isRequired,
  setActiveElement: PropTypes.func.isRequired,
  numberMoviesInList: PropTypes.number.isRequired,
  activeElement: PropTypes.string
};

export default MovieList;
