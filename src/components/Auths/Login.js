import React, {Component} from "react";
import {Redirect, withRouter} from "react-router-dom";

class Login extends Component {
    //comp for user to use to login

    state = {
        username: "",
        password: "",
        isLogged: false
    };

    handleChange = e => {
        // handles form inputs
        this.setState({[e.target.name]: e.target.value});

    };

    handleSubmit = e => {
        //handle form submission
        e.preventDefault();

        this.setState({isLogged: true});

        if (this.state.isLogged) {
            this.props.history.replace("/dashboard");
        }
    };


    render() {
        if (this.state.isLogged) {
            return <Redirect
                push
                to={"/dashboard"}/>;
        }
        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}/>

                    </label>

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