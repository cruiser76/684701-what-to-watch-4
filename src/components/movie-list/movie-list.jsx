import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import MovieCard from './../movie-card/movie-card.jsx';
import {PLAYER_DELAY as delay} from './../../const.js';

export default class MovieList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hoverElementID: null
    };
    this.timerOnHoverID = null;
    this.handleCardMouseEnter = this.handleCardMouseEnter.bind(this);
    this.handleCardMouseLeave = this.handleCardMouseLeave.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.timerOnHoverID);
  }

  handleCardMouseEnter(target) {
    if (target) {
      this.timerOnHoverID = setTimeout(() => this.setState({hoverElementID: target}), delay);
    }
  }

  handleCardMouseLeave() {
    if (this.timerOnHoverID) {
      clearTimeout(this.timerOnHoverID);
    }
    if (this.state.hoverElementID) {
      this.setState({hoverElementID: null});
    }
  }

  render() {
    const {movies, onCardClick, numberMoviesInList} = this.props;
    const movieList = movies.slice(0, numberMoviesInList).map((el) => {

      return (
        <MovieCard
          key={el.key}
          movie={el}
          onCardMouseEnter={this.handleCardMouseEnter}
          onCardMouseLeave={this.handleCardMouseLeave}
          onCardClick={() => onCardClick(el)}
          isPlaying={this.state.hoverElementID === el.key}
        />
      );
    });

    return (
      <div className="catalog__movies-list">
        {movieList}
      </div>
    );
  }
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  onCardClick: PropTypes.func.isRequired,
  numberMoviesInList: PropTypes.number.isRequired
};
