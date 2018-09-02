import React, {Fragment, Component} from "react";
import AdminEditBook from "./AdminComps/AdminEditBook";

// renders single book card
class BookCard extends Component {
    state = {
        title: this.props.title
    };

    onChangeTitle = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    componentWillReceiveProps(props) {
        this.setState(props);
    }

    render() {
        let adminButtons;

        if (localStorage.getItem("is_admin") === "true") {
            adminButtons = (
                <div>
                    <AdminEditBook
                        title={this.state.title}
                        bookId={this.props.bookId}
                        changeTitle={this.onChangeTitle}/>
                    <div onClick={this.props.handleDeleteBook}>
                        <i className="fas fa-trash-alt">{null}</i>
                    </div>
                </div>
            );
        }

        let booksNotBorrowed;

        if (!this.props.is_borrowed) {
            // check for books not borrowed
            booksNotBorrowed = (
                <div className="bookCard">
                    <h3>{this.props.title}</h3>
                    <p>
                <span>
                    ISBN No:
                </span>
                        {this.props.isbn}
                    </p>

                    <footer>
                        <a
                            onClick={this.props.clickBorrow}
                            className="button">Borrow this book</a>
                        {adminButtons}
                    </footer>
                </div>
            );
        }

        return (
            <Fragment>
                {booksNotBorrowed}
            </Fragment>
        );
    }
}

export default BookCard;