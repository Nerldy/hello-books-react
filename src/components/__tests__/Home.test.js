import React from "react";
import {shallow} from "../../utils/enzyme";

import Home from "../Home";

describe("it tests h1 tag", () => {
    it("should render <Home/>", () => {
        const wrapper = shallow(<Home/>);

        expect(wrapper.find("h1")).toBeDefined();

    });

});