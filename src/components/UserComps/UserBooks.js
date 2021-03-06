import React, { Component, Fragment } from "react";
import API from "../../utils/api";
import BookCard from "../BookCard";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";
import NewBookForm from "../AdminComps/NewBookForm";


/**
 * GET books via Axios
 * @returns {*}
 */
export const fetchData = () => {
		return API.get("books");
};

/**
 * POST book via Axios
 * @param id
 * @returns {*}
 */
export const postData = id => {
		return API.post(`users/books/${id}`);
};

/**
 * DELETE book via Axios
 * @param id
 * @returns {*}
 */
export const deleteData = id => {
		return API.delete(`books/${id}`);
};

class UserBooks extends Component {
		static defaultProps = { fetchData, postData, deleteData };
		state = {
				books: [],
				borrowBookId: null,
				borrowMessage: ""
		};

		componentDidMount() {
				// Add Authorization to the header
				API.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("auth_token")}`;

				this.fetchBooks();

		}

		/**
		 * fetch books from API
		 */
		fetchBooks = () => {
				this.props
						.fetchData()
						.then(res => {
								const { books } = res.data;
								this.setState({ books });
						})
						.catch(err => {
								// if token has expired redirect user to the login page
								if (err.response.data.message === "Expired token. Please login to get a new token") {
										localStorage.clear();
										return <Redirect to="/login" />;
								}
						});
		};

		/**
		 * sends book id to API to be deleted
		 * @param id
		 */
		handleDeleteBook = id => {
				swal({
						title: "Are you sure you want to delete this book?",
						text: "Once deleted, you will not be able to recover this book from the database",
						icon: "warning",
						buttons: true,
						dangerMode: false
				})
						.then(willDelete => {
								if (willDelete) {
										this.props
												.deleteData(id)
												.then(res => {
														this.setState(currentState => ({
																books: currentState.books.filter(book => book.id !== id)
														}));
														swal("Poof! Book has been deleted!", {
																icon: "success"
														});
												})
												.catch(err => console.log(err.response));
								} else {
										swal("Book is safe!");
								}
						})
						.catch(err => console.log(err.response));
		};

		/**
		 * borrow books by sending id to API
		 * @param id
		 * @param bookTitle
		 */
		handleBorrowBook = (id, bookTitle) => {
				swal({
						title: `Do you want to borrow ${bookTitle}?`,
						text: "This will be added to you library",
						icon: "warning",
						buttons: true,
						dangerMode: false
				})
						.then(willDelete => {
								if (willDelete) {
										this.props
												.postData(id)
												.then(res => {
														this.setState(currentState => ({
																books: currentState.books.filter(book => book.id !== id)
														}));
														swal(`${bookTitle} has now been added to your library`, {
																icon: "success"
														});
												})
												.catch(err => console.log(err.response));
								} else {
										swal(`Didn't borrow ${bookTitle}`);
								}
						})
						.catch(err => {
								this.setState({
										borrowMessage: `The book titled ${bookTitle} does not exist.`
								});
						});
		};

		/**
		 * deletes notification from the view
		 */
		handleDeleteNotification = () => {
				this.setState({ borrowMessage: "" });
		};

		render() {
				let apiBooks; // book card container
				let adminAddNewBookButton;
				let borrowMessage;

				// admin add new book button
				if (localStorage.getItem("is_admin") === "true") {
						adminAddNewBookButton = <NewBookForm fetchBooks={this.fetchBooks} />;
				}

				// if books are available return each book details
				if (this.state.books) {
						apiBooks = this.state.books.map(book => (
								<BookCard
										key={book.id}
										title={book.title}
										isbn={book.isbn}
										is_borrowed={book.is_borrowed}
										clickBorrow={() => this.handleBorrowBook(book.id, book.title)}
										handleDeleteBook={() => this.handleDeleteBook(book.id)}
										bookId={book.id}
								/>
						));
				}

				// if book borrow message is available, show user
				if (this.state.borrowMessage) {
						borrowMessage = (
								<div className="notification is-danger">
										<button
												className="delete"
												onClick={this.handleDeleteNotification}
										>
												{null}
										</button>
										{this.state.borrowMessage}
								</div>
						);
				}
				return (
						<Fragment>
								{/*show borrow message */}
								{borrowMessage}
								<h2>Books</h2>
								{adminAddNewBookButton}
								{/* render each book or show no book */}
								{apiBooks || <h3>No books</h3>}
						</Fragment>
				);
		}
}

export default UserBooks;