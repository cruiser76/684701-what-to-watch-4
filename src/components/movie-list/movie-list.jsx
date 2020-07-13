import React from 'react';
import PropTypes from 'prop-types';

const MovieList = (props) => {
  const {movies, renderActiveCard} = props;

  return (
    <div className="catalog__movies-list">
      {movies.map((el) => renderActiveCard(el))}
    </div>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  renderActiveCard: PropTypes.func.isRequired,
};

export default MovieList;
