import Films, {Promo} from './../mocks/films.js';
import ActionType from './action-type.js';
import {extend} from './../utils.js';
import {NUMBER_FILMS_IN_LIST} from './../const.js';

const getGenresList = () => {
  const allGenres = Films.map((el) => el.brief.genre);
  const uniqueGenres = [...new Set(allGenres)].sort();
  const resultGenresList = [`All genres`, ...uniqueGenres].slice(0, 10);
  return resultGenresList;
};

const initialState = {
  movies: Films,
  promo: Promo,
  currentMovie: null,
  genresList: getGenresList(),
  numberMoviesInList: NUMBER_FILMS_IN_LIST,
  activeGenre: getGenresList()[0],
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
    default:
      return state;
  }
}
