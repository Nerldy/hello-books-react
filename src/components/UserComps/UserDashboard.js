import React, {Component} from "react";
import {NavLink} from "react-router-dom";


class UserDashboard extends Component {
    render() {
        return (
            <div>
                <div>
                    <NavLink to={`${this.props.match.url}`}>Home</NavLink>
                    <NavLink to={`${this.props.match.url}/books`}>Catalog</NavLink>
                    <NavLink to={`${this.props.match.url}/borrowed-books`}>My Library</NavLink>
                    <NavLink to={`${this.props.match.url}/history`}>Archives</NavLink>
                    <NavLink to={"/login"}>Logout</NavLink>
                </div>
                <h2>User Dashboard</h2>

                <div>

                </div>


            </div>
        );
    }
}

export default UserDashboard;