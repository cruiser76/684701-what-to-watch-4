import React, {createRef, PureComponent} from 'react';
import PropTypes from 'prop-types';

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);
    this.videoRef = createRef();
    this.isMount = false;
  }

  componentDidUpdate() {
    if (this.isMount) {
      const video = this.videoRef.current;
      if (this.props.isPlaying) {
        video.play();
      } else {
        video.load();
      }
    }
  }

  componentDidMount() {
    this.isMount = true;
  }

  render() {
    const {src, poster} = this.props;
    return (
      <div className="small-movie-card__image">
        <video
          poster={poster}
          src={src}
          muted={true}
          ref={this.videoRef}
        />
      </div>
    );
  }
}

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default VideoPlayer;
