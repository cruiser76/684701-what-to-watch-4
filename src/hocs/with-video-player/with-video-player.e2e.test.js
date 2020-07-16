import React from 'react';
import PropTypes from 'prop-types';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withVideoPlayer from './with-video-player.jsx';

configure({adapter: new Adapter()});

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

const Player = (props) => {
  const {switchPlayerPlayEvent, children} = props;
  return (
    <div>
      <button onClick={switchPlayerPlayEvent} />
      {children}
    </div>
  );
};

const mockEvent = {
  preventDefault() {}
};

Player.propTypes = {
  switchPlayerPlayEvent: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};


it(`Checks that HOC's callback switch (play)`, () => {
  const PlayerWrapped = withVideoPlayer(Player);
  const wrapper = mount(<PlayerWrapped
    movie={movie}
  />);

  const playEvent = jest.spyOn(window.HTMLMediaElement.prototype, `play`).mockImplementation(() => {});
  wrapper.instance().componentDidMount();
  wrapper.find(`button`).simulate(`click`, mockEvent);
  expect(playEvent).toHaveBeenCalledTimes(1);
});
