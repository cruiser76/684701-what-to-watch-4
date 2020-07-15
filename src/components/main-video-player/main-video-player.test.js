import React from 'react';
import renderer from 'react-test-renderer';

import MainVideoPlayer from './main-video-player.jsx';

const movie =
{
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
  key: `fantastic-beasts-the-crimes-of-grindelwald`,
};

const props = {
  movie,
  onPlayButtonClick: () => {},
  duration: 10,
  progress: 0,
  isPlaying: false,
  onFullScreenButtonClick: () => {},
  onExitButtonClick: () => {},
  children: <div />
};

it(`MainVideoPlayer sould render`, () => {
  const tree = renderer
    .create((
      <MainVideoPlayer
        {...props}
      />), {
      createNodeMock: () => {
        return {};
      }
    }).toJSON();

  expect(tree).toMatchSnapshot();
});
