import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';

class Review extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      rating: 0,
      comment: ``,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.onSubmit(this.state, this.props.movie.key);
  }

  render() {
    // || (this.state.comment.length < 50) || (this.state.comment.length > 400)
    const {movie} = this.props;
    const {brief, key, img} = movie;
    const disabled = (!this.state.rating || this.props.isSavingReview);
    return (
      <section className="movie-card movie-card--full" >
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={img.src} alt="The Grand Budapest Hotel" />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <div className="logo">
              <a href="main.html" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a href="movie-page.html" className="breadcrumbs__link">The Grand Budapest Hotel</a>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>

            <div className="user-block">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </div>
          </header>

          <div className="movie-card__poster movie-card__poster--small">
            <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
          </div>
        </div>

        <div className="add-review">
          <form action="#"
            className="add-review__form"
            onSubmit={this.handleSubmit}
          >
            <div className="rating">
              <div className="rating__stars">
                {Array(5).fill(``).map((el, i) => {
                  return (<Fragment
                    key={`star-${i + 1}`}
                  >
                    <input
                      className="rating__input"
                      id={`star-${i + 1}`}
                      type="radio"
                      name="rating"
                      value={`${i + 1}`}
                      checked={(i + 1) === this.state.rating}
                      onChange={(evt) => {
                        const value = +evt.target.value;
                        this.setState({
                          rating: value
                        });
                      }}
                    />
                    <label className="rating__label" htmlFor={`star-${i + 1}`}>{`Rating ${i + 1}`}</label>
                  </Fragment>
                  );
                })
                }
              </div>
            </div>

            <div className="add-review__text">
              <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" minLength='50' maxLength='400'
                value={this.state.comment}
                onChange={(evt) => {
                  this.setState({comment: evt.target.value});
                }}
              ></textarea>
              <div className="add-review__submit">
                <button style={disabled ? {opacity: 0.5, cursor: `auto`} : {}} className="add-review__btn" type="submit" disabled={disabled}>Post</button>
              </div>

            </div>
          </form>
        </div>
      </section>
    );
  }

}

Review.propTypes = {

};

export default Review;
