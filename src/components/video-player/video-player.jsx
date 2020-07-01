import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';

export default class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);
    this._videoRef = createRef();
    this.changeState = null;

    this.state = {
      isLoading: true,
      isPlaying: false
    };
  }

  componentDidMount() {
    this._isMounted = true;

    const {src, poster} = this.props;

    const video = this._videoRef.current;

    video.oncanplaythrough = () => this.setState({isLoading: false});
    video.onplay = () => this.setState({isPlaying: true});
    video.onpause = () => this.setState({isPlaying: false});
    video.ontimeupdate = () => this.setState({progress: video.currentTime});

    video.src = src;
    video.style = `positon: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 100`;
    video.poster = poster;
    video.muted = `muted`;
  }

  componentWillUnmount() {
    const video = this._videoRef.current;
    video.oncanplaythrough = null;
    video.currentTime = null;
    video.onplay = null;
    video.onpause = null;
    video.poster = null;
    video.src = ``;
    clearTimeout(this.changeState);

    // Без этого ошибка в App:
    // Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application.
    // To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
    this.setState = () => {
      return;
    };
  }

  render() {
    const {onMouseEnter} = this.props;
    return (
      <div className="small-movie-card__image"
        onMouseEnter={() => {
          onMouseEnter();
          this.changeState = setTimeout(() => {
            this.setState({isPlaying: true});
          }, 1000);
        }}
        onMouseLeave={() => {
          clearTimeout(this.changeState);
          this.setState({isPlaying: false});
        }}
      >
        <video
          ref={this._videoRef}
        />
      </div>
    );
  }

  componentDidUpdate() {
    const video = this._videoRef.current;

    if (this.state.isPlaying) {
      video.play();
    } else {
      video.load();
    }
  }
}

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  onMouseEnter: PropTypes.func.isRequired
};
