import {extend} from './../../utils.js';
import {Url} from './../../const.js';

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_PROMO: `LOAD_PROMO`,
  LOAD_FAVORITE: `LOAD_FAVORITE`,
  ISLOADING_MOVIES: `ISLOADING_MOVIES`,
  ISLOADING_FAVORITE: `ISLOADING_FAVORITE`,
  ISLOADING_PROMO: `ISLOADING_PROMO`,
  UPDATE_MOVIES: `UPDATE_MOVIES`,
  UPDATE_PROMO: `UPDATE_PROMO`
};

const initialState = {
  movies: [],
  promo: {},
  favoriteMovies: [],
  isLoadingFavorite: true,
  isLoadingMovies: true,
  isLoadingPromo: true,
};

const ActionCreator = {
  loadMovies: (movies) => {
    return {
      type: ActionType.LOAD_MOVIES,
      payload: movies
    };
  },

  loadFavorite: (favoriteMovies) => {
    return {
      type: ActionType.LOAD_FAVORITE,
      payload: favoriteMovies
    };
  },

  loadPromo: (promo) => {
    return {
      type: ActionType.LOAD_PROMO,
      payload: promo
    };
  },

  isLoadingMovies: (status) => {
    return {
      type: ActionType.ISLOADING_MOVIES,
      payload: status
    };
  },

  isLoadingPromo: (status) => {
    return {
      type: ActionType.ISLOADING_PROMO,
      payload: status
    };
  },

  isLoadingFavorite: (status) => {
    return {
      type: ActionType.ISLOADING_FAVORITE,
      payload: status
    };
  },

  updateMovies: (movie, movies) => {
    const index = movies.findIndex((currentMovie) => {
      return currentMovie.id === movie.id;
    });
    movies.splice(index, 1, movie);
    return {
      type: ActionType.UPDATE_MOVIES,
      payload: movies
    };
  },

  updatePromo: (promo, oldPromo) => {
    const currentPromo = promo.id === oldPromo.id
      ? promo
      : oldPromo;
    return {
      type: ActionType.UPDATE_PROMO,
      payload: currentPromo
    };
  },
};

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(Url.GET_MOVIES)
      .then((response) => {
        dispatch(ActionCreator.loadMovies(response.data));
        dispatch(ActionCreator.isLoadingMovies(false));
      });
  },

  loadPromo: () => (dispatch, getState, api) => {
    return api.get(Url.GET_PROMO)
      .then((response) => {
        dispatch(ActionCreator.loadPromo(response.data));
        dispatch(ActionCreator.isLoadingPromo(false));
      });
  },

  setFavorite: (filmId, status) => (dispatch, getState, api) => {
    return api.post(`${Url.POST_FAVORITE}/${filmId}/${status}`)
      .then((response) => {
        dispatch(ActionCreator.updateMovies(response.data, getState().DATA.movies));
        dispatch(ActionCreator.updatePromo(response.data, getState().DATA.promo));
      })
      .catch((err) => {
        throw err;
      });
  },

  loadFavorite: () => (dispatch, getState, api) => {
    return api.get(Url.GET_FAVORITE)
      .then((response) => {
        dispatch(ActionCreator.loadFavorite(response.data));
        dispatch(ActionCreator.isLoadingFavorite(false));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return extend(state, {movies: action.payload});
    case ActionType.LOAD_PROMO:
      return extend(state, {promo: action.payload});
    case ActionType.ISLOADING_MOVIES:
      return extend(state, {isLoadingMovies: action.payload});
    case ActionType.ISLOADING_PROMO:
      return extend(state, {isLoadingPromo: action.payload});
    case ActionType.UPDATE_MOVIES:
      return extend(state, {movies: action.payload});
    case ActionType.UPDATE_PROMO:
      return extend(state, {promo: action.payload});
    case ActionType.LOAD_FAVORITE:
      return extend(state, {favoriteMovies: action.payload});
    case ActionType.ISLOADING_FAVORITE:
      return extend(state, {isLoadingFavorite: action.payload});
    default:
      return state;
  }
};

export {reducer, ActionCreator, ActionType, Operation};
