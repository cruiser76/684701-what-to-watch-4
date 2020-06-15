import React from 'react';

import Main from './../main/main.jsx';


const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {movieTitle, genre, releaseDate} = props;

  return (
    <Main
      movieTitle={movieTitle}
      genre={genre}
      releaseDate={releaseDate}
    />
  );
};

export default App;
