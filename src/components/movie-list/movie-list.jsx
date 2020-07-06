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

  _mouseEnterHandle(target) {
    if (target) {
      return;
    }
    // this.setState({hoverElement: target});
    return;
  }

  render() {
    const {movies, movieCardClickHandle} = this.props;

    const movieList = movies.map((el) => {

      return (
        <MovieCard
          key={el.key}
          movie={el}
          mouseEnterHandle={this._mouseEnterHandle}
          movieCardClickHandle={() => movieCardClickHandle(el)}
        >

        </MovieCard>
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
  movieCardClickHandle: PropTypes.func.isRequired
};
