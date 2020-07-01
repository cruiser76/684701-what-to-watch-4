import React, {createRef} from 'react';
import PropTypes from 'prop-types';

import VideoPlayer from './../video-player/video-player.jsx';

const MovieCard = (props) => {
  const cardRef = createRef();

  const {movie, movieCardClickHandle, mouseEnterHandle} = props;
  const {img, brief, link} = movie;

  const cardMouseEnterHandle = () => {
    mouseEnterHandle(cardRef.current);
  };

  return (
    <article className="small-movie-card catalog__movies-card"
      onClick={(evt) => {
        evt.preventDefault();
        movieCardClickHandle();
      }}
      ref={cardRef}
    >
      <VideoPlayer
        src={brief.filmLink}
        poster={`img/${img.src}`}
        onMouseEnter={cardMouseEnterHandle}
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
  mouseEnterHandle: PropTypes.func.isRequired,
  movieCardClickHandle: PropTypes.func.isRequired,
};

export default MovieCard;
