import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import {openMoviePage, changeNumberMoviesInList, resetNumberMoviesInList, setActiveGenre, setPlayingMovie} from './../../redux/actions.js';
import Main from './../main/main.jsx';
import MoviePage from './../movie-page/movie-page.jsx';
import MainVideoPlayer from './../main-video-player/main-video-player.jsx';
import withMainVideoPlayer from './../../hocs/with-main-video-payer/with-main-video-player.jsx';

const MainVideoPlayerWrapped = withMainVideoPlayer(MainVideoPlayer);


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
              movie={this.props.movies[0]}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.activeGenre === `All genres` ? state.movies : state.movies.filter((movie) => movie.brief.genre === state.activeGenre),
    promo: state.promo,
    currentMovie: state.currentMovie,
    genresList: state.genresList,
    activeGenre: state.activeGenre,
    numberMoviesInList: state.numberMoviesInList,
    playingMovie: state.playingMovie
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCardClick: (movie) => {
      dispatch(openMoviePage(movie));
    },
    onGenreClick: (genre) => {
      dispatch(resetNumberMoviesInList());
      dispatch(setActiveGenre(genre));
    },
    onMoreBtnClick: (evt) => {
      evt.preventDefault();
      dispatch(changeNumberMoviesInList());
    },
    onPlayButtonClick: (movie) => {
      dispatch(setPlayingMovie(movie));
    },
    onExitButtonClick: () => {
      dispatch(setPlayingMovie(null));
    }
  };
};

App.propTypes = {
  movies: PropTypes.array.isRequired,
  currentMovie: PropTypes.object,
  playingMovie: PropTypes.object,
  onPlayButtonClick: PropTypes.func.isRequired,
  onExitButtonClick: PropTypes.func.isRequired,
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
