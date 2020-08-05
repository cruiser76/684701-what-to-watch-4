import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {getTimeFromSec} from '../../utils';
import history from '../../history.js';

class MainVideoPlayer extends PureComponent {
  render() {
    const {movie, children, switchPlayerPlayEvent, duration, progress, onFullScreenButtonClick, isPlaying} = this.props;
    const {brief} = movie;
    const progressValue = (progress * 100 / (duration === 0 ? 1 : duration));
    const timer = getTimeFromSec(duration - progress);

    return (
      <div className="player">
        <button
          type="button"
          className="player__exit"
          onClick={history.goBack}
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
              onClick={() => switchPlayerPlayEvent(!isPlaying)}
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
  switchPlayerPlayEvent: PropTypes.func.isRequired,
  duration: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onFullScreenButtonClick: PropTypes.func.isRequired,
};

export default MainVideoPlayer;
