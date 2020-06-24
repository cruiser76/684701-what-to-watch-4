import React from 'react';
import PropTypes from 'prop-types';

const MovieCard = (props) => {

  const {movie, onMouseEnter, onMovieCardTitleClick} = props;
  const {src, title, link} = movie;

  return (
    <article className="small-movie-card catalog__movies-card"
      onMouseEnter={onMouseEnter}
    >
      <div className="small-movie-card__image">
        <img src={`img/${src}`} alt={title} width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href={link}
          onClick={(evt) => {
            onMovieCardTitleClick(evt);
          }}
        >{title}</a>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMovieCardTitleClick: PropTypes.func.isRequired,
};

export default MovieCard;
