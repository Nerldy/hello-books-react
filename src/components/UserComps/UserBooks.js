import React, {Component} from "react";
import API from "../../utils/api";
import BookCard from "../BookCard";
import {Redirect} from "react-router-dom";

class UserBooks extends Component {

    state = {
        books: [],
        borrowBookId: null,
        borrowMessage: ""
    };

    componentDidMount() {
        // Add Authorization to the header
        API.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem("auth_token");

        API.get("books").then(res => {
            // console.log(res.data.books);
            // console.log("eka-ee--ela".repeat(200));
            const books = res.data.books;
            this.setState({books});
        }).catch(err => {
            // if token has expired redirect user to the login page
            if (err.response.data.message === "Expired token. Please login to get a new token") {
                localStorage.clear();
                return <Redirect to={"/login"}/>;
            }
        });
    }

    handleBorrowBook = (id, bookTitle) => {
        /* handles borrowing a book
         it returns the book id*/
        this.setState({
            borrowBookId: id,
            borrowMessage: bookTitle,
            prompter: true
        });
        console.log(`You borrowed ${bookTitle}. `);
    };

    render() {
        let apiBooks; // book card container
        let borrowMessage; // borrow message container

        // if books are available return each book details
        if (this.state.books) {
            apiBooks = this.state.books.map(book => {
                return <BookCard
                    key={book.id}
                    title={book.title}
                    isbn={book.isbn}
                    is_borrowed={book.is_borrowed}
                    clickBorrow={() => this.handleBorrowBook(book.id, book.title)}/>;
            });
        }

        // if book borrow message is available, sho user
        if (this.state.borrowMessage) {
            alert(`You have borrowed the book titled ${this.state.borrowMessage}. It has now
                been added to your library`)
        }
        return (
            <div>
                <h2>Books</h2>
                {borrowMessage}

                {/*render each book or show no book*/}
                {apiBooks || <h3>No books</h3>}
            </div>
        );
    }
}

export default UserBooks;
