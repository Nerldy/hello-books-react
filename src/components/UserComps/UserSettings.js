import React, {Component} from "react";
import ResetPassword from "../Auths/ResetPassword";

class UserSettings extends Component {
    render() {
        return (
            <div>
                <h2>User settings</h2>
                <ResetPassword/>
            </div>
        );
    }
}

export default UserSettings;