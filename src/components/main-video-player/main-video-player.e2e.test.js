import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import history from '../../history.js';

import MainVideoPlayer from './main-video-player.jsx';

const movie = {
  img: {
    src: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    posterSrc: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    bgSrc: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`
  },
  brief: {
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    genre: `Drama`,
    year: `2000`,
    score: `9`,
    level: `Good`
  },
  link: `movie-page.html`,
  key: `1`,
};

const props = {
  movie,
  duration: 10,
  progress: 0,
  isPlaying: false,
  children: <div />,
  onMyListClick: () => {},
};

configure({adapter: new Adapter()});


it(`clicking on buttons in main player calls calbacks`, () => {
  const switchPlayerPlayEvent = jest.fn();
  const onFullScreenButtonClick = jest.fn();

  const screen = shallow(
      <MainVideoPlayer
        {...props}
        onClick={history.goBack}
        switchPlayerPlayEvent={switchPlayerPlayEvent}
        onFullScreenButtonClick={onFullScreenButtonClick}
      />
  );

  const fullScreenBtn = screen.find(`.player__full-screen`);
  fullScreenBtn.simulate(`click`);
  expect(onFullScreenButtonClick).toHaveBeenCalledTimes(1);

  const playBtn = screen.find(`.player__play`);
  playBtn.simulate(`click`);
  expect(switchPlayerPlayEvent).toHaveBeenCalledTimes(1);
});
