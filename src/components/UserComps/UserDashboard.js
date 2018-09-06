import React, { Component, Fragment } from "react";
import { NavLink, Route, Redirect } from "react-router-dom";
import API from "../../utils/api";
import UserBooks from "./UserBooks";
import UserLibrary from "./UserLibrary";
import UserBookHistory from "./UserBookHistory";
import UserSettings from "./UserSettings";
import HelloBooksLogo from "../HelloBooksLogo";

class UserDashboard extends Component {
    state = {
        isLoggedOut: false
    };

    handleLogout = () => {
        // handles logging out of user
        API.post("/auth/logout", null)
            .then(res => {
                localStorage.clear();
                this.setState({ isLoggedOut: true });
            })
            .catch(err => console.log(err.response));
    };

    render() {
        // if is logged out, redirect user to the login page
        if (this.state.isLoggedOut) {
            return <Redirect to={"/login"}/>;
        }

        return localStorage.getItem("auth_token") ? (
            <Fragment>
                <section
                    className="hero is-success is-fullheight"
                    style={{ "backgroundColor": "#000066" }}>
                    <div className="hero-head">
                        <header className="navbar">
                            <div className="container">
                                <div className="navbar-brand">
                                    <div className="navbar-item">
                                        <div style={{ "fill": "#e65f5c", "max-width": "100px" }}>
                                            <HelloBooksLogo/>
                                        </div>
                                    </div>
                                    <span
                                        className="navbar-burger burger"
                                        data-target="navbarMenuHeroA">
                                        <span>{}</span>
                                        <span>{}</span>
                                        <span>{}</span>
                                    </span>
                                </div>
                                <nav
                                    id="navbarMenuHeroA"
                                    className="navbar-menu">
                                    <div className="navbar-end">
                                        {/*Navigation links for the dashboard*/}
                                        <NavLink
                                            to={`${this.props.match.url}/books`}
                                            activeClassName="is-active"
                                            className="navbar-item">
                                            Catalog
                                        </NavLink>
                                        <NavLink
                                            to={`${this.props.match.url}/borrowed-books`}
                                            activeClassName="is-active"
                                            className="navbar-item">
                                            My Library
                                        </NavLink>
                                        <NavLink
                                            to={`${this.props.match.url}/history`}
                                            activeClassName="is-active"
                                            className="navbar-item">
                                            Archives
                                        </NavLink>
                                        <NavLink
                                            to={`${this.props.match.url}/settings`}
                                            activeClassName="is-active"
                                            className="navbar-item">
                                            Settings
                                        </NavLink>
                                        <span className="navbar-item">
                            <button
                                onClick={this.handleLogout}
                                className="button is-success is-inverted">Logout</button>
                        </span>
                                    </div>

                                </nav>
                            </div>
                        </header>
                    </div>
                    <div
                        className="hero-body"
                        style={{ "backgroundColor": "#000066" }}>
                        <div
                            className="container has-text-centered"
                            style={{
                                "maxWidth": "600px"
                            }}>

                            {/*Navigation routes below*/}

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
                    </div>
                </section>
            </Fragment>
        ) : (
            <Redirect to={"/login"}/>
        );
    }
}

export default UserDashboard;
