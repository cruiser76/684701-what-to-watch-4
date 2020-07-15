import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import VideoPlayer from './../video-player/video-player.jsx';
import {PLAYER_DELAY as delay} from './../../const.js';

class MovieCard extends PureComponent {
  constructor(props) {
    super(props);
    this.timerOnHoverID = null;
    this._handleCardMouseEnter = this._handleCardMouseEnter.bind(this);
    this._handleCardMouseLeave = this._handleCardMouseLeave.bind(this);
  }

  _handleCardMouseEnter() {
    this.timerOnHoverID = setTimeout(() => this.props.setActiveElement(this.props.movie.key), delay);
  }

  _handleCardMouseLeave() {
    if (this.timerOnHoverID) {
      clearTimeout(this.timerOnHoverID);
    }
    if (this.props.movie.key) {
      this.props.setActiveElement(null);
    }
  }

  render() {
    const {movie, onCardClick, isPlaying} = this.props;
    const {img, brief, link} = movie;
    return (
      <article className="small-movie-card catalog__movies-card"
        onClick={(evt) => {
          evt.preventDefault();
          onCardClick(movie);
        }}
        onMouseEnter={this._handleCardMouseEnter}
        onMouseLeave={this._handleCardMouseLeave}
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
  }
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  setActiveElement: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default MovieCard;
