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
    this.handleCardClick = this.handleCardClick.bind(this);
  }

  handleCardClick(el) {
    this.setState({currentMovie: el});
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this.state.currentMovie ?
              <MoviePage
                movie={this.state.currentMovie}
              /> :
              <Main
                {...this.props}
                onCardClick={this.handleCardClick}
              />
            }
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
