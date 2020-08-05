import React from 'react';
import PropTypes from 'prop-types';

import MovieCard from './../movie-card/movie-card.jsx';
import withVideoPlayer from './../../hocs/with-video-player/with-video-player.jsx';
import {Loader} from '../loader/loader.jsx';

const MovieCardWrapped = withVideoPlayer(MovieCard);

const MovieList = (props) => {
  const {movies, onCardClick, numberMoviesInList, setActiveElement, isLoadingMovies} = props;

  return (
    <div className="catalog__movies-list">
      {isLoadingMovies ? <Loader /> : movies.slice(0, numberMoviesInList).map((film) => {
        return (
          <MovieCardWrapped
            key={film.key}
            onCardClick={onCardClick}
            setActiveElement={setActiveElement}
            isActive={false}
            movie={film}
            muted={true}
            rePlay={true}
          />
        );
      })}
    </div>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  onCardClick: PropTypes.func.isRequired,
  setActiveElement: PropTypes.func.isRequired,
  numberMoviesInList: PropTypes.number.isRequired,
  isLoadingMovies: PropTypes.bool.isRequired
};

export default MovieList;
