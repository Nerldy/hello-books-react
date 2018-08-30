import React from "react";

const UserHome = props => {

    return (
        <div>
            <h2>Welcome home, {localStorage.getItem('username')}</h2>
        </div>
    );

};

export default UserHome;