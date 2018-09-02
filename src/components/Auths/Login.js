import React, {Component, Fragment} from "react";
import {withRouter} from "react-router-dom";
import API from "../../utils/api";
import HelloBooksLogo from "../HelloBooksLogo";
import "./Auth.css";

class Login extends Component {
    //comp for user to use to login

    state = {
        username: "",
        password: "",
        errorMessage: ""
    };

    handleChange = e => {
        // handles form inputs
        this.setState({[e.target.name]: e.target.value});

    };

    handleSubmit = e => {
        //handle form submission
        e.preventDefault();

        // data to be sent in the API
        const data = {
            username: this.state.username,
            password: this.state.password
        };

        // post data to API via axios
        API.post("/auth/login", data)
            .then(res => {
                localStorage.clear();

                // save authorization to the local storage
                localStorage.setItem("auth_token", res.data.auth_token);

                localStorage.setItem("is_admin", res.data.is_admin);
                localStorage.setItem("username", this.state.username);

                // Add Authorization to the header
                API.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("auth_token");

                // redirect user to the dashboard
                this.props.history.replace("/dashboard");
            })
            .catch(err => {
                if (err.response.data.status === "error") {
                    this.setState({errorMessage: err.response.data.message});
                }
                console.log(err.response);
            });

    };

    handleDeleteNotification = () => {
        // deletes notification from the view
        this.setState({errorMessage: ""});
    };


    /*
    ============================================================
        Render

        */

    render() {
        let errorMessage;


        if (this.state.errorMessage) {
            // if error in submission it creates error message notification in view
            errorMessage = (
                <div className="notification is-danger">
                    <button
                        className="delete"
                        onClick={this.handleDeleteNotification}>{null}</button>
                    The username doesn't exist or password is incorrect
                </div>
            );
        }


        return (
            <Fragment>

                <div className="row justify-content-center">
                    <div className="col-4">
                        <HelloBooksLogo/>
                    </div>
                </div>
                {/*show error pop-up*/}
                {errorMessage}


                <div className="row justify-content-center">
                    <div className="col-10">
                        <form onSubmit={this.handleSubmit}>
                            <div className={"field"}>
                                <label className={"label"}>
                                    Username
                                </label>
                                <div className={"control has-icons-left has-icons-right"}>
                                    <input
                                        required
                                        type="text"
                                        name="username"
                                        className="input is-rounded"
                                        value={this.state.username}
                                        onChange={this.handleChange}/>
                                    <span className="icon is-small is-left">
                                <i className="fas fa-user">{null}</i>
                            </span>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Password</label>

                                <div className="control has-icons-left has-icons-right">
                                    <input
                                        required
                                        type="password"
                                        name="password"
                                        className="input is-rounded"
                                        value={this.state.password}
                                        onChange={this.handleChange}/>
                                    <span className="icon is-small is-left">
                                <i className="fas fa-lock">{null}</i>
                            </span>
                                </div>
                            </div>

                            <button type="submit" className="button is-outlined">Login</button>

                        </form>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default withRouter(Login);