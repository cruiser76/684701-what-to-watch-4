import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import Main from './../main/main.jsx';
import MoviePage from './../movie-page/movie-page.jsx';
import MainVideoPlayer from './../main-video-player/main-video-player.jsx';
import withVideoPlayer from './../../hocs/with-video-player/with-video-player.jsx';

import {ActionCreator} from '../../reducer/condition/condition.js';
import {Operation as UserOperation} from './../../reducer/user/user.js';
import {getPromo} from './../../reducer/data/selectors.js';
import {getGenresList, getFilteredMovie, getActiveGenre} from './../../reducer/condition/selectors.js';
import {getAuthorizationStatus} from '../../reducer/user/selectors.js';


import SignIn from './../sign-in/sign-in.jsx';


const MainVideoPlayerWrapped = withVideoPlayer(MainVideoPlayer);

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderVideoScreen() {
    const {currentMovie, playingMovie, onPlayButtonClick, onExitButtonClick, authorizationStatus, isSignIn} = this.props;
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
    } else if (isSignIn) {
      return (
        <SignIn

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
            />
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
};

const mapStateToProps = (state) => {
  return {
    isLoadingMovies: state.DATA.isLoadingMovies,
    isLoadingPromo: state.DATA.isLoadingPromo,
    movies: getFilteredMovie(state),
    promo: getPromo(state),
    currentMovie: state.CONDITION.currentMovie,
    genresList: getGenresList(state),
    activeGenre: getActiveGenre(state),
    numberMoviesInList: state.CONDITION.numberMoviesInList,
    playingMovie: state.CONDITION.playingMovie,
    authorizationStatus: getAuthorizationStatus(state),
    isSignIn: state.CONDITION.isSignIn
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
    },
    onMyListClick: () => {
      dispatch(ActionCreator.setSignIn);
    },
    onAddReviewClick: () => {
      dispatch(ActionCreator.setSignIn);
    }
  };
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
