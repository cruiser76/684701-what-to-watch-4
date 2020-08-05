import {extend} from './../../utils';
import {Url} from '../../const.js';


const ActionType = {
  POST_REVIEW: `POST_REVIEW`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  IS_LOADING_REVIEWS: `IS_LOADING_REVIEWS`
};

const initialState = {
  isSavingReview: false,
  currentReviews: [],
  isLoadingReview: true
};

const ActionCreator = {
  postReview: (status) => {
    return {
      type: ActionType.POST_REVIEW,
      payload: status
    };
  },
  getReviews: (reviews) => {
    return {
      type: ActionType.LOAD_REVIEWS,
      payload: reviews
    };
  },
  isLoadingReviews: (status) => {
    return {
      type: ActionType.IS_LOADING_REVIEWS,
      payload: status
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.POST_REVIEW:
      return extend(state, {isSavingReview: action.payload});
    case ActionType.LOAD_REVIEWS:
      return extend(state, {currentReviews: action.payload});
    case ActionType.IS_LOADING_REVIEWS:
      return extend(state, {isLoadingReviews: action.payload});
  }
  return state;
};

const Operation = {
  postReview: (commentData, movieId) => (dispatch, getState, api) => {
    dispatch(ActionCreator.postReview(true));
    return api.post(`${Url.POST_REVIEW}/${movieId}`, {
      rating: commentData.rating,
      comment: commentData.comment,
    })
      .then(() => {
        dispatch(ActionCreator.postReview(false));
      })
      .catch((err) => {
        dispatch(ActionCreator.postReview(false));
        throw err;
      });
  },

  loadReviews: (movieId) => (dispatch, getState, api) => {
    dispatch(ActionCreator.getReviews([]));
    dispatch(ActionCreator.isLoadingReviews(true));
    return api.get(`${Url.GET_REVIEWS}/${movieId}`)
      .then((response) => {
        dispatch(ActionCreator.getReviews(response.data));
        dispatch(ActionCreator.isLoadingReviews(false));
      })
      .catch((err) => {
        dispatch(ActionCreator.isLoadingReviews(false));
        throw err;
      });
  },
};

export {
  ActionCreator,
  ActionType,
  Operation,
  reducer,
};
