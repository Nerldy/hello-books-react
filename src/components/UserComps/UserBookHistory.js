import React, {Component} from "react";
import API from "../../utils/api";
import titleCase from 'title-case'

class UserBookHistory extends Component {
    state = {
        booksHistory: []
    };

    componentDidMount() {
        // Add Authorization to the header
        API.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem("auth_token");


        API.get("/users/books").then(res => {
            console.log(res.data)
            const booksHistory = res.data.books;
            this.setState({booksHistory});
        });
    }

    render() {
        let booksArchive; //container for books history

        if (this.state.booksHistory) {
            booksArchive = this.state.booksHistory.map(book => (
                <div
                    className="bookCard"
                    key={book.return_date}>
                    <h3>{titleCase(book.title)}</h3>
                    <p>
                <span>
                    ISBN No:
                </span>
                        {book.isbn}
                    </p>
                    <p>Date Borrowed: {book.borrow_date.split(" ").slice(0, 4).join(" ")}</p>
                    <p>Date Returned: {book.return_date.split(" ").slice(0, 4).join(" ")}</p>
                </div>
            ));
        }
        return (
            <div>
                <h2>Books history</h2>
                {booksArchive}
            </div>
        );
    }
}

export default UserBookHistory;