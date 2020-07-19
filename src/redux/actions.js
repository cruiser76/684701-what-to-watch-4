import ActionType from './action-type.js';
import {NUMBER_FILMS_IN_LIST} from './../const.js';
import createFilmList from './../adapters/films.js';

export function openMoviePage(movie) {
  return {
    type: ActionType.OPEN_MOVIE_PAGE,
    movie
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
  };
}

export function setActiveGenre(genre) {
  return {
    type: ActionType.SET_ACTIVE_GENRE,
    activeGenre: genre
  };
}

export function setPlayingMovie(movie) {
  return {
    type: ActionType.SET_PLAY_MOVIE,
    playingMovie: movie
  };
}

export const loadMovies = (movies) => {
  return {
    type: ActionType.LOAD_MOVIES,
    payload: movies
  };
};

export const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(loadMovies(createFilmList(response.data)));
      });
  }
};
