import React from "react";
import {mount, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SignIn from "./sign-in.jsx";

configure({
  adapter: new Adapter(),
});

it(`Calls callback when btn submit press`, () => {
  const onSubmit = jest.fn();
  const mockEvent = {
    preventDefault() {}
  };

  const signIn = mount(
      <SignIn
        onSubmit={onSubmit}
      />
  );

  const form = signIn.find(`form`);
  form.simulate(`submit`, mockEvent);

  expect(onSubmit).toHaveBeenCalledTimes(1);
});
