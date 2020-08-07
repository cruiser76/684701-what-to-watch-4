import MockAdapter from 'axios-mock-adapter';
import {createAPI} from './../../api.js';
import {reducer, ActionType, Operation} from './data.js';

const api = createAPI(() => {});

const movies = [{
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
}];

it(`Reducer without add parameters return initial state`, () => {
  expect(reducer(undefined, {})).toEqual({
    movies: [],
    promo: {},
    isLoadingMovies: true,
    isLoadingPromo: true,
    favoriteMovies: [],
    isLoadingFavorite: true,
  });
});

it(`Reducer should update movies by load movies`, () => {
  expect(reducer({
    movies: [],
  }, {
    type: ActionType.LOAD_MOVIES,
    payload: movies,
  })).toEqual({
    movies,
  });
});

it(`Reducer should update promo by load promo`, () => {
  expect(reducer({
    promo: {},
  }, {
    type: ActionType.LOAD_PROMO,
    payload: movies[0],
  })).toEqual({
    promo: movies[0]
  });
});

it(`Reducer should update promo by load favorite`, () => {
  expect(reducer({
    favoriteMovies: [],
  }, {
    type: ActionType.LOAD_FAVORITE,
    payload: movies,
  })).toEqual({
    favoriteMovies: movies
  });
});


it(`Reducer should change isloadingMovies`, () => {
  expect(reducer({
    isLoadingMovies: true,
  }, {
    type: ActionType.ISLOADING_MOVIES,
    payload: false,
  })).toEqual({
    isLoadingMovies: false
  });
});

it(`Reducer should change isloadingFavorite`, () => {
  expect(reducer({
    isLoadingFavorite: true,
  }, {
    type: ActionType.ISLOADING_FAVORITE,
    payload: false,
  })).toEqual({
    isLoadingFavorite: false
  });
});

it(`Reducer should change ISLOADING_PROMO`, () => {
  expect(reducer({
    isLoadingPromo: true,
  }, {
    type: ActionType.ISLOADING_PROMO,
    payload: false,
  })).toEqual({
    isLoadingPromo: false
  });
});

it(`Reducer should update movies`, () => {
  expect(reducer({
    movies,
  }, {
    type: ActionType.UPDATE_MOVIES,
    payload: movies,
  })).toEqual({
    movies
  });
});

it(`Reducer should update promo`, () => {
  expect(reducer({
    promo: movies[0],
  }, {
    type: ActionType.UPDATE_PROMO,
    payload: movies[0],
  })).toEqual({
    promo: movies[0],
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /films`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const moviesLoader = Operation.loadMovies();

    apiMock
      .onGet(`/films`)
      .reply(200, [{fake: true}]);

    return moviesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_MOVIES,
          payload: [{fake: true}],
        });
      });
  });

  it(`Should make a correct API call to /films/promo`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const promoLoader = Operation.loadPromo();

    apiMock
      .onGet(`/films/promo`)
      .reply(200, [{fake: true}]);

    return promoLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_PROMO,
          payload: [{fake: true}],
        });
      });
  });

  it(`Should make a correct API call to get /favorite`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoriteLoader = Operation.loadFavorite();

    apiMock
      .onGet(`/favorite`)
      .reply(200, [{fake: true}]);

    return favoriteLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FAVORITE,
          payload: [{fake: true}],
        });
      });
  });

  it(`Should make a correct API call to post /favorite`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoritePost = Operation.setFavorite(1, 1);

    apiMock
      .onPost(`/favorite/1/1`)
      .reply(200, [{fake: true}]);

    const getState = () => {
      return {
        DATA: {
          movies,
          promo: movies[0]
        }
      };
    };

    return favoritePost(dispatch, getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
      });
  });
});
