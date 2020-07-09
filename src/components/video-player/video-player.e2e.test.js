import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import VideoPlayer from './video-player.jsx';

configure({adapter: new Adapter()});

it(`VideoPlayer children is video`, () => {
  const videoPlayer = shallow(
      <VideoPlayer
        src={`123`}
        poster={`122`}
        isPlaying={true}
      >
      </VideoPlayer>
  );

  expect(videoPlayer.props().children.type).toBe(`video`);
});
