import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import PropTypes from 'prop-types';
class BookSearch extends Component {
    state = {
        value: this.props.searchVal
    }
    timeout = null;

    /**
     * Don't send query to search backend on every keystroke,
     * wait until it's been .5s since last keyUp, then do the query,
     * assuming user is done typing. Do search immediately if they hit the Enter key
     */
    _keyUp = (evt) => {
        if (evt.key === 'Enter') {
            this.props.onUpdate(this.state.value);
        } else {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.props.onUpdate(this.state.value);
            }, 500);
        }

    }

    _onChange = (evt) => {
        //evt.persist();
        this.setState({value: evt.target.value});
    }

    render() {
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link className={'close-search'} to={'/'}>Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" value={this.state.value} onChange={this._onChange} onKeyUp={this._keyUp} placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {
                    this.props.searchResults.error ? 
                        <li>No books found</li>
                     : 
                        this.props.searchResults.map((book) => {
                            let currentShelf = 'none'
                            const currentBook = this.props.currentReads.find((currBook) => currBook.id === book.id);
                            if (currentBook) {
                                currentShelf = currentBook.shelf;
                            }
                            return <li key={book.id}><Book bookInfo={book} currentShelf={currentShelf} changeShelf={this.props.changeShelf}/></li>
                            }
                        )
                }
              </ol>
            </div>
          </div>
        )
    }
}
export default BookSearch

BookSearch.PropTypes = {
    searchVal: PropTypes.string,
    onUpdate: PropTypes.func.isRequired,
    searchResults: PropTypes.any.isRequired,
    currentReads: PropTypes.array.isRequired,
    changeShelf: PropTypes.string.isRequired
}