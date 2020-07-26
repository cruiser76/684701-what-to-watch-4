import {extend} from './../../utils';

const SERVER_ROUTE = {
  review: `/comments`
};

const ActionType = {
  POST_REVIEW: `POST_REVIEW`,
};

const initialState = {
  isSavingReview: false
};

const ActionCreator = {
  postReview: (status) => {
    return {
      type: ActionType.POST_REVIEW,
      payload: status
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.POST_REVIEW:
      return extend(state, {
        isSavingReview: action.payload,
      });
  }
  return state;
};

const Operation = {
  postReview: (commentData, movieId) => (dispatch, getState, api) => {
    dispatch(ActionCreator.postReview(true));
    return api.post(`${SERVER_ROUTE.review}/${movieId}`, {
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
};

export {
  ActionCreator,
  ActionType,
  Operation,
  reducer,
};
