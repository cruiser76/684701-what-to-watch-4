import NameSpace from './../name-space.js';
import adaptFilm from './../../adapters/film.js';

export const getPromo = (state) => {
  return adaptFilm(state[NameSpace.DATA].promo);
};
