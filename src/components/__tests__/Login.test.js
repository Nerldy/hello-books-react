import React from "react";
import {shallow} from "../../utils/enzyme";

import Login from "../Auths/Login";


describe("it tests Login component", () => {
    test("login component renders", () => {
        const wrapper = shallow(<Login/>);
        console.log(wrapper.debug());
    });
});