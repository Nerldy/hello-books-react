import React from "react";
import UserLibrary from "../UserComps/UserLibrary";


describe("UserLibrary Component", () => {
    it("should show previous and next buttons", () => {
        const wrapper = shallow(<UserLibrary/>);

        // set buttons states
        wrapper.setState({ has_next: true, has_prev: true });
        const domHtml = "<div><h2>Borrowed books</h2><button>Next</button><button>Prev</button></div>";
        expect(wrapper.html()).to.equal(domHtml);
    });

    it("should render a book", () => {
        const wrapper = shallow(<UserLibrary/>);

        // set book state
        wrapper.setState({
            borrowedBooks: [
                { title: "book tester 1", isbn: 6533454345, id: 1 }
            ]
        });
        console.log(wrapper.debug());
        expect(wrapper.find("[className=\"bookCard\"]")).to.have.lengthOf(1);
    });
});