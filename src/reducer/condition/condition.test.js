import {reducer, ActionType} from './condition.js';

const movies = [
  {
    img: {
      src: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      posterSrc: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      bgSrc: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`
    },
    brief: {
      title: `Fantastic Beasts: The Crimes of Grindelwald`,
      genre: `Drama`,
      year: `2000`,
      score: `9`,
      level: `Good`,
      filmLink: ``
    },
    link: `movie-page.html`,
    key: `fantastic-beasts-the-crimes-of-grindelwald`,
  }
];

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    currentMovie: null,
    genresList: [],
    numberMoviesInList: 8,
    activeGenre: `All genres`,
    playingMovie: null
  });
});

it(`Reducer should increment numberMoviesInList by a given value`, () => {
  expect(reducer({
    numberMoviesInList: 8,
  }, {
    type: ActionType.CHANGE_NUMBER_MOVIES_IN_LIST,
    payload: 8,
  })).toEqual({
    numberMoviesInList: 16,
  });

  expect(reducer({
    numberMoviesInList: 32,
  }, {
    type: ActionType.RESET_NUMBER_MOVIES_IN_LIST,
    payload: 8,
  })).toEqual({
    numberMoviesInList: 8,
  });
});

it(`Reducer should change current movie`, () => {
  expect(reducer({
    currentMovie: null,
  }, {
    type: ActionType.OPEN_MOVIE_PAGE,
    payload: movies[0],
  })).toEqual({
    currentMovie: movies[0]
  });
});
