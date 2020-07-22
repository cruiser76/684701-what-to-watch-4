import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import {ActionCreator} from '../../reducer/condition/condition.js';
import {getPromo, getIsLoadingMovies, getIsLoadingPromo} from './../../reducer/data/selector.js';
import {getFilteredMovies, getActiveGenre, getCurrentMovie, getNumberMoviesInList, getPlayingMovie} from './../../reducer/condition/selector.js';
import Main from './../main/main.jsx';
import MoviePage from './../movie-page/movie-page.jsx';
import MainVideoPlayer from './../main-video-player/main-video-player.jsx';
import withVideoPlayer from './../../hocs/with-video-player/with-video-player.jsx';
import {getGenresList} from './../../reducer/condition/selector.js';


const MainVideoPlayerWrapped = withVideoPlayer(MainVideoPlayer);

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderVideoScreen() {
    const {currentMovie, playingMovie, onPlayButtonClick, onExitButtonClick} = this.props;
    if (currentMovie && !playingMovie) {
      return (
        <MoviePage
          movie={currentMovie}
          onPlayButtonClick={onPlayButtonClick}
        />
      );
    } else if (playingMovie) {
      return (
        <MainVideoPlayerWrapped
          movie={playingMovie}
          onExitButtonClick={onExitButtonClick}
          isActive={true}
          rePlay={false}
          muted={false}
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
              onExitButtonClick={() =>{}}
              isActive={true}
              rePlay={false}
              muted={false}
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
    isLoadingMovies: getIsLoadingMovies(state),
    isLoadingPromo: getIsLoadingPromo(state),
    movies: getFilteredMovies(state),
    promo: getPromo(state),
    currentMovie: getCurrentMovie(state),
    genresList: getGenresList(state),
    activeGenre: getActiveGenre(state),
    numberMoviesInList: getNumberMoviesInList(state),
    playingMovie: getPlayingMovie(state),
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
    }
  };
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
