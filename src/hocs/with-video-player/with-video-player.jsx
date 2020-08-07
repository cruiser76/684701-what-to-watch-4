import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';

const withVideoPlayer = (Component) => {
  class WithVideoPlayer extends PureComponent {
    constructor(props) {

      super(props);

      this.state = {
        isPlaying: this.props.isActive,
        progress: 0,
        duration: 0,
      };

      this.videoRef = createRef();
      this.handlePlayerPlayEvent = this.handlePlayerPlayEvent.bind(this);
      this.handleFullScreenButtonClick = this.handleFullScreenButtonClick.bind(this);
      this.setSrc = this.setSrc.bind(this);

      this.movie = this._findMovie();
    }

    componentDidMount() {
      const {brief, img} = this.movie;
      const video = this.videoRef.current;

      if (!this.props.muted) {
        video.src = brief.filmLink;
      }

      video.poster = img.src;
      video.muted = this.props.muted;

      video.onplay = () => this.setState({isPlaying: true});
      video.onpause = () => this.setState({isPlaying: false});
      video.onended = () => this.setState({isPlaying: false});

      video.onloadedmetadata = () => {
        this.setState({duration: Math.floor(video.duration)});
        if (this.state.isPlaying) {
          video.play();
        }
      };

      video.ontimeupdate = () => {
        this.setState({progress: Math.floor(video.currentTime)});
      };
    }

    componentDidUpdate(prevProps, prevState) {
      const video = this.videoRef.current;
      if (prevState.isPlaying !== this.state.isPlaying) {
        if (this.props.muted) {
          this.setSrc(video);
        }

        if (this.state.isPlaying && !this.props.muted) {
          video.play();
        } else if (!this.state.isPlaying && this.props.rePlay) {
          video.load();
        } else {
          video.pause();
        }
      }
    }

    componentWillUnmount() {
      const video = this.videoRef.current;
      video.src = ``;

      video.oncanplaythrough = null;
      video.onplay = null;
      video.onpause = null;
      video.ontimeupdate = null;
      video.onended = null;
      video.onloadedmetadata = null;
      this.setState = () => {};
    }

    handlePlayerPlayEvent(isPlaying) {
      this.setState({isPlaying});
    }

    handleFullScreenButtonClick() {
      const video = this.videoRef.current;
      video.requestFullscreen();
    }

    setSrc(video) {
      const {brief} = this.props.movie;
      if (this.state.isPlaying) {
        video.src = brief.previewLink;
      }
    }

    render() {
      return (
        <Component
          {...this.props}
          movie={this.movie}
          progress={this.state.progress}
          isPlaying={this.state.isPlaying}
          switchPlayerPlayEvent={this.handlePlayerPlayEvent}
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

    _findMovie() {
      let currentMovie = null;
      if (this.props.match) {
        const id = this.props.match.params.id;
        currentMovie = this.props.movies.find((currrentMovie) => currrentMovie.key === id);
      } else {
        currentMovie = this.props.movie;
      }
      return currentMovie;
    }
  }

  WithVideoPlayer.propTypes = {
    movie: PropTypes.object,
    movies: PropTypes.array,
    rePlay: PropTypes.bool.isRequired,
    muted: PropTypes.bool.isRequired,
    isActive: PropTypes.bool.isRequired,
    match: PropTypes.object,
  };

  return WithVideoPlayer;
};

export default withVideoPlayer;
