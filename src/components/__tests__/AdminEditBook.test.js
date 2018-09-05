import React from "react";
import AdminEditBook from "../AdminComps/AdminEditBook";
import { MemoryRouter } from "react-router-dom";

describe("AdminEditBook Component", () => {
    it("should render edit button", () => {
        const wrapper = mount(
            <MemoryRouter>
                <AdminEditBook/>
            </MemoryRouter>
        );
        expect(wrapper.exists('[className="fas fa-edit"]')).to.equal(true);
    });
});