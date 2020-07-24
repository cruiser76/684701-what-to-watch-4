import NameSpace from './../name-space.js';

const NAME_SPACE = NameSpace.REVIEW;

export const getIsSavingReview = (state) => {
  return state[NAME_SPACE].isSavingReview;
};
