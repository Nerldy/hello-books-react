import React from "react";
import UserSettings from "../UserComps/UserSettings";
import { MemoryRouter } from "react-router-dom";


describe("UserSettings component", () => {
	it("should render <UserSettings/>", () => {
		const wrapper = mount(
			<MemoryRouter>
				<UserSettings />
			</MemoryRouter>
		);
		expect(wrapper.find("h1").text()).to.equal("Reset Password");
	});
});