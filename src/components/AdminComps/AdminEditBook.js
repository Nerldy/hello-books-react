import React, {Component} from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import API from "../../utils/api";
import {withRouter} from "react-router-dom";


class AdminEditBook extends Component {
    state = {
        modal: false,
        notifyISBNlength: null,
        hasTyped: false,
        errorMessage: "",
        isOkay: false,
        showChecker: false,
        isLogged: false
    };

    componentDidMount() {
        // Add Authorization to the header
        API.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem("auth_token");
    }


    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };


    handleEditBook = id => e => {
        // edit book

        e.preventDefault();

        const data = {
            title: this.props.title
        };
        API.put(`books/${id}`, data)
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err.response));
    };


    render() {
        let inputClass = ["input"]; // base input class
        return (
            <div>
                <div onClick={this.toggle}>
                    <i className="fas fa-edit">{null}</i>
                </div>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Edit Book</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.handleEditBook(this.props.bookId)}>
                            <div className="field">
                                <label className="label">Title</label>
                                <div className="control has-icons-left has-icons-right">
                                    <input
                                        required
                                        type="text"
                                        name="title"
                                        className="input is-rounded"
                                        value={this.props.title}
                                        onChange={this.props.changeTitle}/>
                                    <span className="icon is-small is-left">
                               <i className="fas fa-book">{null}</i>
                           </span>
                                </div>
                            </div>
                            <ModalFooter>
                                <Button
                                    color="primary"
                                    type="submit"
                                    onClick={this.toggle}>Save</Button>
                                <Button
                                    color="secondary"
                                    onClick={this.toggle}>Cancel</Button>
                            </ModalFooter>

                        </form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default withRouter(AdminEditBook);