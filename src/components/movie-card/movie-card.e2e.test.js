import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MovieCard from './movie-card.jsx';

const mockEvent = {
  preventDefault() {}
};

const film = {
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
    level: `Good`,
    filmLink: ``
  },
  link: `movie-page.html`,
  key: `fantastic-beasts-the-crimes-of-grindelwald`,
};

configure({
  adapter: new Adapter(),
});

it(`interaction with movie card calls callbacks once`, () => {
  const setActiveElement = jest.fn();
  const onCardClick = jest.fn();

  const movieCardScreen = shallow(
      <MovieCard
        movie={film}
        onCardClick={onCardClick}
        setActiveElement={setActiveElement}
        isPlaying={false}
        switchPlayerPlayEvent={()=>{}}
      >
         children={<div />}
      </MovieCard>
  );

  movieCardScreen.simulate(`click`, mockEvent);
  expect(onCardClick).toHaveBeenCalledTimes(1);

  movieCardScreen.simulate(`mouseEnter`);
  setTimeout(() => {
    expect(setActiveElement).toHaveBeenCalledTimes(1);
  }, 1000);

  movieCardScreen.simulate(`mouseLeave`);
  expect(setActiveElement).toHaveBeenCalledTimes(1);
});
