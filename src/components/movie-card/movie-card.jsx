import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {PLAYER_DELAY as delay} from './../../const.js';

class MovieCard extends PureComponent {
  constructor(props) {
    super(props);
    this.timerOnHoverID = null;
    this._handleCardMouseEnter = this._handleCardMouseEnter.bind(this);
    this._handleCardMouseLeave = this._handleCardMouseLeave.bind(this);
  }

  _handleCardMouseEnter() {
    this.timerOnHoverID = setTimeout(() => {
      this.props.setActiveElement(this.props.movie.key);
      this.props.switchPlayerPlayEvent(true);
    }, delay);
  }

  _handleCardMouseLeave() {
    const {setActiveElement} = this.props;
    if (this.timerOnHoverID) {
      clearTimeout(this.timerOnHoverID);
    }
    if (this.props.movie.key) {
      setActiveElement(null);
      this.props.switchPlayerPlayEvent(false);
    }
  }

  render() {
    const {movie, onCardClick, children} = this.props;
    const {brief, link} = movie;
    return (
      <article className="small-movie-card catalog__movies-card"
        onClick={(evt) => {
          evt.preventDefault();
          onCardClick(movie);
        }}
        onMouseEnter={this._handleCardMouseEnter}
        onMouseLeave={this._handleCardMouseLeave}
      >
        <div className="small-movie-card__image">
          {children}
        </div>
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
  switchPlayerPlayEvent: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default MovieCard;
