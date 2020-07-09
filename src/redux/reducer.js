import Films, {Promo} from './../mocks/films.js';
import ActionType from './action-type.js';
import {extend} from './../utils.js';
import {NUMBER_FILMS_IN_LIST} from './../const.js';

const genresList = [`All genres`, ...[...(new Set(Films.map((el) => el.brief.genre)))].sort()].slice(0, 9);

const movies = Films.slice(0, NUMBER_FILMS_IN_LIST);

const initialState = {
  moviesList: Films,
  movies,
  promo: Promo,
  currentMovie: null,
  genresList,
  activeGenre: `All genres`,
  numberFilmsInList: NUMBER_FILMS_IN_LIST,
  isMoreBtnShow: movies.length < Films.length
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.OPEN_MOVIE_PAGE:
      return extend(state, {currentMovie: action.movie});
    case ActionType.CHANGE_ACTIVE_GENRE:
      return extend(state, {activeGenre: action.genre});
    case ActionType.FILTER_MOVIE_LIST:
      return extend(state, {moviesList: action.movies});
    case ActionType.CHANGE_NUMBER_MOVIES:
      return extend(state, {movies: state.moviesList.slice(0, state.numberFilmsInList)});
    case ActionType.CHANGE_NUMBER_MOVIES_IN_LIST:
      return extend(state, {numberFilmsInList: state.numberFilmsInList + action.payload});
    case ActionType.RESET_NUMBER_MOVIES_IN_LIST:
      return extend(state, {numberFilmsInList: action.payload});
    case ActionType.SWITCH_MORE_BTN_VISIBILITY:
      return extend(state, {isMoreBtnShow: state.movies.length < state.moviesList.length});
    default:
      return state;
  }
}
