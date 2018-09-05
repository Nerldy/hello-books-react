import React from "react";
import UserDashboard from "../UserComps/UserDashboard";
import moxios from "moxios";
import {Redirect} from 'react-router-dom'


describe.skip("UserDashboard Component", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("should render navigation", () => {
        const data = {};
        const wrapper = shallow(<UserDashboard params={{ data }}/>);

        // wrapper.setState({ isLoggedOut: false });
        expect(wrapper.find(Redirect)).to.equal(true)
    });
});