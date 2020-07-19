import {Promo} from '../adapters/films.js';
import ActionType from './action-type.js';
import {extend} from './../utils.js';
import {NUMBER_FILMS_IN_LIST} from './../const.js';

const initialState = {
  movies: [],
  promo: Promo,
  currentMovie: null,
  genresList: [],
  numberMoviesInList: NUMBER_FILMS_IN_LIST,
  activeGenre: `All genres`,
  playingMovie: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.OPEN_MOVIE_PAGE:
      return extend(state, {currentMovie: action.movie});
    case ActionType.CHANGE_NUMBER_MOVIES_IN_LIST:
      return extend(state, {numberMoviesInList: state.numberMoviesInList + action.payload});
    case ActionType.RESET_NUMBER_MOVIES_IN_LIST:
      return extend(state, {numberMoviesInList: NUMBER_FILMS_IN_LIST});
    case ActionType.SET_ACTIVE_GENRE:
      return extend(state, {activeGenre: action.activeGenre});
    case ActionType.SET_PLAY_MOVIE:
      return extend(state, {playingMovie: action.playingMovie});
    case ActionType.LOAD_MOVIES:
      return extend(state, {movies: action.payload});
    default:
      return state;
  }
}
