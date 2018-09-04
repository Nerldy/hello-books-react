import React from "react";

import Home from "../Home";
import { mount } from "../../utils/enzyme";


it("should have signup Navlink", () => {
    const wrapper = shallow(<Home/>);

    // expect(wrapper.contains(NavLink)).toEqual(true);
    expect(wrapper.find("Sign Up")).toBeDefined();
    console.log(wrapper.debug());
});
