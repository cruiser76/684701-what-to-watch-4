import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import VideoPlayer from './../video-player/video-player.jsx';

export default class MovieCard extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false
    };
    this.stateChange = null;
  }

  componentWillUnmount() {
    clearTimeout(this.stateChange);
  }

  render() {
    const {movie, mouseEnterHandle, movieCardClickHandle} = this.props;
    const {img, brief, link} = movie;
    const {isPlaying} = this.state;

    return (
      <article className="small-movie-card catalog__movies-card"
        onMouseEnter={
          (evt) => {
            this.stateChange = setTimeout(() => {
              this.setState({isPlaying: true});
            }, 1000);
            mouseEnterHandle(evt.currentTarget);
          }}
        onMouseLeave={() => {
          clearTimeout(this.stateChange);
          this.setState({isPlaying: false});
        }}
        onClick={(evt) => {
          evt.preventDefault();
          movieCardClickHandle();
        }}
      >
        <div className="small-movie-card__image">
          {/* <img src={`img/${img.src}`} alt={brief.title} width="280" height="175" /> */}
          <VideoPlayer
            src={`img/VID_20200629_192223.mp4`}
            poster={`img/${img.src}`}
            play={isPlaying}
          />
        </div>
        <h3 className="small-movie-card__title">
          <a className="small-movie-card__link"
            href={link}
          >{brief.title}</a>
        </h3>
      </article>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  mouseEnterHandle: PropTypes.func.isRequired,
  movieCardClickHandle: PropTypes.func.isRequired,
};
