import React, {Component} from "react";
import {validateEmail} from "../../utils/helperFuncs";
import API from "../../utils/api";
import {Redirect} from "react-router-dom";

class ResetPassword extends Component {

    state = {
        isLogged: false,
        old_password: "",
        new_password: "",
        notifyPasswordLength: false,
        isOkay: false,
        hasTyped: false,
        showChecker: false,
        errorMessage: ""
    };

    componentDidMount(){
        // Add Authorization to the header
        API.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem("auth_token");
    }

    handleChange = e => {
        // handles form inputs
        this.setState({[e.target.name]: e.target.value});

        // notify user when new_password is less than 8 characters
        if ((e.target.name === "new_password") && (e.target.value.length < 8)) {
            this.setState({
                notifyPasswordLength: <p className="help is-danger">Password length must not be less than 8</p>,
                hasTyped: true
            });
        }
        else if ((e.target.name === "new_password") && (e.target.value.length >= 8)) {
            this.setState({
                notifyPasswordLength: null,
                isOkay: true,
                hasTyped: false,
                showChecker: true
            });
        }

    };

    handleSubmit = e => {
        //handle form submission
        e.preventDefault();

        // data to be sent in the API
        const data = {
            old_password: this.state.old_password,
            new_password: this.state.new_password,
        };

        API.post(
            "/auth/reset-password",
            data
            )
            .then(res => {
                // save authorization to the local storage
                localStorage.clear();

            })
            .catch(err => {
                console.log(err.response);
                if (err.response.data.status === "error") {
                    // check if password is in error message
                    if (err.response.data.message.includes("password")) {
                        this.setState({
                            errorMessage: err.response.data.message,
                            password: "",
                            confirm_password: "",
                            notifyPasswordLength: <p className="help is-danger">Password error</p>,
                            hasTyped: true
                        });
                    }
                }
                return <Redirect to={"/signup"}/>;
            });
    };

    render() {
        let inputClass = ["input"]; // base input class

        // if logged in, redirect to dashboard
        if (this.state.isLogged) {
            return <Redirect to={"/dashboard"}/>;
        }

        // add success class name to input
        if (this.state.isOkay) {
            inputClass.push("is-success");
        }

        // add danger class name to input
        if (this.state.hasTyped) {
            inputClass.push("is-danger");
        }

        return (
            <div>
                <h1>Reset Password</h1>

                {/*show error pop-up*/}
                {errorMessage}

                <form onSubmit={this.handleSubmit}>

                    <div className="field">
                        <label className="label">Old Password</label>

                        <div className="control has-icons-left has-icons-right">
                            <input
                                required
                                type="password"
                                name="old_password"
                                className="input"
                                value={this.state.old_password}
                                onChange={this.handleChange}/>
                            <span className="icon is-small is-left">
                                <i className="fas fa-lock">{null}</i>
                            </span>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">New Password</label>

                        <div className="control has-icons-left has-icons-right">
                            <input
                                required
                                type="password"
                                name="new_password"
                                className={inputClass.join(" ")}
                                value={this.state.new_password}
                                onChange={this.handleChange}/>
                            <span className="icon is-small is-left">
                                <i className="fas fa-lock">{null}</i>
                            </span>
                            {this.state.notifyPasswordLength ? (
                                <span className="icon is-small is-right">
                                    <i className="fas fa-exclamation-triangle">{null}</i>
                                </span>) : null}
                        </div>
                        {this.state.notifyPasswordLength}
                    </div>


                    <button
                        type="submit"
                        className="button is-link">Reset Password
                    </button>


                </form>
            </div>
        );
    }
}

export default ResetPassword;