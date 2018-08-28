import {NavLink, Route, Switch, Redirect} from "react-router-dom";
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
        <div className={"columns is-3"}>
            <div className="column">
                <header className={"hero"}>
                    <h1 className={"title"}>Welcome to Hello Books</h1>
                </header>
                <div className="columns">
                    <aside className="column is-one-fifth menu">
                        <div className="menu-list">
                            <NavLink to={`/signup`}>Sign Up</NavLink>
                            <NavLink to={`/login`}>Login</NavLink>
                        </div>
                    </aside>

                    <div className="column">

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
    );
};

export default Home;