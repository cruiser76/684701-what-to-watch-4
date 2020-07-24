import {extend} from './../../utils.js';
import {NUMBER_FILMS_IN_LIST} from './../../const.js';

const ActionType = {
  OPEN_MOVIE_PAGE: `OPEN_MOVIE_PAGE`,
  CHANGE_NUMBER_MOVIES_IN_LIST: `CHANGE_NUMBER_MOVIES_IN_LIST`,
  RESET_NUMBER_MOVIES_IN_LIST: `RESET_NUMBER_MOVIES_IN_LIST`,
  SET_ACTIVE_GENRE: `SET_ACTIVE_GENRE`,
  SET_PLAY_MOVIE: `SET_PLAY_MOVIE`,
  IS_SIGNIN: `IS_SIGNIN`
};

const initialState = {
  currentMovie: null,
  genresList: [],
  numberMoviesInList: NUMBER_FILMS_IN_LIST,
  activeGenre: `All genres`,
  playingMovie: null,
  isSignIn: false
};

const ActionCreator = {
  openMoviePage: (movie) => {
    return {
      type: ActionType.OPEN_MOVIE_PAGE,
      payload: movie
    };
  },

  changeNumberMovies: () => {
    return {
      type: ActionType.CHANGE_NUMBER_MOVIES,
    };
  },

  changeNumberMoviesInList: () => {
    return {
      type: ActionType.CHANGE_NUMBER_MOVIES_IN_LIST,
      payload: NUMBER_FILMS_IN_LIST
    };
  },

  resetNumberMoviesInList: () => {
    return {
      type: ActionType.RESET_NUMBER_MOVIES_IN_LIST,
      payload: NUMBER_FILMS_IN_LIST
    };
  },

  setActiveGenre: (genre) => {
    return {
      type: ActionType.SET_ACTIVE_GENRE,
      payload: genre
    };
  },

  setPlayingMovie: (movie) => {
    return {
      type: ActionType.SET_PLAY_MOVIE,
      payload: movie
    };
  },

  setSignIn: (isAuth) => {
    return {
      type: ActionType.IS_SIGNIN,
      payload: isAuth
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.OPEN_MOVIE_PAGE:
      return extend(state, {currentMovie: action.payload});
    case ActionType.CHANGE_NUMBER_MOVIES_IN_LIST:
      return extend(state, {numberMoviesInList: state.numberMoviesInList + action.payload});
    case ActionType.RESET_NUMBER_MOVIES_IN_LIST:
      return extend(state, {numberMoviesInList: action.payload});
    case ActionType.SET_ACTIVE_GENRE:
      return extend(state, {activeGenre: action.payload});
    case ActionType.SET_PLAY_MOVIE:
      return extend(state, {playingMovie: action.payload});
    case ActionType.IS_SIGNIN:
      return extend(state, {isSignIn: action.payload});
    default:
      return state;
  }
};

export {reducer, ActionCreator, ActionType};
