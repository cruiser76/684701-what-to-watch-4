import React from 'react';
import PropTypes from 'prop-types';

import {formatDate} from '../../utils.js';

const TabReviews = (props) => {

  const renderRewiewItem = (review) => {
    return (
      <div key={review.id} className="review">
        <blockquote className="review__quote">
          <p className="review__text">{review.comment}</p>

          <footer className="review__details">
            <cite className="review__author">{review.user.name}</cite>
            <time className="review__date" dateTime={review.date}>{formatDate(review.date)}</time>
          </footer>
        </blockquote>

        <div className="review__rating">{review.rating}</div>
      </div>
    );
  };

  const reviewListLength = props.reviews.length;

  if (reviewListLength > 0) {
    const {reviews} = props;
    const reviewsCenter = Math.round(reviewListLength / 2);
    return (
      <div className="movie-card__reviews movie-card__row">
        <div className="movie-card__reviews-col">
          {reviews.slice(0, reviewsCenter).map((review) => {
            return renderRewiewItem(review);
          })}
        </div>

        <div className="movie-card__reviews-col">
          {reviews.slice(reviewsCenter).map((review) => {
            return renderRewiewItem(review);
          })}
        </div>
      </div>
    );
  } else {
    return ``;
  }
};

TabReviews.propTypes = {
  reviews: PropTypes.array.isRequired
};

export default TabReviews;
