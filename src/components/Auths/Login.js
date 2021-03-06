/* eslint-disable react/no-unescaped-entities */
import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import API from "../../utils/api";

/**
 * creates login form
 */
class Login extends Component {

		state = {
				username: "",
				password: "",
				errorMessage: ""
		};


		/**
		 * handles form input state change updating it
		 * @param e
		 */
		handleChange = e => {
				// handles form inputs
				this.setState({ [e.target.name]: e.target.value });
		};

		/**
		 * sends data through Axios to the API
		 * @param e
		 */
		handleSubmit = e => {
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
								API.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("auth_token")}`;

								// redirect user to the dashboard
								this.props.history.replace("/dashboard/books");
						})
						.catch(err => {
								if (err.response.data.status === "error") {
										this.setState({ errorMessage: err.response.data.message });
								}
								console.log(err.response);
						});
		};

		/**
		 * deletes notification from the view
		 */
		handleDeleteNotification = () => {
				this.setState({ errorMessage: "" });
		};

		render() {
				let errorMessage;

				if (this.state.errorMessage) {
						// if error in submission it creates error message notification in view
						errorMessage = (
								<div className="notification is-danger">
										<button
												className="delete"
												onClick={this.handleDeleteNotification}
										>
												{null}
										</button>
										The username doesn't exist or password is incorrect
								</div>
						);
				}

				return (
						<Fragment>
								<p className="subtitle has-text-grey">Please login to proceed.</p>
								<div className="box">
										{/*show error pop-up*/}
										{errorMessage}
										<form onSubmit={this.handleSubmit}>
												<div className="field">
														<label className="label">Username</label>
														<div className="control has-icons-left has-icons-right">
																<input
																		required
																		type="text"
																		name="username"
																		className="input is-rounded"
																		value={this.state.username}
																		onChange={this.handleChange}
																/>
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
																		onChange={this.handleChange}
																/>
																<span className="icon is-small is-left">
									<i className="fas fa-lock">{null}</i>
								</span>
														</div>
												</div>
												<button
														type="submit"
														className="button is-primary is-fullwidth is-rounded auth-button"
												>
														Login
												</button>
										</form>
								</div>
						</Fragment>
				);
		}
}

export default withRouter(Login);