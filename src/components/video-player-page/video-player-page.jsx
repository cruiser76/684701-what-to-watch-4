import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {getIsLoadingMovies} from '../../reducer/data/selectors.js';
import {getFilteredMovies} from '../../reducer/condition/selectors.js';

import MainVideoPlayer from '../main-video-player/main-video-player.jsx';
import withVideoPlayer from '../../hocs/with-video-player/with-video-player.jsx';
import Loader from '../loader/loader.jsx';

const VideoPlayerWrapped = withVideoPlayer(MainVideoPlayer);

const VideoPlayerPage = (props) => {
  const {isLoadingMovies} = props;
  return !isLoadingMovies
    ? (<VideoPlayerWrapped
      {...props}
      isActive={false}
      rePlay={false}
      muted={false}
    />
    )
    : <Loader />;
};

const mapStateToProps = (state) => {
  return {
    isLoadingMovies: getIsLoadingMovies(state),
    movies: getFilteredMovies(state),
  };
};

VideoPlayerPage.propTypes = {
  isLoadingMovies: PropTypes.bool.isRequired
};

export {VideoPlayerPage};
export default connect(mapStateToProps)(VideoPlayerPage);
