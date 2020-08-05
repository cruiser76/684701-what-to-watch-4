import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import MovieList from '../movie-list/movie-list.jsx';
import withActiveElement from '../../hocs/with-active-element/with-active-element.jsx';
import {Loader} from '../loader/loader.jsx';

import {ActionCreator} from '../../reducer/condition/condition.js';
import {Operation} from '../../reducer/data/data.js';
import {getIsLoadingFavorite, getFavoriteMovies} from '../../reducer/data/selectors.js';
import {getUserInfo} from '../../reducer/user/selectors.js';

const MovieListWrapped = withActiveElement(MovieList);

const SERVER_URL = `https://4.react.pages.academy`;
const MyList = (props) => {
  if (!props.isLoadingFavorite) {
    const {movies, onCardClick, isLoadingFavorite, userInfo} = props;
    return (
      <Fragment>
        <div className="user-page">
          <header className="page-header user-page__head">
            <div className="logo">
              <Link to={`/`} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <h1 className="page-title user-page__title">My list</h1>

            <div className="user-block">
              <div className="user-block__avatar">
                <img src={`${SERVER_URL}${userInfo.avatar_url}`} alt="User avatar" width="63" height="63" />
              </div>
            </div>
          </header>

          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>

            <MovieListWrapped
              isLoadingMovies={isLoadingFavorite}
              movies={movies}
              onCardClick={onCardClick}
              numberMoviesInList={movies.length}
            />

          </section>

          <footer className="page-footer">
            <div className="logo">
              <Link to={`/`} className="logo__link logo__link--light">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </Fragment>
    );
  } else {
    props.loadFavorite();
    return <Loader />;
  }
};

MyList.propTypes = {
  movies: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isLoadingFavorite: getIsLoadingFavorite(state),
    movies: getFavoriteMovies(state),
    userInfo: getUserInfo(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadFavorite: () => {
      dispatch(Operation.loadFavorite());
    },
    onCardClick: (movie) => {
      dispatch(ActionCreator.openMoviePage(movie));
    }
  };
};

export {MyList};
export default connect(mapStateToProps, mapDispatchToProps)(MyList);
