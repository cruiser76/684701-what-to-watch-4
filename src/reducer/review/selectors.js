import NameSpace from './../name-space.js';

const NAME_SPACE = NameSpace.REVIEW;

export const getIsSavingReview = (state) => {
  return state[NAME_SPACE].isSavingReview;
};

export const getReviews = (state) => {
  return state[NAME_SPACE].currentReviews;
};

export const getIsLoadingReviews = (state) => {
  return state[NAME_SPACE].isLoadingReviews;
};
