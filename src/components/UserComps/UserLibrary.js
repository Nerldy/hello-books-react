import React, {Component} from "react";
import API from "../../utils/api";

class UserLibrary extends Component {
    state = {
        booksHistory: []
    };

    componentDidMount() {
        // Add Authorization to the header
        API.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem("auth_token");

        API.get("books").then(res => {
            const books = res.data.books;
            this.setState({books});
        });
    }

    render() {
        return (
            <div>
                <h2>Borrowed books</h2>
            </div>
        );
    }
}

export default UserLibrary;