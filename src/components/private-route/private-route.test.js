import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {MemoryRouter} from "react-router-dom";

import PrivateRoute from './private-route.jsx';

const mockStore = configureStore([]);
const store = mockStore({
  USER: {authorizationStatus: `NO_AUTH`}
});

describe(`Render correct PrivateRoute`, () => {
  it(`Render PrivateRoute`, () => {
    const tree = renderer
    .create(
        <Provider store={store}>
          <MemoryRouter>
            <PrivateRoute
              render={() => {}}
              path={`/`}
              exact={true}
              authorizationStatus={`AUTH`}
            />
          </MemoryRouter>
        </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
