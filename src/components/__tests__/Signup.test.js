import React from "react";
import SignUp from "../Auths/SignUp";

describe("SignUp Component", () => {
		it("should count all form fields", () => {
				const wrapper = shallow(<SignUp />);
				expect(wrapper.find(".field")).to.have.length(4);
		});
});
