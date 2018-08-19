import React, {Component} from "react";
import API from "../../utils/api";
import {Redirect} from "react-router-dom";


class SignUp extends Component {
    //comp for user to use to sign up

    state = {
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        isLogged: false
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
            email: this.state.email,
            password: this.state.password,
            confirm_password: this.state.confirm_password
        };

        API.post(
            "/auth/register",
            data
            )
            .then(res => {
                // save authorization to the local storage
                localStorage.setItem("auth_token", res.data.auth_token);

                // Add Authorization to the header
                API.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("auth_token");
                this.setState({isLogged: true});

            })
            .catch(err => {
                console.log(err.response);
                console.log("oooo");
                return <Redirect to={"/signup"}/>;
            });
    };

    render() {
        if (this.state.isLogged) {
            return <Redirect to={"/dashboard"}/>;
        }

        return (
            <div>
                <h2>Sign Up</h2>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username
                        <input
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}/>
                    </label>

                    <label>
                        Email
                        <input
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}/>
                    </label>

                    <label>
                        Password
                        <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}/>
                    </label>

                    <label>
                        Repeat Password
                        <input
                            type="password"
                            name="confirm_password"
                            value={this.state.confirm_password}
                            onChange={this.handleChange}/>
                    </label>

                    <button type="submit">Sign Up</button>


                </form>
            </div>
        );
    }
}

export default SignUp;