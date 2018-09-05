import { NavLink, Route, Switch, Redirect } from "react-router-dom";
import React from "react";
import SignUp from "./Auths/SignUp";
import Login from "./Auths/Login";
import API from "../utils/api";

const Home = () => {

    // if user was already logged in redirect them to the dashboard
    if (localStorage.getItem("auth_token")) {

        // Add Authorization to the header
        API.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("auth_token");
        return <Redirect to="/dashboard"/>;
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <aside className="col-md-auto">
                    <div
                        className="nav flex-column nav-pills"
                        id="v-pills-tab"
                        role="tablist"
                        aria-orientation="vertical">
                        <NavLink
                            to={`/signup`}
                            activeClassName="active"
                            id="v-pills-signup-tab"
                            data-toggle="pill"
                            href="#v-pills-signup"
                            role="tab"
                            aria-controls="v-pills-signup"
                            aria-selected="false"
                            className="nav-link">Sign Up</NavLink>
                        <NavLink
                            to={`/login`}
                            activeClassName="active"
                            id="v-pills-login-tab"
                            data-toggle="pill"
                            href="#v-pills-login"
                            role="tab"
                            aria-controls="v-pills-login"
                            aria-selected="false"
                            className="nav-link">Login</NavLink>
                    </div>

                </aside>

                <div className="col">
                    <Switch>
                        <Route
                            exact
                            path={"/"}
                            render={() => {
                                return (
                                    <div>
                                        <header>
                                            <h1>Welcome to Hello Books</h1>
                                            <p>Please Sign Up or Login</p>
                                        </header>
                                    </div>
                                );
                            }}/>

                        <Route
                            path={`/signup`}
                            component={SignUp}/>
                        <Route
                            path={`/login`}
                            component={Login}/>

                    </Switch>
                </div>


            </div>
        </div>
    );
};

export default Home;