import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./Home";
import UserDashboard from "./UserComps/UserDashboard";
import Error404 from "./Error404";


class App extends Component {
    state = {};

    render() {
        return (
            <Router>
                <div className={"container"}>

                    <Switch>
                        <Route
                            exact
                            path={"/"}
                            component={Home}/>

                        <Route
                            path={`/signup`}
                            component={Home}/>

                        <Route
                            path={`/login`}
                            component={Home}/>

                        <Route
                            path={`/dashboard`}
                            component={UserDashboard}/>

                        <Route
                            component={Error404}/>


                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
