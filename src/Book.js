import React from 'react';
import BookshelfChanger from './BookshelfChanger';
import PropTypes from 'prop-types';
const Book = (props) => {
    return (
        props.bookInfo ? (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.bookInfo.imageLinks ? props.bookInfo.imageLinks.thumbnail : ''})` }}></div>
                    <BookshelfChanger bookId={props.bookInfo.id} currentShelf={props.currentShelf} changeShelf={props.changeShelf}/>
                </div>
                <div className="book-title">{props.bookInfo.title}</div>
                {props.bookInfo.authors ? (
                    <div className="book-authors">{props.bookInfo.authors.join(', ')}</div>
                ) : (
                    <div className="book-authors">{props.bookInfo.publisher}</div>
                )}
                
            </div>
        ) : (
            <div>Loading...</div>
        )
        
    )
}

export default Book

Book.PropTypes = {
    bookInfo: PropTypes.object,
    currentShelf: PropTypes.string.isRequired,
    changeShelf: PropTypes.string.isRequired
}