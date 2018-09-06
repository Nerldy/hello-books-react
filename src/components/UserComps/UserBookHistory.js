import React, { Component } from "react";
import API from "../../utils/api";
import titleCase from "title-case";


export const fetchData = () => {
    return API.get("/users/books");
};


class UserBookHistory extends Component {
    static defaultProps = { fetchData };
    state = {
        booksHistory: []
    };

    componentDidMount() {
        // Add Authorization to the header
        API.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem("auth_token");


        this.props.fetchData().then(res => {
            const booksHistory = res.data.books;
            this.setState({ booksHistory });
        });
    }

    render() {
        let booksArchive; //container for books history

        if (this.state.booksHistory) {
            booksArchive = this.state.booksHistory.map(book => (
                <div
                    className="box bookCard"
                    key={book.return_date}>
                    <article>
                        <h3>{titleCase(book.title)}</h3>
                        <p>
                <span>
                    ISBN No:
                </span>
                            {book.isbn}
                        </p>
                        <p>Date Borrowed: {book.borrow_date.split(" ").slice(0, 4).join(" ")}</p>
                        <p>Date Returned: {book.return_date.split(" ").slice(0, 4).join(" ")}</p>
                    </article>
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