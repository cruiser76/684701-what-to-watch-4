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

const movies = Films.slice(0, NUMBER_FILMS_IN_LIST);

it(`Reducer without add parameters return initial state`, () => {
  expect(reducer(undefined, {})).toEqual({
    moviesList: Films,
    movies,
    promo: Promo,
    currentMovie: null,
    genresList: getGenresList(),
    numberFilmsInList: NUMBER_FILMS_IN_LIST,
  });
});

it(`Reducer sould change currmove`, () => {
  expect(reducer({
    currentMovie: null
  }, {
    type: ActionType.OPEN_MOVIE_PAGE,
    movie: `id`
  })).toEqual({
    currentMovie: `id`
  });
});

