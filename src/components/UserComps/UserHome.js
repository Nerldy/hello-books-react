import React from "react";
import NewBookForm from "../AdminComps/NewBookForm";

const UserHome = props => {
    let adminAddNewBookButton;

    if (localStorage.getItem("is_admin") === "true") {
        adminAddNewBookButton = <NewBookForm/>;
    }
    return (
        <div>
            <h2>Welcome home, {localStorage.getItem("username")}</h2>
            {adminAddNewBookButton}

        </div>
    );

};

export default UserHome;