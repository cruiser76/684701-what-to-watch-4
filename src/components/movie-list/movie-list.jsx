import React from 'react';
import PropTypes from 'prop-types';

import MovieCard from './../movie-card/movie-card.jsx';

const MovieList = (props) => {
  const {movies, onCardClick, numberMoviesInList, onCardMouseEnter, onCardMouseLeave, cardId} = props;

  return (
    <div className="catalog__movies-list">
      {movies.slice(0, numberMoviesInList).map((film) => {
        return (
          <MovieCard
            key={film.key}
            onCardClick={onCardClick}
            onCardMouseEnter={() => onCardMouseEnter(film.key)}
            onCardMouseLeave={onCardMouseLeave}
            isPlaying={cardId === film.key}
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
  onCardMouseEnter: PropTypes.func.isRequired,
  onCardMouseLeave: PropTypes.func.isRequired,
  numberMoviesInList: PropTypes.number.isRequired,
  cardId: PropTypes.any
};

export default MovieList;
