import React from "react";
import SignUp from "../Auths/SignUp";

it("should render a sign up form", () => {
    const wrapper = shallow(<SignUp/>);

    expect(wrapper.find("#auth-form")).toBeDefined();

    console.log(wrapper.debug());
});

it("should render a", () => {
    const wrapper = mount(<SignUp/>);

    expect(wrapper.find(".label")).toBeDefined();

    console.log(wrapper.debug());
});