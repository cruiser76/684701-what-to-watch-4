import React, {createRef, Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';

class Review extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      numberStar: 3,
      text: ``
    };

    this.formRef = createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(evt) {
    evt.preventDefault();
    const textArea = this.formRef.current.querySelector(`#review-text`);
    const formData = new FormData(this.formRef.current);
    const textareaLength = textArea.value.length;
    const rating = formData.get(`rating`);
    console.log(
      `Данные формы`,
      rating,
      textareaLength
    );
    if (textareaLength === 0) {

      // textArea.setCustomValidity("Отзыв не может быть пустым");
    } else {
      // textArea.setCustomValidity('');
    }
  }

  render() {
    return (
      <section className="movie-card movie-card--full" >
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
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
            ref={this.formRef}
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
                      onChange={(evt) => {
                        const value = evt.target.checked;
                        this.setState({
                          numberStar: value
                        });
                        console.log(this.state.numberStar);

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
              <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" minLength='50' maxLength='400'></textarea>
              <div className="add-review__submit">
                <button className="add-review__btn" type="submit">Post</button>
              </div>

            </div>
          </form>
        </div>

      </section>
    );
  }

};

Review.propTypes = {

};

export default Review;
