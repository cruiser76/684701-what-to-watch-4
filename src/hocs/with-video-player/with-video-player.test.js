import React from 'react';
import renderer from 'react-test-renderer';
import PropTypes from 'prop-types';

import withVideoPlayer from './with-video-player.jsx';

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
  key: `fantastic-beasts-the-crimes-of-grindelwald`,
};

const MockComponent = (props) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

MockComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

const MockComponentWrapped = withVideoPlayer(MockComponent);

it(`withMainVideoPlayer component render correctly`, () => {
  const tree = renderer
    .create(
        (<MockComponentWrapped
          movie={movie}
        />
        ), {
          createNodeMock() {
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
