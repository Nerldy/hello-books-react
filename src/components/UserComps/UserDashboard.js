import React, {Component} from "react";
import {NavLink, Route} from "react-router-dom";
import UserHome from "./UserHome";
import UserBooks from "./UserBooks";
import UserLibrary from "./UserLibrary";
import UserBookHistory from "./UserBookHistory";
import UserSettings from "./UserSettings";


class UserDashboard extends Component {
    render() {
        return (
            <div>
                <div>
                    {/*Navigation links for the dashboard*/}
                    <NavLink to={`${this.props.match.url}`}>Home</NavLink>
                    <NavLink to={`${this.props.match.url}/books`}>Catalog</NavLink>
                    <NavLink to={`${this.props.match.url}/borrowed-books`}>My Library</NavLink>
                    <NavLink to={`${this.props.match.url}/history`}>Archives</NavLink>
                    <NavLink to={`${this.props.match.url}/settings`}>Settings</NavLink>
                    <NavLink to={"/login"}>Logout</NavLink>
                </div>
                <h2>User Dashboard</h2>

                {/*Navigation routes below*/}

                {/*route to user home*/}
                <Route
                    path={`${this.props.match.url}`}
                    exact
                    component={UserHome}/>

                {/*route for user to get all books*/}
                <Route
                    path={`${this.props.match.url}/books`}
                    component={UserBooks}/>

                {/*route for user to view books they borrowed*/}
                <Route
                    path={`${this.props.match.url}/borrowed-books`}
                    component={UserLibrary}/>

                {/*route for user to view history of borrowed books*/}
                <Route
                    path={`${this.props.match.url}/history`}
                    component={UserBookHistory}/>

                {/*route for user to see account settings*/}
                <Route
                    path={`${this.props.match.url}/settings`}
                    component={UserSettings}/>

                <div>

                </div>


            </div>
        );
    }
}

export default UserDashboard;