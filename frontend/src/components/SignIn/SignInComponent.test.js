import React from "react";
import SignInComponent from "./SignInComponent";
import {shallow} from "enzyme";

describe("SignInComponent", () => {
  const component = shallow(<SignInComponent/>);

  it("shall render the login page correctly", () => {
    expect(component).toMatchSnapshot();
  });

});
