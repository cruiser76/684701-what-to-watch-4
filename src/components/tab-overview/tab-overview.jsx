import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

const TabOverview = (props) => {
  const {movie} = props;
  const {brief} = movie;
  const {score, level, scoresCount, director, description} = brief;
  const starring = brief.starring.join(`, `);
  return (
    <Fragment>
      <div className="movie-rating">
        <div className="movie-rating__score">{score}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{level}</span>
          <span className="movie-rating__count">{scoresCount} ratings</span>
        </p>
      </div>

      <div className="movie-card__text">
        <p>{description}</p>

        <p className="movie-card__director"><strong>Director: {director}</strong></p>

        <p className="movie-card__starring"><strong>Starring: {starring}</strong></p>
      </div>
    </Fragment>
  );
};

TabOverview.propTypes = {
  movie: PropTypes.object.isRequired
};

export default TabOverview;
