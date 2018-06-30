import React, { Component } from 'react';
import PropTypes from 'prop-types';
class BookShelfChanger extends Component {

	 /**
    * @description This will hold the selected  shelf for the book this component is bound to.
    * Initial value is set from a prop.
    */
    state= {
        value: this.props.currentShelf
    }

	/**
    * @description change the bookshelf assigned to a book when the user selects an option.
    * Set the state 'value' to the option selected by the user, then set the shelf for the book
    * in the changeShelf() function (sent as a prop)
    *
    * @param {SyntheticEvent} e
    */
    change = (e) => {
        e.preventDefault();
        this.setState({value: e.target.value});
        this.props.changeShelf(this.props.bookId, e.target.value);
    }
    
	render() {
        return (
            <div className="book-shelf-changer">
                <select id={this.props.bookId} onChange={this.change} value={this.state.value}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
}
export default BookShelfChanger;

BookShelfChanger.PropTypes = {
    currentShelf: PropTypes.string.isRequired,
    changeShelf: PropTypes.func.isRequired,
    bookId: PropTypes.string.isRequired
}