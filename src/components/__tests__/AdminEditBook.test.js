import React from "react";
import { MemoryRouter } from "react-router-dom";
import AdminEditBook from "../AdminComps/AdminEditBook";

describe("AdminEditBook Component", () => {
		it("should render edit button", () => {
				const wrapper = mount(
						<MemoryRouter>
								<AdminEditBook />
						</MemoryRouter>
				);
				expect(wrapper.exists("[className=\"fas fa-edit\"]"))
						.to.equal(true);
		});
});