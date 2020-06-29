import React, {PureComponent} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Main from './../main/main.jsx';
import MoviePage from './../movie-page/movie-page.jsx';

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentMovie: null
    };
    this.movieCardClickHandle = this.movieCardClickHandle.bind(this);
  }

  _performCardClick(el) {
    this.setState({currentMovie: el});
  }

  _renderApp() {
    if (!this.state.currentMovie) {
      return (<Main
        {...this.props}
        movieCardClickHandle={this.movieCardClickHandle}
      />);
    } else {
      return (<MoviePage
        movie={this.state.currentMovie}
      />);
    }
  }

  movieCardTitleClickHandle(el) {
    this._performCardClick(el);
  }

  movieCardClickHandle(el) {
    this._performCardClick(el);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-component">
            <MoviePage
              movie={{}}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
