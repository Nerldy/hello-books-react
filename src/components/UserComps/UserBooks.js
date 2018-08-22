import React, {Component} from "react";
import API from "../../utils/api";
import BookCard from "../BookCard";

class UserBooks extends Component {

    state = {
        books: [],
        borrowBookId: null
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
        });
    }

    handleBorrowBook = id => {
       /* handles borrowing a book
        it returns the book id*/
        this.setState({borrowBookId: id});
        console.log(`Borrow this book id ${id}`);
    };

    render() {
        let apiBooks; // book card container

        // if books are available return each book details
        if (this.state.books) {
            apiBooks = this.state.books.map(book => {
                return <BookCard
                    key={book.id}
                    title={book.title}
                    isbn={book.isbn}
                    is_borrowed={book.is_borrowed}
                    clickBorrow={() => this.handleBorrowBook(book.id)}/>;
            });
        }
        return (
            <div>
                <h2>Books</h2>

                {/*render each book or show no book*/}
                {apiBooks || <h3>No books</h3>}
            </div>
        );
    }
}

export default UserBooks;
