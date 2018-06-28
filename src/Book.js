import React from 'react';
import BookshelfChanger from './BookshelfChanger';
import PropTypes from 'prop-types';
const Book = (props) => {
    return (
        props.bookInfo ? (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.bookInfo.imageLinks.thumbnail})` }}></div>
                    <BookshelfChanger bookId={props.bookInfo.id} currentShelf={props.currentShelf} changeShelf={props.changeShelf}/>
                </div>
                <div className="book-title">{props.bookInfo.title}</div>
                <div className="book-authors">{props.bookInfo.authors.join(', ')}</div>
            </div>
        ) : (
            <div>Loading...</div>
        )
        
    )
}

export default Book