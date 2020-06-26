import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Main from './../main/main.jsx';
import MoviePage from './../movie-page/movie-page.jsx';

const movieCardTitleClickHandle = () => {};

const App = (props) => {

  function _renderApp() {
    return (<Main
      {...props}
      onMovieCardTitleClick={movieCardTitleClickHandle}
    />);
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {_renderApp()}
        </Route>
        <Route exact path="/dev-component">
          <MoviePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
