import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import API from "../../utils/api";

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
                localStorage.removeItem("auth_token");

                // save authorization to the local storage
                localStorage.setItem("auth_token", res.data.auth_token);

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
            <div>
                <h2>Login</h2>
                {errorMessage}
                <form onSubmit={this.handleSubmit}>
                    <div className={"field"}>
                        <label className={"label"}>
                            Username
                        </label>
                        <div className={"control has-icons-left has-icons-right"}>
                            <input
                                type="text"
                                name="username"
                                className={"input"}
                                value={this.state.username}
                                onChange={this.handleChange}/>
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                        </div>
                        {}
                    </div>

                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}/>

                    </label>

                    <button type="submit">Login</button>

                </form>
            </div>
        );
    }
}

export default withRouter(Login);