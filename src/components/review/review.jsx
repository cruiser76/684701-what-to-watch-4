import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import history from '../../history.js';
import {Url} from '../../const.js';

class Review extends PureComponent {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
    this.handleRadioBtnClick = this.handleRadioBtnClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isSavingReview && !this.props.isErrorPost) {
      history.push(`/films/${this.props.movie.key}`);
    }
  }

  handleSubmit(evt) {
    const {rating, comment, movie, onSubmit} = this.props;
    evt.preventDefault();
    onSubmit({rating, comment}, movie.key);
  }

  handleTextAreaChange(evt) {
    this.props.setComment(evt.target.value);
  }

  handleRadioBtnClick(evt) {
    this.props.onRadioBtnClick(+evt.target.value);
  }

  render() {
    const {movie, userInfo, isErrorPost} = this.props;
    const {brief, img, key, backgroundColor} = movie;
    const disabled = (!this.props.rating || this.props.isSavingReview || (this.props.comment.length < 2) || (this.props.comment.length > 400));
    return (
      <section className="movie-card movie-card--full" style={{backgroundColor}}>
        {isErrorPost ? <div style={{textAlign: `center`}}>При отправке комментариев возникли проблемы, попробуйте отправить их позже</div> : ``}
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={img.bgSrc} alt={brief.title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <div className="logo">
              <Link to={`/`} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link
                    to={`/films/${key}`}
                    href="movie-page.html"
                    className="breadcrumbs__link"
                  >{brief.title}
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>

            <div className="user-block">
              <div className="user-block__avatar">
                <img src={`${Url.HOST}${userInfo.avatar_url}`} alt="User avatar" width="63" height="63" />
              </div>
            </div>
          </header>

          <div className="movie-card__poster movie-card__poster--small">
            <img src={img.posterSrc} alt={brief.title} width="218" height="327" />
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
                      checked={(i + 1) === this.props.rating}
                      onChange={this.handleRadioBtnClick}
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
                value={this.props.comment}
                onChange={this.handleTextAreaChange}
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
  rating: PropTypes.number.isRequired,
  comment: PropTypes.string.isRequired,
  movie: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setComment: PropTypes.func.isRequired,
  isSavingReview: PropTypes.bool.isRequired,
  onRadioBtnClick: PropTypes.func.isRequired,
  userInfo: PropTypes.object,
  isErrorPost: PropTypes.bool.isRequired
};

export default Review;
