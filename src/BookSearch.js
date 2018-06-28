import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import PropTypes from 'prop-types';
class BookSearch extends Component {
    state = {
        value: this.props.searchVal
    }

    timeout = null;

    _keyUp = (evt) => {
        clearTimeout(this.timeout);
        // Make a new timeout set to go off in 800ms
        this.timeout = setTimeout(() => {
            console.log("keyUp delay - value: " + this.state.value);
            this.props.onUpdate(this.state.value);
            
        }, 1000);

    }
    _onChange = (evt) => {
        evt.persist();
        this.setState({value: evt.target.value});
    }

    render() {
        console.log("BookSearch props: %O", this.props);
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
                {/*
                    This will hold the books that are returned from the book search. 
                    will be a series of <li><Book .../></li> elements.
                    If a book is already on a bookshelf, we may want to indicate that somehow
                    other than simply by letting the BookshelfChanger in the <Book> show the right
                    option in the dropdown.
                */}
              </ol>
            </div>
          </div>
        )
    }
}
export default BookSearch