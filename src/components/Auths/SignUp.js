import React, { Component, Fragment } from "react";
import API from "../../utils/api";
import { Redirect } from "react-router-dom";
import { validateEmail } from "../../utils/helperFuncs";
import HelloBooksLogo from "../HelloBooksLogo";
import "./Auth.css";


class SignUp extends Component {
    //comp for user to use to sign up

    state = {
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        errorMessage: "",
        emailError: "",
        emailWrong: false,
        emailSuccess: false, // use to confirm if email is successful
        isLogged: false,
        notifyPasswordLength: false,
        isOkay: false,
        hasTyped: false,
        showChecker: false
    };

    handleChange = e => {
        // handles form inputs
        this.setState({ [e.target.name]: e.target.value });

        // check if email format is correct
        if (e.target.name === "email" && e.target.value.length >= 1) {
            if (!validateEmail(e.target.value)) {
                this.setState({
                    emailError: <p className="help is-danger">This email format is invalid</p>,
                    emailWrong: true
                });
            }
            else {
                this.setState({
                    emailError: null,
                    emailWrong: false,
                    emailSuccess: true
                });
            }
        }

        // notify user when password is less than 8 characters
        if ((e.target.name === "password") && (e.target.value.length < 8)) {
            this.setState({
                notifyPasswordLength: <p className="help is-danger">Password length must not be less than 8</p>,
                hasTyped: true
            });
        }
        else if ((e.target.name === "password") && (e.target.value.length >= 8)) {
            this.setState({
                notifyPasswordLength: null,
                isOkay: true,
                hasTyped: false,
                showChecker: true
            });
        }

    };

    handleDeleteNotification = () => {
        // deletes notification from the view
        this.setState({ errorMessage: "" });
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

                localStorage.setItem("username", this.state.username);

                // Add Authorization to the header
                API.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("auth_token");
                this.setState({ isLogged: true });

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

                this.setState({ errorMessage: err.response.data.message });
                return <Redirect to={"/signup"}/>;
            });
    };

    render() {

        let errorMessage; // container for error message
        let emailErrInputClass = ["input"]; // email error input class
        let inputClass = ["input"]; // base input class

        // add success class if email is correct
        if (this.state.emailSuccess) {
            emailErrInputClass.push("is-success");
        }

        // add danger class if email is correct
        if (this.state.emailWrong) {
            emailErrInputClass.push("is-danger");
        }


        if (this.state.errorMessage) {
            // if error in submission it creates error message notification in view
            errorMessage = (
                <div className="notification is-danger">
                    <button
                        className="delete"
                        onClick={this.handleDeleteNotification}>{null}</button>
                    {this.state.errorMessage}
                </div>
            );
        }

        // if logged in, redirect to dashboard
        if (this.state.isLogged) {
            return <Redirect to={"/dashboard/books"}/>;
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
            <Fragment>

                <div className="row justify-content-center">

                    {/*show error pop-up*/}
                    {errorMessage}

                    <form onSubmit={this.handleSubmit}>
                        <div className="row justify-content-center">
                            <div id="helloBooksLogo" className='col'>
                                <HelloBooksLogo/>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Username</label>
                            <div className="control has-icons-left has-icons-right">
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
                            <label className="label">Email</label>
                            <div className="control has-icons-left has-icons-right">
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    className={`is-rounded ${emailErrInputClass.join(" ")}`}
                                    value={this.state.email}
                                    onChange={this.handleChange}/>
                                <span className="icon is-small is-left">
                                <i className="fas fa-envelope">{null}</i>
                            </span>
                            </div>
                            {this.state.emailError}

                        </div>

                        <div className="field">
                            <label className="label">Password</label>

                            <div className="control has-icons-left has-icons-right">
                                <input
                                    required
                                    type="password"
                                    name="password"
                                    className={`is-rounded ${inputClass.join(" ")}`}
                                    value={this.state.password}
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

                        <div className="field">
                            <label className="label"> Repeat Password</label>

                            <div className="control has-icons-left has-icons-right">
                                <input
                                    required
                                    type="password"
                                    name="confirm_password"
                                    className="input is-rounded"
                                    value={this.state.confirm_password}
                                    onChange={this.handleChange}/>
                                <span className="icon is-small is-left">
                                <i className="fas fa-lock">{null}</i>
                            </span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="button is-primary is-fullwidth is-rounded">Sign Up
                        </button>


                    </form>
                </div>
            </Fragment>
        );
    }
}

export default SignUp;