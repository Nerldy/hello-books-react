import React, {Component} from "react";

class SignUp extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        confirm_password: ""
    };

    handleChange = e => {
        // handles form inputs
        this.setState({[e.target.name]: e.target.value});

    };

    handleSubmit = e => {
        //handle form submission
        e.preventDefault();
    };

    render() {
        return (
            <div>
                <h2>Sign Up</h2>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}/>
                    </label>

                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}/>
                    </label>

                    <label>
                        Passoword:
                        <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}/>
                    </label>

                    <label>
                        Repeat Password:
                        <input
                            type="password"
                            name="confirm_password"
                            value={this.state.confirm_password}
                            onChange={this.handleChange}/>
                    </label>

                    <button type="submit">Sign Up</button>


                </form>
            </div>
        );
    }
}

export default SignUp;