import React from 'react';
import renderer from 'react-test-renderer';

import GenresList from './genres-list.jsx';

it(`GenreList render correctly`, () => {
  const tree = renderer
    .create(
        <GenresList
          genresList={[`All genre`, `Drama`]}
          onGenreClick={() => {}}
          activeGenre={`All genre`}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
