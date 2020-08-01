import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withReviewData = (Component) => {
  class WithReviewData extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: 0,
        comment: ``,
      };

      this.handleRadioBtnClick = this.handleRadioBtnClick.bind(this);
      this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.movie = this._findMovie();
    }

    _findMovie() {
      let currentMovie = null;
      const id = +this.props.match.params.id;
      currentMovie = this.props.movies.find((currrentMovie) => currrentMovie.key === id);
      return currentMovie;
    }

    handleRadioBtnClick(value) {
      this.setState({
        rating: value
      });
    }

    handleTextAreaChange(value) {
      this.setState({
        comment: value
      });
    }

    handleSubmit(reviewData, key) {
      this.setState({
        rating: 0,
        comment: ``,
      });
      this.props.onSubmit(reviewData, key);
    }

    render() {
      return (
        <Component
          {...this.props}
          movie={this.movie}
          onRadioBtnClick={this.handleRadioBtnClick}
          setComment={this.handleTextAreaChange}
          onSubmit={this.handleSubmit}
          comment={this.state.comment}
          rating={this.state.rating}
        />
      );
    }
  }

  WithReviewData.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    movies: PropTypes.array.isRequired
  };

  return WithReviewData;
};

export default withReviewData;


