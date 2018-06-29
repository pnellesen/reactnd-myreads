import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';
const Bookshelf = (props) => {
  return (
    <div className="bookshelf">
    <h2 className="bookshelf-title">{props.shelfName}</h2>
    <div className="bookshelf-books">
      {(props.bookList && props.bookList.length > 0) ? (
        <ol className="books-grid">
          {props.bookList.map((book) => (
          <li key={book.id}>
            <Book bookInfo={book} currentShelf={props.id} changeShelf={props.changeShelf}/>
          </li>  
          ))}
        </ol>
      ): (
        <div>Loading...</div>
      )}
    </div>
  </div>
  )
}

export default Bookshelf;

Bookshelf.PropTypes = {
  shelfName: PropTypes.string.isRequired,
  bookList: PropTypes.array
}