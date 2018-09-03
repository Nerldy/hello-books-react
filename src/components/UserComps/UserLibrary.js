import React, {Component} from "react";
import API from "../../utils/api";
import swal from "sweetalert";
import titleCase from 'title-case'

class UserLibrary extends Component {
    state = {
        borrowedBooks: [],
        borrowMessage: null,
        pageNum: 1,
        has_next: false,
        has_prev: false
    };

    componentDidMount() {

        // Add Authorization to the header
        API.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem("auth_token");

        // fetch books from the API
        this.fetchBooks();
    }

    fetchBooks = () => {
        API.get(`/users/books?limit=3&page=${this.state.pageNum}&returned=false`)
            .then(res => {
                const borrowedBooks = res.data.books;
                this.setState({
                    borrowedBooks,
                    has_next: res.data.has_next,
                    has_prev: res.data.has_prev
                });
            }).catch(err => console.log(err.response));
    };

    handleNextPage = () => {
        // goes to next page
        this.setState(currentState => currentState.pageNum++, () => this.fetchBooks());

    };

    handlePrevPage = () => {
        // goes to prev page
        this.setState(currentState => currentState.pageNum--, () => this.fetchBooks());
    };

    handleReturnBook = (id, bookTitle) => {
        // first notify user if they want to return the book
        swal({
            title: `Are you sure you want to return ${bookTitle}?`,
            icon: "warning",
            buttons: true,
            dangerMode: true
        })
            .then(willReturn => {
                if (willReturn) {
                    API.put(`users/books/${id}`)
                        .then(res => {
                            // return borrowed books
                            this.setState(currentState => ({
                                borrowedBooks: currentState.borrowedBooks.filter(book => book.id !== id)
                            }));

                            swal(`You returned ${bookTitle}`, {
                                icon: "success",
                            });
                        });
                } else {
                    swal(`${bookTitle} was not returned!`);
                }
            });


    };

    render() {
        let booksNotReturned; // container for books yet to be returned

        if (this.state.borrowedBooks) {
            booksNotReturned = this.state.borrowedBooks.map(book => (
                <div
                    className="bookCard"
                    key={book.id}>
                    <h3>{titleCase(book.title)}</h3>
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

        return (
            <div>
                <h2>Borrowed books</h2>

                {booksNotReturned || <h3>No books currently borrowed</h3>}
                {this.state.has_next ? <p onClick={this.handleNextPage}>Next</p> : null}
                {this.state.has_prev ? <p onClick={this.handlePrevPage}>Prev</p> : null}
            </div>
        );
    }
}

export default UserLibrary;