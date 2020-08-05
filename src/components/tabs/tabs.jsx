import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import TabOverview from '../tab-overview/tab-overview.jsx';
import TabDetails from '../tab-details/tab-details.jsx';
import TabReviews from '../tab-reviews/tab-reviews.jsx';
import {Tab} from '../../const.js';

import {getReviews, getIsLoadingReviews} from '../../reducer/review/selectors.js';
import {Operation} from '../../reducer/review/review.js';

const Tabs = (props) => {

  const getActiveTab = (tab, movie, reviews) => {
    switch (tab) {
      case Tab[0]:
        return <TabOverview movie={movie} />;
      case Tab[1]:
        return <TabDetails movie={movie} />;
      case Tab[2]:
        return <TabReviews reviews={reviews} />;
      default:
        return ``;
    }
  };

  const {activeElement, movie, setActiveElement, reviews, loadReviews} = props;
  return (
    <div className="movie-card__desc">
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          {Tab.map((tab) => {
            return (
              <li key={tab}
                className={`movie-nav__item ${activeElement === tab && `movie-nav__item--active`}`}>
                <a
                  href="#"
                  className="movie-nav__link"
                  onClick={(evt) => {
                    evt.preventDefault();
                    setActiveElement(tab);
                    if (tab === Tab[2]) {
                      loadReviews(movie.key);
                    }
                  }}
                >{tab}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      {getActiveTab(activeElement, movie, reviews)}
    </div>
  );
};

Tabs.propTypes = {
  movie: PropTypes.object.isRequired,
  activeElement: PropTypes.string.isRequired,
  setActiveElement: PropTypes.func.isRequired,
  reviews: PropTypes.array.isRequired,
  loadReviews: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    reviews: getReviews(state),
    isLoadingReviews: getIsLoadingReviews(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadReviews: (movieId) => {
      dispatch(Operation.loadReviews(movieId));
    },
  };
};

export {Tabs};
export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
