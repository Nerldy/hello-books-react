import React from "react";
import ResetPassword from "../Auths/ResetPassword";
import { MemoryRouter } from "react-router-dom";


describe("ResetPassword component", () => {
		it("should render the form", () => {
				const wrapper = mount(
						<MemoryRouter>
								<ResetPassword />
						</MemoryRouter>
				);
				expect(wrapper.exists("[className=\"field\"]")).to.equal(true);
		});

		it("should be able to click submit", () => {
				const wrapper = mount(
						<MemoryRouter>
								<ResetPassword />
						</MemoryRouter>
				);

				const button = wrapper.find("button");
				button.simulate("click");
		});
});