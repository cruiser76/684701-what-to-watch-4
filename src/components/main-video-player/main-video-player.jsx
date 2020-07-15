import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';

class MainVideoPlayer extends PureComponent {

  _formatTimeString(str) {
    return str.length > 1 ? str : `0${str}`;
  }

  _getTimeFromSec(timeInSec) {
    let hours = Math.trunc(timeInSec / 3600).toString();
    let minutes = Math.trunc((timeInSec % 3600) / 60).toString();
    let sec = (timeInSec % (3600 * 60)).toString();

    return `${this._formatTimeString(hours)}:${this._formatTimeString(minutes)}:${this._formatTimeString(sec)}`;
  }

  render() {
    const {movie, children, onPlayButtonClick, duration, progress, isPlaying, onFullScreenButtonClick, onExitButtonClick} = this.props;
    const {brief} = movie;
    const progressValue = (progress * 100 / (duration === 0 ? 1 : duration));
    const timer = this._getTimeFromSec(duration - progress);

    return (
      <div className="player">

        <button
          type="button"
          className="player__exit"
          onClick={onExitButtonClick}
        >Exit</button>
        {children}
        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={progressValue} max="100"></progress>
              <div className="player__toggler" style={{left: `${progressValue}%`}}>Toggler</div>
            </div>
            <div className="player__time-value">{timer}</div>
          </div>

          <div className="player__controls-row">
            <button
              type="button"
              className="player__play"
              onClick={onPlayButtonClick}
            >
              {isPlaying ?
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
            <div className="player__name">{brief.title}</div>

            <button type="button" className="player__full-screen"
              onClick={onFullScreenButtonClick}
            >
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

MainVideoPlayer.propTypes = {
  movie: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  duration: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onFullScreenButtonClick: PropTypes.func.isRequired,
  onExitButtonClick: PropTypes.func.isRequired,
};

export default MainVideoPlayer;
