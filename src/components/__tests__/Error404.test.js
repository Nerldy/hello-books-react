import React from "react";
import Error404 from "../Error404";

it("should render 404 error page", () => {
		const wrapper = shallow(<Error404 />);
		expect(wrapper.find("h1")).to.have.lengthOf(1);
});