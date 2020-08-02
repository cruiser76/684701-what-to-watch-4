import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {ActionCreator} from '../../reducer/condition/condition.js';
import {AuthorizationStatus} from './../../reducer/user/user.js';
import {Operation} from './../../reducer/data/data.js';
import {getIsLoadingMovies} from './../../reducer/data/selectors.js';
import {getFilteredMovies} from './../../reducer/condition/selectors.js';
import {getAuthorizationStatus} from './../../reducer/user/selectors.js';

import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import {Loader} from '../loader/loader.jsx';

const MoviePage = (props) => {
  if (!props.isLoadingMovies) {
    const {authorizationStatus, movies, onMyListClick} = props;
    const id = +props.match.params.id;
    const movie = movies.find((currrentMovie) => currrentMovie.key === id);
    const {brief, img, key, isFavorite} = movie;
    const {posterSrc, bgSrc} = img;
    const {title, genre, year, score, level, scoresCount} = brief;
    const starring = brief.starring.join(`, `);

    return (
      <Fragment>
        <section className="movie-card movie-card--full">
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={bgSrc} alt={title} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <Header
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

              <div className="movie-card__desc">
                <nav className="movie-nav movie-card__nav">
                  <ul className="movie-nav__list">
                    <li className="movie-nav__item movie-nav__item--active">
                      <a href="#" className="movie-nav__link">Overview</a>
                    </li>
                    <li className="movie-nav__item">
                      <a href="#" className="movie-nav__link">Details</a>
                    </li>
                    <li className="movie-nav__item">
                      <a href="#" className="movie-nav__link">Reviews</a>
                    </li>
                  </ul>
                </nav>

                <div className="movie-rating">
                  <div className="movie-rating__score">{score}</div>
                  <p className="movie-rating__meta">
                    <span className="movie-rating__level">{level}</span>
                    <span className="movie-rating__count">{scoresCount} ratings</span>
                  </p>
                </div>

                <div className="movie-card__text">
                  <p>{brief.description}</p>

                  <p className="movie-card__director"><strong>Director: {brief.director}</strong></p>

                  <p className="movie-card__starring"><strong>Starring: {starring}</strong></p>
                </div>
              </div>
            </div>
          </div>
        </section >

        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>

            <div className="catalog__movies-list">
              <article className="small-movie-card catalog__movies-card">
                <div className="small-movie-card__image">
                  <img src="/img/fantastic-beasts-the-crimes-of-grindelwald.jpg" alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175" />
                </div>
                <h3 className="small-movie-card__title">
                  <a className="small-movie-card__link" href="movie-page.html">Fantastic Beasts: The Crimes of Grindelwald</a>
                </h3>
              </article>

              <article className="small-movie-card catalog__movies-card">
                <div className="small-movie-card__image">
                  <img src="/img/bohemian-rhapsody.jpg" alt="Bohemian Rhapsody" width="280" height="175" />
                </div>
                <h3 className="small-movie-card__title">
                  <a className="small-movie-card__link" href="movie-page.html">Bohemian Rhapsody</a>
                </h3>
              </article>

              <article className="small-movie-card catalog__movies-card">
                <div className="small-movie-card__image">
                  <img src="/img/macbeth.jpg" alt="Macbeth" width="280" height="175" />
                </div>
                <h3 className="small-movie-card__title">
                  <a className="small-movie-card__link" href="movie-page.html">Macbeth</a>
                </h3>
              </article>

              <article className="small-movie-card catalog__movies-card">
                <div className="small-movie-card__image">
                  <img src="/img/aviator.jpg" alt="Aviator" width="280" height="175" />
                </div>
                <h3 className="small-movie-card__title">
                  <a className="small-movie-card__link" href="movie-page.html">Aviator</a>
                </h3>
              </article>
            </div>
          </section>

          <Footer
            href={`#`}
          />
        </div>
      </Fragment >
    );
  } else {
    return <Loader />;
  }
};

MoviePage.propTypes = {
  onPlayButtonClick: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  movies: PropTypes.array.isRequired,
  onMyListClick: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    isLoadingMovies: getIsLoadingMovies(state),
    movies: getFilteredMovies(state),
    authorizationStatus: getAuthorizationStatus(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPlayButtonClick: (movie) => {
      dispatch(ActionCreator.setPlayingMovie(movie));
    },
    onMyListClick: (id, status) => {
      dispatch(Operation.setFavorite(id, status));
    }
  };
};

export {MoviePage};
export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
