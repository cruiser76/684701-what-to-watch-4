import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Main from './main.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const movieTitle = `Fantastic Beasts: The Crimes of Grindelwald`;
const genre = `Drama`;
const releaseDate = 2014;
const promo = {
  movieTitle,
  genre,
  releaseDate
};

const movies = [
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
      level: `Good`,
      filmLink: ``
    },
    link: `movie-page.html`,
    key: `fantastic-beasts-the-crimes-of-grindelwald`,
  }
];

const props = {
  movies,
  promo,
  currentMovie: null,
  genresList: [`All genre`],
  activeGenre: `All genre`,
  isMoreBtnShow: true,
  onMoreBtnClick: () => {},
  onGenreClick: () => {},
};

it(`Should movie-card-title click`, () => {
  const onCardClick = jest.fn();

  const main = shallow(
      <Main
        {...props}
        onCardClick={onCardClick}
      />
  );

  const promoCard = main.find(`.movie-card__info`);

  expect(promoCard.length).toBe(1);
});
