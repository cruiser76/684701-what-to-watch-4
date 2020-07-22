import NameSpace from './../name-space.js';
import {createSelector} from 'reselect';
import adaptFilm from './../../adapters/film.js';

export const getCurrentMovie = (state) => {
  return state[NameSpace.CONDITION].currentMovie;
};

export const getNumberMoviesInList = (state) => {
  return state[NameSpace.CONDITION].numberMoviesInList;
};

export const getPlayingMovie = (state) => {
  return state[NameSpace.CONDITION].playingMovie;
};

export const getIsSignIn = (state) => {
  return state[NameSpace.CONDITION].isSignIn;
};

export const getMovies = (state) => {
  return state[NameSpace.DATA].movies.map((film) => adaptFilm(film));
};

export const getGenresList = createSelector(
    getMovies,
    (movies) => {
      const allGenres = (movies.map((el) => el.brief.genre));
      const uniqueGenres = [...new Set(allGenres)].sort();
      const resultGenresList = [`All genres`, ...uniqueGenres].slice(0, 10);
      return resultGenresList;
    }
);

export const getActiveGenre = (state) => {
  return state[NameSpace.CONDITION].activeGenre;
};

export const getFilteredMovies = createSelector(
    getMovies,
    getActiveGenre,
    (movies, activeGenre) => {
      if (activeGenre !== `All genres`) {
        return movies.filter((movie) => {
          return movie.brief.genre === activeGenre;
        });
      }
      return movies;
    }
);
