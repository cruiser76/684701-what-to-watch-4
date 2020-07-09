import React from 'react';
import renderer from 'react-test-renderer';

import GenresList from './genres-list.jsx';

it(`GenreList render correctly`, () => {
  const tree = renderer
    .create(
        <GenresList
          genresList={[`All genres`, `Drama`]}
          onGenreClick={() => {}}
          activeGenre={`All genres`}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
