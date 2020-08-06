import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Review from '../review/review.jsx';
import withReviewData from '../../hocs/with-review-data/with-review-data.jsx';
import {Loader} from '../loader/loader.jsx';

import {ActionCreator} from '../../reducer/condition/condition.js';
import {getIsLoadingMovies} from './../../reducer/data/selectors.js';
import {getFilteredMovies} from './../../reducer/condition/selectors.js';
import {getIsSavingReview} from './../../reducer/review/selectors.js';
import {Operation as ReviewOperation} from './../../reducer/review/review.js';
import {getAuthorizationStatus, getUserInfo} from '../../reducer/user/selectors.js';

const ReviewWrapped = withReviewData(Review);

const ReviewPage = (props) => {
  const {isLoadingMovies} = props;
  return !isLoadingMovies
    ? (<ReviewWrapped
      {...props}
    />)
    : <Loader />;
};

const mapStateToProps = (state) => {
  return {
    isLoadingMovies: getIsLoadingMovies(state),
    movies: getFilteredMovies(state),
    isSavingReview: getIsSavingReview(state),
    authorizationStatus: getAuthorizationStatus(state),
    userInfo: getUserInfo(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddReviewClick: () => {
      dispatch(ActionCreator.setSignIn(true));
    },
    onSubmit: (commentData, movieId) => {
      dispatch(ReviewOperation.postReview(commentData, movieId));
    },
  };
};

ReviewPage.propTypes = {
  isLoadingMovies: PropTypes.bool.isRequired
};

export {ReviewPage};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewPage);
