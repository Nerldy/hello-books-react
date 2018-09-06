import { NavLink, Route, Switch, Redirect } from "react-router-dom";
import React, { Fragment } from "react";
import SignUp from "./Auths/SignUp";
import Login from "./Auths/Login";
import API from "../utils/api";
import HelloBooksLogo from "./HelloBooksLogo";

const Home = () => {

    // if user was already logged in redirect them to the dashboard
    if (localStorage.getItem("auth_token")) {

        // Add Authorization to the header
        API.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("auth_token");
        return <Redirect to="/dashboard"/>;
    }

    return (
        <Fragment>
            <div className="hero is-success is-fullheight">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <div className="column is-4 is-offset-4">
                            <div className='level'>
                                <div className='level-item has-text-centered'>
                                    <div id="helloBooksLogo">
                                    <HelloBooksLogo/>
                                    </div>
                                </div>
                            </div>
                            <nav
                                className="auth-link">
                                <NavLink to={`/signup`}>Sign Up</NavLink>
                                <span>|</span>
                                <NavLink to={`/login`}>Login</NavLink>
                            </nav>
                            <div className="main-content-area">
                                <Switch>
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
                </div>
            </div>
        </Fragment>
    );
};

export default Home;