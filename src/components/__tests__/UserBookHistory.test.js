import React from "react";
import UserBookHistory from "../UserComps/UserBookHistory";
import axios from "axios";
import moxios from "moxios";

jest.mock("axios");

const mockData = {
    data: {
        books: [
            {
                "borrow_date": "Thu, 23 Aug 2018 11:38:33 GMT",
                "id": 1,
                "isbn": "1548169757",
                "return_date": "Sat, 25 Aug 2018 08:35:14 GMT",
                "title": "Brian Turner"
            }
        ]
    }
};

describe("UserBookHistory Component", () => {

    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("should render book card", async () => {


        const wrapper = shallow(<UserBookHistory params={{mockData}}/>);
        console.log(wrapper.debug())
    });
});