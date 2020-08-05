import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {ActionCreator} from '../../reducer/condition/condition.js';
import {AuthorizationStatus} from '../../reducer/user/user.js';
import {Operation} from '../../reducer/data/data.js';
import {getIsLoadingMovies} from '../../reducer/data/selectors.js';
import {getFilteredMovies} from '../../reducer/condition/selectors.js';
import {getAuthorizationStatus, getUserInfo} from '../../reducer/user/selectors.js';

import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import Tabs from '../tabs/tabs.jsx';
import MovieList from '../movie-list/movie-list.jsx';
import withActiveElement from '../../hocs/with-active-element/with-active-element.jsx';

import {NUMBER_SAME_MOVIES} from '../../const.js';

const TabsWrapped = withActiveElement(Tabs);
const MovieListWrapped = withActiveElement(MovieList);

class MoviePage extends PureComponent {
  constructor(props) {
    super(props);
    this._findMovie = this._findMovie.bind(this);
  }

  _findMovie() {
    const id = this.props.match.params.id;
    const currentMovie = this.props.movies.find((currrentMovie) => currrentMovie.key === id);
    return currentMovie;
  }

  componentDidMount() {
    this.props.loadReviews(this._findMovie().key);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.loadReviews(this._findMovie().key);
    }
  }

  render() {
    if (!this.props.isLoadingMovies) {
      const {authorizationStatus, movies, onMyListClick, onCardClick, isLoadingMovies, userInfo, match} = this.props;
      const id = match.params.id;
      const movie = movies.find((currrentMovie) => currrentMovie.key === id);
      const sameMovies = movies.filter((film) => {
        return (film.brief.genre === movie.brief.genre && film.key !== movie.key);
      });
      const {brief, img, key, isFavorite} = movie;
      const {posterSrc, bgSrc} = img;
      const {title, genre, year} = brief;

      return (
        <Fragment>
          <section className="movie-card movie-card--full">
            <div className="movie-card__hero">
              <div className="movie-card__bg">
                <img src={bgSrc} alt={title} />
              </div>

              <h1 className="visually-hidden">WTW</h1>

              <Header
                userInfo={userInfo}
              />

              <div className="movie-card__wrap">
                <div className="movie-card__desc">
                  <h2 className="movie-card__title">{title}</h2>
                  <p className="movie-card__meta">
                    <span className="movie-card__genre">{genre}</span>
                    <span className="movie-card__year">{year}</span>
                  </p>

                  <div className="movie-card__buttons">
                    <Link
                      to={`../player/${key}`}
                      className="btn btn--play movie-card__button"
                      type="button"
                    >
                      <svg viewBox="0 0 19 19" width="19" height="19">
                        <use xlinkHref="#play-s"></use>
                      </svg>
                      <span>Play</span>
                    </Link>
                    <button
                      onClick={() => onMyListClick(key, isFavorite ? 0 : 1)}
                      className="btn btn--list movie-card__button" type="button">
                      <svg viewBox="0 0 19 20" width="19" height="20">
                        <use xlinkHref={isFavorite ? `#in-list` : `#add`}></use>
                      </svg>
                      <span>My list</span>
                    </button>
                    <Link
                      className={`btn movie-card__button${authorizationStatus === AuthorizationStatus.AUTH ? `` : ` visually-hidden`}`}
                      to={`${key}/review`}
                    >
                      Add review
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="movie-card__wrap movie-card__translate-top">
              <div className="movie-card__info">
                <div className="movie-card__poster movie-card__poster--big">
                  <img src={posterSrc} alt={`${title}-poster`} width="218" height="327" />
                </div>

                <TabsWrapped
                  movie={movie}
                  activeElement={`Overview`}
                />

              </div>
            </div>
          </section >

          <div className="page-content">
            <section className="catalog catalog--like-this">
              <h2 className="catalog__title">More like this</h2>

              <MovieListWrapped
                isLoadingMovies={isLoadingMovies}
                movies={sameMovies}
                onCardClick={onCardClick}
                numberMoviesInList={NUMBER_SAME_MOVIES}
              />

            </section>

            <Footer
              href={`#`}
            />
          </div>
        </Fragment >
      );
    } else {
      return ``;
    }
  }
}

MoviePage.propTypes = {
  onPlayButtonClick: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  movies: PropTypes.array.isRequired,
  onMyListClick: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  onCardClick: PropTypes.func.isRequired,
  isLoadingMovies: PropTypes.bool.isRequired,
  userInfo: PropTypes.object,
  loadReviews: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    isLoadingMovies: getIsLoadingMovies(state),
    movies: getFilteredMovies(state),
    authorizationStatus: getAuthorizationStatus(state),
    userInfo: getUserInfo(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPlayButtonClick: (movie) => {
      dispatch(ActionCreator.setPlayingMovie(movie));
    },
    onMyListClick: (id, status) => {
      dispatch(Operation.setFavorite(id, status));
    },
    onCardClick: (movie) => {
      dispatch(ActionCreator.openMoviePage(movie));
    },
  };
};

export {MoviePage};
export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
