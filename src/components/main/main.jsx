import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import MovieList from './../movie-list/movie-list.jsx';
import GenresList from './../genres-list/genres-list.jsx';
import ShowMore from './../show-more/show-more.jsx';
import withActiveElement from './../../hocs/with-active-element/with-active-element.jsx';

const MovieListWrapped = withActiveElement(MovieList);

const Main = (props) => {
  const {promo, movies, numberMoviesInList, onCardClick, genresList, onGenreClick, onMoreBtnClick, activeGenre, onPlayButtonClick} = props;

  return (
    <Fragment>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="user-block">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </div>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={`img/${promo.key}-poster.jpg`} alt={`${promo.brief.title} poster`} width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{promo.brief.title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{promo.brief.genre}</span>
                <span className="movie-card__year">{promo.brief.year}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button"
                  onClick={() => onPlayButtonClick(promo)}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div >
      </section >

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList
            genresList={genresList}
            onGenreClick={onGenreClick}
            activeGenre={activeGenre}
          />

          <MovieListWrapped
            movies={movies}
            onCardClick={onCardClick}
            numberMoviesInList={numberMoviesInList}
          />

          <ShowMore
            onMoreBtnClick={onMoreBtnClick}
            isMoreBtnShow={numberMoviesInList < movies.length}
          />

        </section>

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </Fragment>
  );
};

Main.propTypes = {
  promo: PropTypes.object.isRequired,
  movies: PropTypes.array.isRequired,
  onCardClick: PropTypes.func.isRequired,
  genresList: PropTypes.array.isRequired,
  onGenreClick: PropTypes.func.isRequired,
  onMoreBtnClick: PropTypes.func.isRequired,
  numberMoviesInList: PropTypes.number.isRequired,
  activeGenre: PropTypes.string.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
};

export default Main;
