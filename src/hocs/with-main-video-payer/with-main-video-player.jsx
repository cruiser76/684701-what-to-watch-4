import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';

const withMainVideoPlayer = (Component) => {
  class WithMainVideoPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false,
        progress: 0,
        duration: 0
      };

      this.videoRef = createRef();
      this.handlePlayButtonClick = this.handlePlayButtonClick.bind(this);
      this.handleFullScreenButtonClick = this.handleFullScreenButtonClick.bind(this);
    }

    handlePlayButtonClick(evt) {
      evt.preventDefault();
      this.setState({isPlaying: !this.state.isPlaying});
    }

    handleFullScreenButtonClick(evt) {
      evt.preventDefault();
      const video = this.videoRef.current;
      video.requestFullscreen();
    }

    componentDidMount() {
      const {brief, img} = this.props.movie;
      const video = this.videoRef.current;

      video.src = brief.filmLink;
      video.poster = `img/${img.posterSrc}`;

      video.onplay = () => this.setState({isPlaying: true});
      video.onpause = () => this.setState({isPlaying: false});
      video.onended = () => this.setState({isPlaying: false});

      video.onloadedmetadata = () => this.setState({duration: Math.floor(video.duration)});

      video.ontimeupdate = () => {
        this.setState({progress: Math.floor(video.currentTime)});
      };
    }

    componentDidUpdate(prevProps, prevState) {
      const video = this.videoRef.current;
      if (prevState.isPlaying !== this.state.isPlaying) {
        if (this.state.isPlaying) {
          video.play();
        } else {
          video.pause();
        }
      }
    }

    componentWillUnmount() {
      const video = this.videoRef.current;

      video.oncanplaythrough = null;
      video.onplay = null;
      video.onpause = null;
      video.ontimeupdate = null;
      video.onended = null;
      video.src = ``;
    }

    render() {
      return (
        <Component
          {...this.props}
          progress={this.state.progress}
          isPlaying={this.state.isPlaying}
          onPlayButtonClick={this.handlePlayButtonClick}
          duration={this.state.duration}
          onFullScreenButtonClick={this.handleFullScreenButtonClick}
        >
          <video
            className="player__video"
            ref={this.videoRef}
          />
        </Component>
      );
    }
  }

  WithMainVideoPlayer.propTypes = {
    movie: PropTypes.object.isRequired
  };

  return WithMainVideoPlayer;
};

export default withMainVideoPlayer;
