import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import MovieList from './../movie-list/movie-list.jsx';
import GenresList from './../genres-list/genres-list.jsx';
import ShowMore from './../show-more/show-more.jsx';
import withActiveElement from './../../hocs/with-active-element/with-active-element.jsx';
import {Loader} from './../loader/loader.jsx';


const MovieListWrapped = withActiveElement(MovieList);

const Main = (props) => {
  const {promo, movies, numberMoviesInList, onCardClick, genresList, onGenreClick, onMoreBtnClick, activeGenre, onPlayButtonClick, isLoadingPromo, isLoadingMovies, authorizationStatus, onMyListClick} = props;
  return (
    <Fragment>
      <section className="movie-card">
        {isLoadingPromo ? <Loader /> :
          <Fragment>
            <div className="movie-card__bg">
              <img src={promo.img.src} alt={promo.brief.title} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <Header
              authorizationStatus={authorizationStatus}
              href={`#`}
            />

            <div className="movie-card__wrap">
              <div className="movie-card__info">
                <div className="movie-card__poster">
                  <img src={promo.img.posterSrc || ``} alt={`${promo.brief.title || ``} poster`} width="218" height="327" />
                </div>

                <div className="movie-card__desc">
                  <h2 className="movie-card__title">{promo.brief.title || ``}</h2>
                  <p className="movie-card__meta">
                    <span className="movie-card__genre">{promo.brief.genre || ``}</span>
                    <span className="movie-card__year">{promo.brief.year || ``}</span>
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
                    <button
                      className="btn btn--list movie-card__button"
                      type="button"
                      onClick={onMyListClick}
                    >
                      <svg viewBox="0 0 19 20" width="19" height="20">
                        <use xlinkHref="#add"></use>
                      </svg>
                      <span>My list</span>
                    </button>
                  </div>
                </div>
              </div>
            </div >
          </Fragment>
        }
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
            isLoadingMovies={isLoadingMovies}
            movies={movies}
            onCardClick={onCardClick}
            numberMoviesInList={numberMoviesInList}
          />

          <ShowMore
            onMoreBtnClick={onMoreBtnClick}
            isMoreBtnShow={numberMoviesInList < movies.length}
          />
        </section>

        <Footer
          href={`#`}
        />

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
  isLoadingPromo: PropTypes.bool.isRequired,
  isLoadingMovies: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onMyListClick: PropTypes.func.isRequired,
};

export default Main;
