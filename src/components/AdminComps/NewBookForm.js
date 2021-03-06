import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import API from "../../utils/api";
import { withRouter } from "react-router-dom";

/**
 * Form for creating a new book
 */
class NewBookForm extends Component {
		state = {
				title: "",
				isbn: "",
				modal: false,
				notifyISBNlength: null,
				hasTyped: false,
				errorMessage: "",
				isOkay: false,
				showChecker: false,
				isLogged: false
		};

		componentDidMount() {
				// Add Authorization to the header
				API.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("auth_token")}`;
		}

		/**
		 * toggles the modal on and off
		 */
		toggle = () => {
				this.setState({
						modal: !this.state.modal
				});
		};

		/**
		 * handles form inputs and updates the state
		 * @param e
		 */
		handleChange = e => {
				// handles form inputs
				this.setState({ [e.target.name]: e.target.value });

				// notify user when isbn is less than or more than 10 digits
				if ((e.target.name === "isbn" && e.target.value.length < 10) || e.target.value.length > 10) {
						this.setState({
								notifyISBNlength: <p className="help is-danger">ISBN must be exactly 10 digits</p>,
								hasTyped: true
						});
				} else if (e.target.name === "isbn" && e.target.value.length === 10) {
						this.setState({
								notifyISBNlength: null,
								isOkay: true,
								hasTyped: false,
								showChecker: true,
								duplicationError: ""
						});
				}
		};

		/**
		 * handles book creation by sending data to Axios
		 * @param e
		 */
		handleCreateBook = e => {
				e.preventDefault();

				// data to be sent in the API
				const data = {
						title: this.state.title,
						isbn: this.state.isbn
				};

				API.post("books", data)
						.then(res => {
								this.setState({ isLogged: true }, () => this.props.fetchBooks());
						})
						.catch(err => {
								console.log(err.response);

								this.setState({
										duplicationError: (
												<div className="notification is-danger">
														<button
																className="delete"
																onClick={this.handleDeleteNotification}
														>
																{null}
														</button>
														{`Book with ISBN ${this.state.isbn} already exists`}
												</div>
										)
								});
						});
				this.toggle();
		};

		/**
		 * handles deleting of notification from the view
		 */
		handleDeleteNotification = () => {
				// deletes notification from the view
				this.setState({ duplicationError: "" });
		};

		render() {
				const inputClass = ["input"]; // base input class
				return (
						<div>
								{this.state.duplicationError ? this.state.duplicationError : null}
								<Button
										onClick={this.toggle}
										className="newBook"
								>
										Add New Book
								</Button>
								<Modal
										isOpen={this.state.modal}
										toggle={this.toggle}
										className={this.props.className}
								>
										<ModalHeader toggle={this.toggle}>Add New Book</ModalHeader>
										<ModalBody>
												<form onSubmit={this.handleCreateBook}>
														<div className="field">
																<label className="label">Title</label>
																<div className="control has-icons-left has-icons-right">
																		<input
																				required
																				type="text"
																				name="title"
																				className="input is-rounded"
																				value={this.state.title}
																				onChange={this.handleChange}
																		/>
																		<span className="icon is-small is-left">
										<i className="fas fa-book">{null}</i>
									</span>
																</div>
														</div>
														<div className="field">
																<label className="label">ISBN</label>
																<div className="control has-icons-left has-icons-right">
																		<input
																				required
																				type="number"
																				name="isbn"
																				className={`is-rounded ${inputClass.join(" ")}`}
																				value={this.state.isbn}
																				onChange={this.handleChange}
																		/>
																		<span className="icon is-small is-left">
										<i className="fas fa-digital-tachograph">{null}</i>
									</span>
																		{this.state.notifyISBNlength ? (
																				<span className="icon is-small is-right">
											<i className="fas fa-exclamation-triangle">{null}</i>
										</span>
																		) : null}
																</div>
																{this.state.notifyISBNlength}
														</div>
														<ModalFooter>
																<Button color="primary">Create Book</Button>
																<Button
																		color="secondary"
																		onClick={this.toggle}
																>
																		Cancel
																</Button>
														</ModalFooter>
												</form>
										</ModalBody>
								</Modal>
						</div>
				);
		}
}

export default withRouter(NewBookForm);
