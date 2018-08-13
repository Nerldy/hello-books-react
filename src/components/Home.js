import React from "react";
import {NavLink, Route, BrowserRouter as Router} from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";

const Home = () => {

    return (
        <Router>
            <div>
                <h1>Welcome to Hello Books</h1>

                <Route
                    exact
                    path={"/"}
                    render={() => (
                        <h2>Please sign up or login</h2>
                    )}/>

                <ul>
                    <li><NavLink to={"/signup"}>Sign Up</NavLink></li>
                    <li><NavLink to={"/login"}>Login</NavLink></li>
                </ul>


                <Route
                    path={"/signup"}
                    render={() => <SignUp/>}/>

                <Route
                    path={"/login"}
                    component={Login}/>
            </div>

        </Router>
    );

};

export default Home;