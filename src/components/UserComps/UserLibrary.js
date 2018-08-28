import React, {Component} from "react";
import API from "../../utils/api";

class UserLibrary extends Component {
    state = {
        borrowedBooks: [],
        borrowMessage: null
    };

    componentDidMount() {

        // Add Authorization to the header
        API.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem("auth_token");

        // TODO: check how todo url params
        API.get(`/users/books?limit=3&page=1&returned=false`)
            .then(res => {
                console.log(res.data);
                const borrowedBooks = res.data.books;
                this.setState({
                    borrowedBooks
                });
            });
    }

    handleReturnBook = (id, bookTitle) => {

        API.put(`users/books/${id}`)
            .then(res => {
                this.setState(currentState => ({
                    borrowedBooks: currentState.borrowedBooks.filter(book => book.id !== id),
                    borrowMessage: `You have returned the book titled ${bookTitle}.`
                }));
            });

    };

    render() {
        let booksNotReturned; // container for books yet to be returned

        if (this.state.borrowedBooks) {
            booksNotReturned = this.state.borrowedBooks.map(book => (
                <div
                    className="bookCard"
                    key={book.id}>
                    <h3>{book.title}</h3>
                    <p>
                <span>
                    ISBN No:
                </span>
                        {book.isbn}
                    </p>

                    <footer>
                        <a
                            className="button"
                            onClick={() => this.handleReturnBook(book.id, book.title)}>Return this book</a>
                    </footer>
                </div>
            ));
        }

        // if book borrow message is available, sho user
        if (this.state.borrowMessage) {
            alert(`${this.state.borrowMessage}`);
        }

        return (
            <div>
                <h2>Borrowed books</h2>

                {booksNotReturned || <h3>No books currently borrowed</h3>}
                <p>Next</p>
            </div>
        );
    }
}

export default UserLibrary;