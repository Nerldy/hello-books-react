import React from "react";
import UserBooks from "../UserComps/UserBooks";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";


describe.skip("UserBooks Component", () => {
    const result = {
        data: {
            books: [{}]
        }
    }
    const promise = Promise.resolve(result);
    beforeAll(() => {
        sinon.stub(axios, "get").withArgs("http://127.0.0.1:5000/api/v2/").returns(promise);
    });

    afterAll(() => {
        axios.get.restore();
    });


    it("should call componentDidMount", () => {
        sinon.spy(UserBooks.prototype, "componentDidMount");
        const wrapper = mount(<UserBooks/>);
        console.log(wrapper.debug());
        expect(UserBooks.prototype.componentDidMount.calledOnce).to.equal(true);
    });
});