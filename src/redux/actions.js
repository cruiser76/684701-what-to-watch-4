import ActionType from './action-type.js';
import Films from './../mocks/films.js';
import {NUMBER_FILMS_IN_LIST} from './../const.js';

export function openMoviePage(movie) {
  return {
    type: ActionType.OPEN_MOVIE_PAGE,
    movie
  };
}

export function changeActiveGenre(genre) {
  return {
    type: ActionType.CHANGE_ACTIVE_GENRE,
    genre
  };
}

const getFilterMovies = (genre) => {
  if (genre !== `All genres`) {
    return Films.filter((el) => el.brief.genre === genre);
  } else {
    return Films;
  }
};

export function filterMovieList(genre) {
  return {
    type: ActionType.FILTER_MOVIE_LIST,
    movies: getFilterMovies(genre)
  };
}

export function changeNumberMovies() {
  return {
    type: ActionType.CHANGE_NUMBER_MOVIES,
  };
}

export function changeNumberMoviesInList() {
  return {
    type: ActionType.CHANGE_NUMBER_MOVIES_IN_LIST,
    payload: NUMBER_FILMS_IN_LIST
  };
}

export function resetNumberMoviesInList() {
  return {
    type: ActionType.RESET_NUMBER_MOVIES_IN_LIST,
    payload: NUMBER_FILMS_IN_LIST
  };
}

export function switchMoreBtnVisibility() {
  return {
    type: ActionType.SWITCH_MORE_BTN_VISIBILITY,
  };
}
