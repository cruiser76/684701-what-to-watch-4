import React from 'react';
import PropTypes from 'prop-types';

const MovieCard = (props) => {

  const {movie, mouseEnterHandle, movieCardClickHandle} = props;
  const {img, brief, link} = movie;

  return (
    <article className="small-movie-card catalog__movies-card"
      onMouseEnter={(evt) => {
        mouseEnterHandle(evt.currentTarget);
      }}
      onClick={(evt) => {
        evt.preventDefault();
        movieCardClickHandle();
      }}
    >
      <div className="small-movie-card__image">
        <img src={`img/${img.src}`} alt={brief.title} width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link"
          href={link}
        >{brief.title}</a>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  mouseEnterHandle: PropTypes.func.isRequired,
  movieCardClickHandle: PropTypes.func.isRequired,
};

export default MovieCard;
