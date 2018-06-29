import React, { Component } from 'react';
import PropTypes from 'prop-types';
class BookShelfChanger extends Component {
    state= {
        value: this.props.currentShelf// This will hold the selected option value
    }
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