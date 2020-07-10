import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class GenresList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeGenre: this.props.genresList[0],
    };
  }

  render() {
    const {genresList, onGenreClick} = this.props;
    return (
      <ul className="catalog__genres-list">

        {genresList.map((genre) => {
          return (
            <li className={`catalog__genres-item${(this.state.activeGenre === genre) ? ` catalog__genres-item--active` : ``}`}
              key={genre}
              onClick={(evt) => {
                evt.preventDefault();
                if (this.state.activeGenre !== genre) {
                  onGenreClick(genre);
                  this.setState({activeGenre: genre});
                }
              }}
            >
              <a href="#" className="catalog__genres-link">{genre}</a>
            </li>
          );
        })}

      </ul>
    );
  }
}

export default GenresList;

GenresList.propTypes = {
  onGenreClick: PropTypes.func.isRequired,
  genresList: PropTypes.array.isRequired,
};
