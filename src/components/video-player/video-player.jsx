import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';

export default class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);
    this._videoRef = createRef();
    this.timeoutID = null;
    this._mouseEnterHandle = this._mouseEnterHandle.bind(this);
    this._mouseLeaveHandle = this._mouseLeaveHandle.bind(this);

    this.state = {
      isLoading: true,
      isPlaying: false,
    };
  }

  _mouseEnterHandle() {
    this.props.onMouseEnter();
    this.timeoutID = setTimeout(() => {
      this.setState({isPlaying: true});
    }, 1000);
  }

  _mouseLeaveHandle() {
    clearTimeout(this.timeoutID);
    this.setState({isPlaying: false});
  }

  componentDidMount() {
    const {src, poster} = this.props;

    const video = this._videoRef.current;

    video.oncanplaythrough = () => this.setState({isLoading: false});
    video.onplay = () => this.setState({isPlaying: true});
    video.onpause = () => this.setState({isPlaying: false});

    video.src = src;
    video.poster = poster;
    video.muted = `muted`;
  }

  componentDidUpdate(prevProps, prevState) {
    const video = this._videoRef.current;

    if (prevState.isPlaying !== this.state.isPlaying) {
      if (this.state.isPlaying) {
        video.play();
      } else {
        video.load();
      }
    }
  }

  componentWillUnmount() {
    const video = this._videoRef.current;
    video.oncanplaythrough = null;
    video.onplay = null;
    video.onpause = null;
    video.poster = null;
    video.src = ``;
    clearTimeout(this.changeState);
  }

  render() {
    return (
      <div className="small-movie-card__image"
        onMouseEnter={this._mouseEnterHandle}
        onMouseLeave={this._mouseLeaveHandle}
      >
        <video
          style={{position: `absolute`, top: `0`, left: `0`, width: `100%`, height: `100%`}}
          ref={this._videoRef}
        />
      </div>
    );
  }
}

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  onMouseEnter: PropTypes.func.isRequired
};
