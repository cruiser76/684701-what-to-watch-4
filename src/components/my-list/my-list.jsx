import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import MovieList from '../movie-list/movie-list.jsx';
import withActiveElement from '../../hocs/with-active-element/with-active-element.jsx';

import {ActionCreator} from '../../reducer/condition/condition.js';
import {getIsLoadingFavorite, getFavoriteMovies} from '../../reducer/data/selectors.js';
import {getUserInfo} from '../../reducer/user/selectors.js';

import {Url} from '../../const.js';

const MovieListWrapped = withActiveElement(MovieList);

class MyList extends PureComponent {
  componentDidMount() {
    this.props.loadFavorite();
  }

  render() {
    const {movies, onCardClick, isLoadingFavorite, userInfo} = this.props;
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
                <img src={`${Url.HOST}${userInfo.avatar_url}`} alt="User avatar" width="63" height="63" />
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
  }
}

MyList.propTypes = {
  movies: PropTypes.array.isRequired,
  onCardClick: PropTypes.func.isRequired,
  isLoadingFavorite: PropTypes.bool.isRequired,
  userInfo: PropTypes.object.isRequired,
  loadFavorite: PropTypes.func.isRequired,
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
    onCardClick: (movie) => {
      dispatch(ActionCreator.openMoviePage(movie));
    }
  };
};

export {MyList};
export default connect(mapStateToProps, mapDispatchToProps)(MyList);
