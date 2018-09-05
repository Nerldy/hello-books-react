import React from "react";
import App from "../App";


describe("App Component", () => {
    it("should render container div", () => {
        const wrapper = shallow(<App/>);
        expect(wrapper.find(".container")).to.have.length(1);
    });
});