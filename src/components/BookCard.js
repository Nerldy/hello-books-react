import React, {Fragment} from "react";

// renders single book
const BookCard = props => {

    return (
        <Fragment>
            <div className="bookCard">
                <h3>{props.title}</h3>
                <p>
                <span>
                    ISBN No:
                </span>
                    {props.isbn}
                </p>
            </div>

        </Fragment>
    );
};

export default BookCard;