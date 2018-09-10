import React from "react";
import { MemoryRouter } from "react-router-dom";
import NewBookForm from "../AdminComps/NewBookForm";


describe("NewBookForm Component", () => {
		it("should render new book form", () => {
				const wrapper = mount(
						<MemoryRouter>
								<NewBookForm />
						</MemoryRouter>
				);

				expect(wrapper.find(NewBookForm)).to.have.lengthOf(1);
		});
});