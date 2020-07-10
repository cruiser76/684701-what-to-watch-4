import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import {openMoviePage, filterMovieList, changeNumberMovies, changeNumberMoviesInList,
  resetNumberMoviesInList} from './../../redux/actions.js';
import Main from './../main/main.jsx';
import MoviePage from './../movie-page/movie-page.jsx';


class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {currentMovie} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {currentMovie ?
              <MoviePage
                movie={currentMovie}
              /> :
              <Main
                {...this.props}
              />
            }
          </Route>
          <Route exact path="/dev-component">
            <MoviePage
              movie={{}}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    moviesList: state.moviesList,
    promo: state.promo,
    currentMovie: state.currentMovie,
    genresList: state.genresList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCardClick: (movie) => {
      dispatch(openMoviePage(movie));
    },
    onGenreClick: (genre) => {
      dispatch(filterMovieList(genre));
      dispatch(resetNumberMoviesInList());
      dispatch(changeNumberMovies());
    },
    onMoreBtnClick: (evt) => {
      evt.preventDefault();
      dispatch(changeNumberMoviesInList());
      dispatch(changeNumberMovies());
    }
  };
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  currentMovie: PropTypes.object,
};
