import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

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
    const {movie, children} = this.props;
    const {brief, key} = movie;
    return (
      <article className="small-movie-card catalog__movies-card"
        onMouseEnter={this._handleCardMouseEnter}
        onMouseLeave={this._handleCardMouseLeave}
      >
        <Link to={`/films/${key}`} >
          <div className="small-movie-card__image">
            {children}
          </div>
        </Link>
        <h3 className="small-movie-card__title">
          <Link
            to={`/films/${key}`}
            className="small-movie-card__link"
          >
            {brief.title}
          </Link>
        </h3>
      </article>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  setActiveElement: PropTypes.func.isRequired,
  switchPlayerPlayEvent: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default MovieCard;
