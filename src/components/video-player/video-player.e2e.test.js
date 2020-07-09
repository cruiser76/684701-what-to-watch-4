import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import VideoPlayer from './video-player.jsx';

configure({adapter: new Adapter()});

it(`VideoPlayer children is video`, () => {
  const videoPlayer = mount(
      <VideoPlayer
        src={`123`}
        poster={`122`}
        isPlaying={true}
      >
      </VideoPlayer>
  );

  const video = videoPlayer.find(`video`);
  expect(video).toHaveLength(1);

  expect(videoPlayer.props().isPlaying).toBe(true);

});
