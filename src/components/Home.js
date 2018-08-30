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
        <div className="container-fluid">
            <div className="row">
                <header className="col">
                    <h1 className={"title"}>Welcome to Hello Books</h1>
                </header>
            </div>
            <div className="row justify-content-md-center">
                <aside className="col-12 col-md-4 list-group">
                    <NavLink
                        to={`/signup`}
                        activeClassName="active"
                        className="list-group-item list-group-item-action">Sign Up</NavLink>
                    <NavLink
                        to={`/login`}
                        activeClassName="active"
                        className="list-group-item list-group-item-action">Login</NavLink>
                </aside>

                <div className="col-12 col-md-8">
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
    );
};

export default Home;