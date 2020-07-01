import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import VideoPlayer from './video-player.jsx';

configure({adapter: new Adapter()});

it(`Hover on card toggle state`, () => {
  const screen = mount(
      <VideoPlayer
        src={``}
        poster={``}
        onMouseEnter={() => {}}
      />
  );
  expect(screen.state().isPlaying).toBe(false);
  screen.props().onMouseEnter();

  setTimeout(() => {
    expect(screen.state().isPlaying).toBe(true);
  }, 2000);
});

