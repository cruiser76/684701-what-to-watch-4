import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Route, Switch, Router} from 'react-router-dom';
import {connect} from 'react-redux';
import history from './../../history.js';

import Main from './../main/main.jsx';
import MoviePage from './../movie-page/movie-page.jsx';
import MainVideoPlayer from './../main-video-player/main-video-player.jsx';
import withVideoPlayer from './../../hocs/with-video-player/with-video-player.jsx';
import SignIn from './../sign-in/sign-in.jsx';
import Review from '../review/review.jsx';
import {Loader} from '../loader/loader.jsx';
import withReviewData from './../../hocs/with-review-data/with-review-data.jsx';

import {ActionCreator} from '../../reducer/condition/condition.js';
import {Operation} from './../../reducer/data/data.js';
import {Operation as UserOperation} from './../../reducer/user/user.js';
import {Operation as ReviewOperation} from './../../reducer/review/review.js';

import {getPromo, getIsLoadingMovies, getIsLoadingPromo} from './../../reducer/data/selectors.js';
import {getFilteredMovies, getActiveGenre, getCurrentMovie, getNumberMoviesInList, getPlayingMovie, getGenresList, getIsSignIn} from './../../reducer/condition/selectors.js';
import {getAuthorizationStatus} from './../../reducer/user/selectors.js';
import {getIsSavingReview} from './../../reducer/review/selectors.js';
import {AppRoute} from './../../const.js';

const MainVideoPlayerWrapped = withVideoPlayer(MainVideoPlayer);
const ReviewWrapped = withReviewData(Review);

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {postReview, login, authorizationStatus, onExitButtonClick, isSavingReview, onPlayButtonClick, isLoadingMovies, movies, onMyListClick} = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route
            exact
            path={AppRoute.MAIN}
            render={() => {
              return (
                <Main
                  {...this.props}
                />
              );
            }}
          />
          <Route
            exact
            path={AppRoute.LOGIN}
            render={() => {
              return (
                <SignIn
                  onSubmit={login}
                />
              );
            }}
          />
          <Route
            exact
            path={AppRoute.PLAYER}
            render={(props) => {
              return !isLoadingMovies ? (
                <MainVideoPlayerWrapped
                  {...props}
                  onSubmit={login}
                  movies={movies}
                  onExitButtonClick={onExitButtonClick}
                  isActive={false}
                  rePlay={false}
                  muted={false}
                />
              ) : <Loader />;
            }}
          />
          <Route
            exact
            path={AppRoute.FILMS}
            render={(props) => {
              return !isLoadingMovies ? (
                <MoviePage
                  {...props}
                  movies={movies}
                  authorizationStatus={authorizationStatus}
                  onPlayButtonClick={onPlayButtonClick}
                  onMyListClick={onMyListClick}
                />
              ) : <Loader />;
            }}
          />
          <Route
            exact
            path={AppRoute.REVIEW}
            render={(props) => {
              return !isLoadingMovies ? (
                <ReviewWrapped
                  {...props}
                  movies={movies}
                  onSubmit={postReview}
                  isSavingReview={isSavingReview}
                />
              ) : <Loader />;
            }}
          />
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  movies: PropTypes.array.isRequired,
  currentMovie: PropTypes.object,
  playingMovie: PropTypes.object,
  onPlayButtonClick: PropTypes.func.isRequired,
  onExitButtonClick: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  isSignIn: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  postReview: PropTypes.func.isRequired,
  isLoadingMovies: PropTypes.bool.isRequired,
  isSavingReview: PropTypes.bool.isRequired,
  onMyListClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isLoadingMovies: getIsLoadingMovies(state),
    isLoadingPromo: getIsLoadingPromo(state),
    movies: getFilteredMovies(state),
    promo: getPromo(state),
    currentMovie: getCurrentMovie(state),
    genresList: getGenresList(state),
    activeGenre: getActiveGenre(state),
    numberMoviesInList: getNumberMoviesInList(state),
    playingMovie: getPlayingMovie(state),
    authorizationStatus: getAuthorizationStatus(state),
    isSignIn: getIsSignIn(state),
    isSavingReview: getIsSavingReview(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCardClick: (movie) => {
      dispatch(ActionCreator.openMoviePage(movie));
    },
    onGenreClick: (genre) => {
      dispatch(ActionCreator.resetNumberMoviesInList());
      dispatch(ActionCreator.setActiveGenre(genre));
    },
    onMoreBtnClick: (evt) => {
      evt.preventDefault();
      dispatch(ActionCreator.changeNumberMoviesInList());
    },
    onPlayButtonClick: (movie) => {
      dispatch(ActionCreator.setPlayingMovie(movie));
    },
    onExitButtonClick: () => {
      dispatch(ActionCreator.setPlayingMovie(null));
    },
    login: (authData) => {
      dispatch(UserOperation.login(authData));
      dispatch(ActionCreator.setSignIn(false));
    },
    onAddReviewClick: () => {
      dispatch(ActionCreator.setSignIn(true));
    },
    postReview: (commentData, movieId) => {
      dispatch(ReviewOperation.postReview(commentData, movieId));
    },
    onMyListClick: (id, status) => {
      dispatch(Operation.setFavorite(id, status));
    }

  };
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
