import React, {createRef, PureComponent} from 'react';
import PropTypes from 'prop-types';

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);
    this.videoRef = createRef();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isPlaying !== this.props.isPlaying) {
      const video = this.videoRef.current;
      if (this.props.isPlaying) {
        video.play();
      } else {
        video.load();
      }
    }
  }

  componentDidMount() {
    const video = this.videoRef.current;
    video.muted = true;
  }

  render() {
    const {src, poster} = this.props;
    return (

      <video
        poster={poster}
        src={src}
        ref={this.videoRef}
      />
    );
  }
}

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default VideoPlayer;
