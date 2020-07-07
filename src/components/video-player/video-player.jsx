import React, {createRef} from 'react';
import PropTypes from 'prop-types';

const VideoPlayer = (props) => {
  const {src, poster, isPlaying} = props;
  const videoRef = createRef();

  return (
    <div className="small-movie-card__image">
      <video
        key={isPlaying}
        poster={poster}
        src={src}
        muted={true}
        ref={videoRef}
        onCanPlayThrough={() => {
          const video = videoRef.current;
          if (isPlaying) {
            video.play();
          }
        }}
      />
    </div>
  );
};

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default VideoPlayer;
