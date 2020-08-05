import React from 'react';
import PropTypes from 'prop-types';

import {Months} from '../../const.js';

const TabReviews = (props) => {
  if (props.reviews.length > 0) {
    const {reviews} = props;

    return (
      <div className="movie-card__reviews movie-card__row">
        <div className="movie-card__reviews-col">
          {reviews.map((review, i) => {
            const date = new Date(review.date);
            return i % 2 === 0 ? (
              <div key={review.id} className="review">
                <blockquote className="review__quote">
                  <p className="review__text">{review.comment}</p>

                  <footer className="review__details">
                    <cite className="review__author">{review.user.name}</cite>
                    <time className="review__date" dateTime={review.date}>{`${Months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}</time>
                  </footer>
                </blockquote>

                <div className="review__rating">{review.rating}</div>
              </div>
            ) : ``;
          })}
        </div>

        <div className="movie-card__reviews-col">
          {reviews.map((review, i) => {
            const date = new Date(review.date);
            return i % 2 !== 0 ? (
              <div key={review.id} className="review">
                <blockquote className="review__quote">
                  <p className="review__text">{review.comment}</p>

                  <footer className="review__details">
                    <cite className="review__author">{review.user.name}</cite>
                    <time className="review__date" dateTime={review.date}>{`${Months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}</time>
                  </footer>
                </blockquote>

                <div className="review__rating">{review.rating}</div>
              </div>
            ) : ``;
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
