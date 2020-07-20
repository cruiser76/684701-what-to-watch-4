import {extend} from './../../utils.js';

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_PROMO: `LOAD_PROMO`,
  ISLOADING_MOVIES: `ISLOADING_MOVIES`,
  ISLOADING_PROMO: `ISLOADING_PROMO`,
};

const initialState = {
  movies: [],
  promo: {},
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
  }
};

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadMovies(response.data));
        dispatch(ActionCreator.isLoadingMovies(false));
      });
  },

  loadPromo: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.loadPromo(response.data));
        dispatch(ActionCreator.isLoadingPromo(false));
      });
  }
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
    default:
      return state;
  }
};

export {reducer, ActionCreator, ActionType, Operation};
