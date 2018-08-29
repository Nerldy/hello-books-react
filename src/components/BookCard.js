import React, {Fragment} from "react";

// renders single book
const BookCard = props => {

    let booksNotBorrowed;

    if (!props.is_borrowed) {
        // check for books not borrowed
        booksNotBorrowed = (
            <div className="bookCard">
                <h3>{props.title}</h3>
                <p>
                <span>
                    ISBN No:
                </span>
                    {props.isbn}
                </p>

                <footer>
                    <a onClick={props.clickBorrow} className="button">Borrow this book</a>
                </footer>
            </div>
        );
    }

    return (
        <Fragment>
            {booksNotBorrowed}
        </Fragment>
    );
};

export default BookCard;