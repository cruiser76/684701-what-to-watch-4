import React from "react";
import {mount, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SignIn from "./sign-in.jsx";
import {Router} from 'react-router-dom';
import history from '../../history.js';

configure({
  adapter: new Adapter(),
});

it(`Calls callback when btn submit press`, () => {
  const onSubmit = jest.fn();
  const login = `test@gmail.com`;
  const password = `12345`;
  const mockEvent = {
    preventDefault: () => {},
  };

  const signIn = mount(
      <Router history={history}>
        <SignIn
          onSubmit={onSubmit}
        />
      </Router>
  );

  const loginField = signIn.find(`#user-email`);
  const passwordField = signIn.find(`#user-password`);

  loginField.instance().value = login;
  passwordField.instance().value = password;

  const form = signIn.find(`form`);
  form.props().onSubmit(mockEvent);

  expect(onSubmit).toHaveBeenCalledTimes(1);
});
