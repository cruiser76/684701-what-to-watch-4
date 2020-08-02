import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Route, Switch, Router} from 'react-router-dom';
import {connect} from 'react-redux';
import history from '../../history.js';

import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import ReviewPage from '../review-page/review-page.jsx';
import VideoPlayerPage from '../video-player-page/video-player-page.jsx';
import MyList from '../my-list/my-list.jsx';

import {ActionCreator} from '../../reducer/condition/condition.js';
import {Operation} from '../../reducer/data/data.js';
import {Operation as UserOperation} from '../../reducer/user/user.js';

import {getPromo, getIsLoadingMovies, getIsLoadingPromo} from '../../reducer/data/selectors.js';
import {getFilteredMovies, getActiveGenre, getNumberMoviesInList, getGenresList} from '../../reducer/condition/selectors.js';
import {getAuthorizationStatus} from '../../reducer/user/selectors.js';
import {AppRoute} from '../../const.js';

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {login} = this.props;

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
            component={VideoPlayerPage}
          />
          <Route
            exact
            path={AppRoute.FILMS}
            component={MoviePage}
          />
          <Route
            exact
            path={AppRoute.REVIEW}
            component={ReviewPage}
          />
          <Route
            exact
            path={AppRoute.MY_LIST}
            component={MyList}
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
  authorizationStatus: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  isLoadingMovies: PropTypes.bool.isRequired,
  onMyListClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isLoadingMovies: getIsLoadingMovies(state),
    isLoadingPromo: getIsLoadingPromo(state),
    movies: getFilteredMovies(state),
    promo: getPromo(state),
    genresList: getGenresList(state),
    activeGenre: getActiveGenre(state),
    numberMoviesInList: getNumberMoviesInList(state),
    authorizationStatus: getAuthorizationStatus(state),
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
    login: (authData) => {
      dispatch(UserOperation.login(authData));
      dispatch(ActionCreator.setSignIn(false));
    },
    onMyListClick: (id, status) => {
      dispatch(Operation.setFavorite(id, status));
    },
  };
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
