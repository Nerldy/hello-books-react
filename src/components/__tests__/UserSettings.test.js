import React from "react";
import UserSettings from "../UserComps/UserSettings";


describe("UserSettings component", () => {
    it("should render <UserSettings/>", () => {
        const wrapper = shallow(<UserSettings/>);
        console.log(wrapper.debug());
        expect(wrapper.find('h2').text()).to.equal('User settings')
    });
});