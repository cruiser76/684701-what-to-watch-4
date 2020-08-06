import NameSpace from './../name-space.js';
import adaptFilm from './../../adapters/film.js';

export const getPromo = (state) => {
  return adaptFilm(state[NameSpace.DATA].promo);
};

export const getIsLoadingMovies = (state) => {
  return state[NameSpace.DATA].isLoadingMovies;
};

export const getIsLoadingFavorite = (state) => {
  return state[NameSpace.DATA].isLoadingFavorite;
};

export const getIsLoadingPromo = (state) => {
  return state[NameSpace.DATA].isLoadingPromo;
};

export const getFavoriteMovies = (state) => {
  return state[NameSpace.DATA].favoriteMovies.map((film) => adaptFilm(film));
};
