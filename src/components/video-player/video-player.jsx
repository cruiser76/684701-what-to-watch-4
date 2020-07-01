import React, {PureComponent, createRef} from 'react';

export default class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);
    this._videoRef = createRef();
  }

  componentDidMount() {
    const {src} = this.props;

    const video = this._videoRef.current;
    video.src = src;
    video.style = `positon: absolute; top: 0; left: 0; width: 100%; height: 100%`;
    video.poster = this.props.poster;
    video.muted = `muted`;
  }

  componentWillUnmount() {
    const video = this._videoRef.current;
    video.currentTime = null;
    video.play = null;
    video.poster = null;

  }

  render() {
    return (
      <video
        controls
        ref={this._videoRef}
      />
    );
  }

  componentDidUpdate() {
    const video = this._videoRef.current;

    if (this.props.play) {
      video.play();
    } else {
      video.load();
    }
  }
}
