import reducer from './reducer.js';
import Films, {Promo} from './../mocks/films.js';
import ActionType from './action-type.js';
import {NUMBER_FILMS_IN_LIST} from './../const.js';

const getGenresList = () => {
  const allGenres = Films.map((el) => el.brief.genre);
  const uniqueGenres = [...new Set(allGenres)].sort();
  const resultGenresList = [`All genres`, ...uniqueGenres].slice(0, 10);
  return resultGenresList;
};

it(`Reducer without add parameters return initial state`, () => {
  expect(reducer(undefined, {})).toEqual({
    movies: Films,
    promo: Promo,
    currentMovie: null,
    genresList: getGenresList(),
    numberMoviesInList: NUMBER_FILMS_IN_LIST,
    activeGenre: getGenresList()[0],
    playingMovie: null
  });
});

it(`Reducer sould change current move`, () => {
  expect(reducer({
    currentMovie: null
  }, {
    type: ActionType.OPEN_MOVIE_PAGE,
    movie: `id`
  })).toEqual({
    currentMovie: `id`
  });
});

it(`Reducer sould change activeGenre`, () => {
  expect(reducer({
    activeGenre: `All genres`
  }, {
    type: ActionType.SET_ACTIVE_GENRE,
    activeGenre: `Drama`
  })).toEqual({
    activeGenre: `Drama`
  });
});

it(`Reducer sould change numberMoviesInList`, () => {
  expect(reducer({
    numberMoviesInList: 8
  }, {
    type: ActionType.CHANGE_NUMBER_MOVIES_IN_LIST,
    payload: 8
  })).toEqual({
    numberMoviesInList: 16
  });
});

it(`Reducer sould reset numberMoviesInList`, () => {
  expect(reducer({
    numberMoviesInList: 32
  }, {
    type: ActionType.RESET_NUMBER_MOVIES_IN_LIST,
  })).toEqual({
    numberMoviesInList: 8
  });
});

