import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import Main from './../main/main.jsx';
import MoviePage from './../movie-page/movie-page.jsx';
import MainVideoPlayer from './../main-video-player/main-video-player.jsx';
import withVideoPlayer from './../../hocs/with-video-player/with-video-player.jsx';
import SignIn from './../sign-in/sign-in.jsx';
import Review from '../review/review.jsx';
import {Loader} from '../loader/loader.jsx';
import withReviewData from './../../hocs/with-review-data/with-review-data.jsx';

import {ActionCreator} from '../../reducer/condition/condition.js';
import {Operation as UserOperation, AuthorizationStatus} from './../../reducer/user/user.js';
import {Operation as ReviewOperation} from './../../reducer/review/review.js';

import {getPromo, getIsLoadingMovies, getIsLoadingPromo} from './../../reducer/data/selectors.js';
import {getFilteredMovies, getActiveGenre, getCurrentMovie, getNumberMoviesInList, getPlayingMovie, getGenresList, getIsSignIn} from './../../reducer/condition/selectors.js';
import {getAuthorizationStatus} from './../../reducer/user/selectors.js';
import {getIsSavingReview} from './../../reducer/review/selectors.js';


const MainVideoPlayerWrapped = withVideoPlayer(MainVideoPlayer);
const ReviewWrapped = withReviewData(Review);

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderVideoScreen() {
    const {currentMovie, playingMovie, onPlayButtonClick, onExitButtonClick, authorizationStatus, isSignIn, login} = this.props;
    if (currentMovie && !playingMovie && !isSignIn) {
      return (
        <MoviePage
          movie={currentMovie}
          onPlayButtonClick={onPlayButtonClick}
          authorizationStatus={authorizationStatus}
        />
      );
    } else if (playingMovie && !isSignIn) {
      return (
        <MainVideoPlayerWrapped
          movie={playingMovie}
          onExitButtonClick={onExitButtonClick}
          isActive={true}
          rePlay={false}
          muted={false}
        />
      );
    } else if (isSignIn && (authorizationStatus === AuthorizationStatus.NO_AUTH)) {
      return (
        <SignIn
          onSubmit={login}
        />
      );
    } else {
      return (
        <Main
          {...this.props}
        />
      );
    }
  }

  render() {
    const {postReview} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderVideoScreen()}
          </Route>
          <Route exact path="/dev-component">
            <MoviePage
              movie={{}}
              onPlayButtonClick={() => {}}
              authorizationStatus={`NO_AUTH`}
            />
          </Route>
          <Route exact path="/dev-player">
            <MainVideoPlayerWrapped
              movie={{}}
              onExitButtonClick={() => {}}
              isActive={true}
              rePlay={false}
              muted={false}
            />
          </Route>
          <Route exact path="/dev-sign">
            <SignIn
              onSubmit={() => {}}
            />
          </Route>
          <Route exact path="/dev-review">
            {this.props.isLoadingMovies
              ? <Loader />
              : <ReviewWrapped
                onSubmit={postReview}
                movie={this.props.movies[0]}
                isSavingReview={this.props.isSavingReview}
              />}
          </Route>
        </Switch>
      </BrowserRouter>
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
    onMyListClick: () => {
      dispatch(ActionCreator.setSignIn(true));
    },
    onAddReviewClick: () => {
      dispatch(ActionCreator.setSignIn(true));
    },
    postReview: (commentData, movieId) => {
      dispatch(ReviewOperation.postReview(commentData, movieId));
    }

  };
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
