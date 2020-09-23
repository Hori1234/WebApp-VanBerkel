import React from "react";
import SignInComponent from "./SignInComponent";
import { mount, shallow, render, setProps } from "enzyme";

describe("SignInComponent", () => {
  const component = shallow(<SignInComponent />);

  it("should render the login page correctly", () => {
    expect(component).toMatchSnapshot();
  });

  const roles = ["administrator", "view-only", "planner"];

  roles.forEach((role) => {
    it("should set the correct role", () => {
      component.setState({ role });
      expect(component.instance().state.role).toEqual(role);
    });
  });

  const usernames = ["bobbyz", "andrewossuna", "johnlopez"];

  usernames.forEach((username) => {
    it("should set the correct userName", () => {
      component.setState({ username });
      expect(component.instance().state.username).toEqual(username);
    });
  });

  it("should set the correct password", () => {
    const password = "notapassword";
    component.setState({ password });

    expect(component.instance().state.password).toEqual(password);
  });

  const passwords = ["3284328!%$", "1093ann", "notapassword"];

  passwords.forEach((password) => {
    it("should set the correct password", () => {
      component.setState({ password });
      expect(component.instance().state.password).toEqual(password);
    });
  });
});
