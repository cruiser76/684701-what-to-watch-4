import React from 'react';

import Main from './../main/main.jsx';

const movieCardTitleClickHandle = () => {};

const App = (props) => {

  return (
    <Main
      {...props}
      onMovieCardTitleClick={movieCardTitleClickHandle}
    />
  );
};

export default App;
