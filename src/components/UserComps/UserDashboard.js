import React, {Component, Fragment} from "react";
import {NavLink, Route, Redirect} from "react-router-dom";
import API from "../../utils/api";
import UserHome from "./UserHome";
import UserBooks from "./UserBooks";
import UserLibrary from "./UserLibrary";
import UserBookHistory from "./UserBookHistory";
import UserSettings from "./UserSettings";

class UserDashboard extends Component {
    state = {
        isLoggedOut: false
    };

    handleLogout = () => {
        // handles logging out of user
        API.post("/auth/logout", null)
            .then(res => {
                localStorage.clear();
                this.setState({isLoggedOut: true});
            })
            .catch(err => console.log(err.response));
    };

    render() {
        let adminAddBook;
        // if is logged out, redirect user to the login page
        if (this.state.isLoggedOut) {
            return <Redirect to={"/login"}/>;
        }

        // if is_admin exists and true in the local storage, show admin navigation
        // if (localStorage.getItem("is_admin") === "true") {
        //     // adminAddBook = ();
        // }

        return localStorage.getItem("auth_token") ? (
            <div className="row">
                <div className="col-12 col-md-2">
                    <nav className="nav flex-column">

                        {/*Navigation links for the dashboard*/}
                        <NavLink
                            to={`${this.props.match.url}`}
                            activeClassName="active">Home</NavLink>
                        <NavLink
                            to={`${this.props.match.url}/books`}
                            activeClassName="active">
                            Catalog
                        </NavLink>
                        <NavLink
                            to={`${this.props.match.url}/borrowed-books`}
                            activeClassName="active">
                            My Library
                        </NavLink>
                        <NavLink
                            to={`${this.props.match.url}/history`}
                            activeClassName="active">
                            Archives
                        </NavLink>
                        <NavLink
                            to={`${this.props.match.url}/settings`}
                            activeClassName="active">
                            Settings
                        </NavLink>
                        <button onClick={this.handleLogout}>Logout</button>
                    </nav>
                </div>


                {/*admin feature*/}
                {adminAddBook}

                <div className="col-12 col-md-10">

                    {/*Navigation routes below*/}

                    {/*route to user home*/}
                    <Route
                        path={`${this.props.match.url}`}
                        exact
                        component={UserHome}
                    />

                    {/*route for user to get all books*/}
                    <Route
                        path={`${this.props.match.url}/books`}
                        component={UserBooks}
                    />

                    {/*route for user to view books they borrowed*/}
                    <Route
                        path={`${this.props.match.url}/borrowed-books`}
                        component={UserLibrary}
                    />

                    {/*route for user to view history of borrowed books*/}
                    <Route
                        path={`${this.props.match.url}/history`}
                        component={UserBookHistory}
                    />

                    {/*route for user to see account settings*/}
                    <Route
                        path={`${this.props.match.url}/settings`}
                        component={UserSettings}
                    />
                </div>


                <div/>
            </div>
        ) : (
            <Redirect to={"/login"}/>
        );
    }
}

export default UserDashboard;
