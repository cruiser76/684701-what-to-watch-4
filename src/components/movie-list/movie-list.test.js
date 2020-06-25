import React from 'react';
import renderer from 'react-test-renderer';

import MovieList from './movie-list.jsx';

const movies = [
  {
    src: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    link: `movie-page.html`,
    key: `fantastic-beasts-the-crimes-of-grindelwald`
  }, {
    src: `bohemian-rhapsody.jpg`,
    title: `Bohemian Rhapsody`,
    link: `movie-page.html`,
    key: `bohemian-rhapsody`
  }, {
    src: `macbeth.jpg`,
    title: `Macbeth`,
    link: `movie-page.html`,
    key: `macbeth`
  }, {
    src: `aviator.jpg`,
    title: `Aviator`,
    link: `movie-page.html`,
    key: `aviator`
  }, {
    src: `we-need-to-talk-about-kevin.jpg`,
    title: `We need to talk about Kevin`,
    link: `movie-page.html`,
    key: `we-need-to-talk-about-kevin`
  }, {
    src: `what-we-do-in-the-shadows.jpg`,
    title: `What We Do in the Shadows`,
    link: `movie-page.html`,
    key: `what-we-do-in-the-shadows`
  }, {
    src: `revenant.jpg`,
    title: `Revenant`,
    link: `movie-page.html`,
    key: `revenant`
  }, {
    src: `johnny-english.jpg`,
    title: `Johnny English`,
    link: `movie-page.html`,
    key: `johnny-english`
  }
];

const onMovieCardTitleClick = () => {};

it(`Movie-list is render correctly`, () => {
  const tree = renderer
    .create(
        <MovieList
          movies={movies}
          onMovieCardTitleClick={onMovieCardTitleClick}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
