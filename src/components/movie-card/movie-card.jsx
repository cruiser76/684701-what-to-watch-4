import React from 'react';
import PropTypes from 'prop-types';

import VideoPlayer from './../video-player/video-player.jsx';

const MovieCard = (props) => {
  const {movie, onCardClick, onCardMouseEnter, onCardMouseLeave, isPlaying} = props;
  const {img, brief, link, key} = movie;

  const handleCardMouseEnter = () => {
    onCardMouseEnter(key);
  };

  const handleCardMouseLeave = () => {
    onCardMouseLeave(key);
  };

  return (
    <article className="small-movie-card catalog__movies-card"
      onClick={(evt) => {
        evt.preventDefault();
        onCardClick();
      }}
      onMouseEnter={handleCardMouseEnter}
      onMouseLeave={handleCardMouseLeave}
    >
      <VideoPlayer
        src={brief.filmLink}
        poster={`img/${img.src}`}
        isPlaying={isPlaying}
      />
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
  onCardMouseEnter: PropTypes.func.isRequired,
  onCardMouseLeave: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default MovieCard;
