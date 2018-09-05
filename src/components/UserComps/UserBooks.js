import React, { Component } from "react";
import API from "../../utils/api";
import BookCard from "../BookCard";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";
import NewBookForm from "../AdminComps/NewBookForm";

// fetch all books
export const fetchData = () => {
    return API.get("books");
};

export const postData = id => {
    return API.post(`users/books/${id}`);
};

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

        this.props.fetchData().then((res) => {
            const { books } = res.data;
            this.setState({ books });
        }).catch((err) => {
            // if token has expired redirect user to the login page
            if (err.response.data.message === "Expired token. Please login to get a new token") {
                localStorage.clear();
                return <Redirect to={"/login"}/>;
            }
        });
    }


    handleDeleteBook = (id) => {
        // handles book deleting
        console.log(`delete book ${id}`);
        swal({
            title: "Are you sure you want to delete this book?",
            text: "Once deleted, you will not be able to recover this book from the database",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    this.props.deleteData(id)
                        .then((res) => {
                            this.setState(currentState => (
                                {
                                    books: currentState.books.filter(book => book.id !== id)
                                }
                            ));
                            swal("Poof! Book has been deleted!", {
                                icon: "success",
                            });
                        }).catch(err => console.log(err.response));
                } else {
                    swal("Book is safe!");
                }
            }).catch(err => console.log(err.response));
    };

    handleBorrowBook = (id, bookTitle) => {
        /* handles borrowing a book
           it returns the book id */

        this.props.postData(id)
            .then((res) => {
                this.setState(currentState => (
                    {
                        books: currentState.books.filter(book => book.id !== id),
                        borrowMessage: `You have borrowed the book titled ${bookTitle}. It has now
                been added to your library`
                    }
                ));
            }).catch((err) => {
            this.setState({
                borrowMessage: `The book titled ${bookTitle} does not exist.`
            });
        });
    };

    render() {
        let apiBooks; // book card container
        let adminAddNewBookButton; // admin add new book button

        if (localStorage.getItem("is_admin") === "true") {
            adminAddNewBookButton = <NewBookForm/>;
        }

        // if books are available return each book details
        if (this.state.books) {
            apiBooks = this.state.books.map(book => <BookCard
                key={book.id}
                title={book.title}
                isbn={book.isbn}
                is_borrowed={book.is_borrowed}
                clickBorrow={() => this.handleBorrowBook(book.id, book.title)}
                handleDeleteBook={() => this.handleDeleteBook(book.id)}
                bookId={book.id}/>);
        }

        // if book borrow message is available, show user
        if (this.state.borrowMessage) {
            alert(`${this.state.borrowMessage}`);
        }
        return (
            <div>
                <h2>Books</h2>

                {adminAddNewBookButton}

                {/* render each book or show no book */}
                {apiBooks || <h3>No books</h3>}
            </div>
        );
    }
}

export default UserBooks;
