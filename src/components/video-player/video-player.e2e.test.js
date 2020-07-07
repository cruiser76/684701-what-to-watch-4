import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import VideoPlayer from './video-player.jsx';

configure({adapter: new Adapter()});

it(`Hover on card toggle state`, () => {
  const videoPlayer = mount(
      <VideoPlayer
        src={`123`}
        poster={`122`}
        isPlaying={true}
      />
  );
  expect(videoPlayer.props()).toStrictEqual({
    src: `123`,
    poster: `122`,
    isPlaying: true
  });
});
