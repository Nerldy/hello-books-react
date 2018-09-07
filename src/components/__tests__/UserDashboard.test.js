import React from "react";
import UserDashboard from "../UserComps/UserDashboard";
import createRouterContext from "react-router-test-context";


describe.skip("UserDashboard Component", () => {

    it("should render navigation", () => {
        sinon.stub(window.localStorage, "setItem");
        window.localStorage.setItem("auth_token", "tester");
        const wrapper = shallow(<UserDashboard/>);
    });
});