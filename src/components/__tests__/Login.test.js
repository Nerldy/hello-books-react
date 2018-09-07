import React from "react";
import { MemoryRouter } from "react-router-dom";
import Login from "../Auths/Login";
import { mount } from "../../utils/enzyme";

describe("Login Component", () => {
	it("should render login form", () => {
		const wrapper = mount(
			<MemoryRouter>
				<Login />
			</MemoryRouter>
		);
		expect(wrapper.find(Login))
			.to.have.length(1);
	});
});
