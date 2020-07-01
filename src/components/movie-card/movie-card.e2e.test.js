import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MovieCard from './movie-card.jsx';

configure({
  adapter: new Adapter(),
});

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
    level: `Good`
  },
  link: `movie-page.html`,
  key: `fantastic-beasts-the-crimes-of-grindelwald`,
};

it(`when hover over a movie card, the handler gets information about the movie`, () => {
  const mouseEnterHandle = jest.fn();
  const movieCardClickHandle = jest.fn();

  const movieCardScreen = shallow(
      <MovieCard
        movie={film}
        mouseEnterHandle={mouseEnterHandle}
        movieCardClickHandle={movieCardClickHandle}
      />
  );

  const currentCard = movieCardScreen.find(`article.catalog__movies-card`);
  movieCardScreen.simulate(`mouseEnter`, {});

  expect(mouseEnterHandle).toHaveBeenCalledTimes(1);
  expect(mouseEnterHandle).toBeCalledWith(expect.objectContaining(currentCard));
});

it(`clicking on the movie card calls callback once`, () => {
  const mouseEnterHandle = jest.fn();
  const movieCardClickHandle = jest.fn();

  const movieCardScreen = shallow(
      <MovieCard
        movie={film}
        mouseEnterHandle={mouseEnterHandle}
        movieCardClickHandle={movieCardClickHandle}
      />
  );

  movieCardScreen.simulate(`click`, mockEvent);

  expect(movieCardClickHandle).toHaveBeenCalledTimes(1);
});
