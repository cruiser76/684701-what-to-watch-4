import React from 'react';
import PropTypes from 'prop-types';

const GenresList = (props) => {

  const {genresList, activeGenre, onGenreClick} = props;

  return (
    <ul className="catalog__genres-list">

      {genresList.map((genre) => {
        return (
          <li className={`catalog__genres-item${(activeGenre === genre) ? ` catalog__genres-item--active` : ``}`}
            key={genre}
            onClick={(evt) => {
              evt.preventDefault();
              onGenreClick(genre);
            }}
          >
            <a href="#" className="catalog__genres-link">{genre}</a>
          </li>
        );
      })}

    </ul>
  );
};

export default GenresList;

GenresList.propTypes = {
  onGenreClick: PropTypes.func.isRequired,
  genresList: PropTypes.array.isRequired,
  activeGenre: PropTypes.string.isRequired
};
