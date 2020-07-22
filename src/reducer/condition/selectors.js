import NameSpace from './../name-space.js';
import {createSelector} from 'reselect';
import adaptFilm from './../../adapters/film.js';

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

export const getFilteredMovie = createSelector(
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
