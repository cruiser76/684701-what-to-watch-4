import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import MovieCard from './../movie-card/movie-card.jsx';

export default class MovieList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hoverElement: null
    };
    this._mouseEnterHandle = this._mouseEnterHandle.bind(this);
  }

  _mouseEnterHandle(evt) {
    this.setState({hoverElement: evt.currentTarget});
    return;
  }

  render() {
    const {movies, onMovieCardTitleClick} = this.props;
    const movieList = movies.map((el) => {

      return (
        <MovieCard
          key={el.key}
          movie={el}
          onMouseEnter={this._mouseEnterHandle}
          onMovieCardTitleClick={onMovieCardTitleClick}
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
  onMovieCardTitleClick: PropTypes.func.isRequired
};
