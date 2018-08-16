import {NavLink, Route, Switch} from "react-router-dom";
import React from "react";
import SignUp from "./Auths/SignUp";
import Login from "./Auths/Login";

const Home = () => {
    return (
        <div>
            <h1>Welcome to Hello Books</h1>
            <NavLink to={`/signup`}>Sign Up</NavLink>
            <NavLink to={`/login`}>Login</NavLink>

            <Switch>

                <Route
                    path={`/signup`}
                    component={SignUp}/>
                <Route
                    path={`/login`}
                    component={Login}/>
            </Switch>

        </div>
    );
};

export default Home;