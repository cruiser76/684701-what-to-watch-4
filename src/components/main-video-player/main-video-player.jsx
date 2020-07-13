import React, {PureComponent, createRef, Fragment} from 'react';
import PropTypes from 'prop-types';

class MainVideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this.videoRef = createRef();

    this.state = {
      isPlaying: false,
      progress: 0
    };

    this.duration = 0;
  }

  componentDidMount() {
    const {brief, img} = this.props.movie;


    const video = this.videoRef.current;
    video.src = brief.filmLink;
    video.poster = `img/${img.posterSrc}`;

    video.oncanplaythrough = () => this.setState({isLoading: true});

    video.onplay = () => this.setState({isPlaying: true});

    video.onpause = () => this.setState({isPlaying: false});

    video.ontimeupdate = () => this.setState({progress: Math.floor(video.currentTime)});
    this.duration = video.duration;
  }

  componentDidUpdate() {
    const video = this.videoRef.current;

    if (this.state.isPlaying) {
      video.play();
    } else {
      video.pause();
    }
  }

  componentWillUnmount() {
    const video = this.videoRef.current;

    video.oncanplaythrough = null;
    video.onplay = null;
    video.onpause = null;
    video.ontimeupdate = null;
    video.src = ``;
  }

  render() {
    const {movie} = this.props;
    const {img, brief} = movie;

    const video = this.videoRef.current;

    return (

      <div className="player">
        <video
          className="player__video"
          ref={this.videoRef}
        />
        <button
          type="button"
          className="player__exit"
          onClick={() => {}}
        >Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value="30" max="100"></progress>
              <div className="player__toggler" style={{left: `30%`}}>Toggler</div>
            </div>
            <div className="player__time-value">{ - this.state.progress}</div>
          </div>

          <div className="player__controls-row">
            <button
              type="button"
              className="player__play"
              onClick={(evt) => {
                evt.preventDefault();
                this.setState({isPlaying: !this.state.isPlaying})
              }}
            >
              {this.state.isPlaying ?
                <Fragment>
                  <svg viewBox="0 0 14 21" width="14" height="21">
                    <use xlinkHref="#pause"></use>
                  </svg>
                  <span>Pause</span>
                </Fragment> :
                <Fragment>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </Fragment>}

            </button>
            <div className="player__name">Transpotting</div>

            <button type="button" className="player__full-screen">
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div >
      </div >
    );
  }
}

export default MainVideoPlayer;
