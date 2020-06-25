import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MovieCard from './movie-card.jsx';

configure({
  adapter: new Adapter(),
});

const film = {
  src: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  link: `movie-page.html`,
  key: `fantastic-beasts-the-crimes-of-grindelwald`
};

it(`when hover over a movie card, the handler gets information about the movie`, () => {
  const mouseEnterHandle = jest.fn();
  const onMovieCardTitleClick = jest.fn();

  const movieCardScreen = shallow(
      <MovieCard
        movie={film}
        mouseEnterHandle={mouseEnterHandle}
        onMovieCardTitleClick={onMovieCardTitleClick}
      />
  );

  const currentCard = movieCardScreen.find(`article.catalog__movies-card`);
  movieCardScreen.simulate(`mouseEnter`, {});

  expect(mouseEnterHandle).toHaveBeenCalledTimes(1);
  expect(mouseEnterHandle).toBeCalledWith(expect.objectContaining(currentCard));
});
