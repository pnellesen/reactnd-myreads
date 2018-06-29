import React from 'react'
import { Link, Route } from 'react-router-dom'
 import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf';
import BookSearch from './BookSearch';

class BooksApp extends React.Component {
  state = {
    currentReads: [],// Array which will store the results of getAll() and search();
    searchVal: '',
    searchResults: []// value in the <BookSearch> component. Pass as a prop since <BookSearch> is re-rendered when Route changes
  }
  bookshelfList = [
    {id: 'currentlyReading', name:'Currently Reading'},
    {id: 'wantToRead', name:'Want to read'},
    {id: 'read', name:'Read'},
  ]

  componentDidUpdate() {
    console.log("currentReads? %O", this.state.currentReads);
    console.log("search results? %O", this.state.searchResults);
  }

  updateSearchVal = (newVal) => {
    
    this.setState({searchVal: newVal}, () => newVal.length > 0 ? (
      BooksAPI.search(this.state.searchVal).then((result) => {
        this.setState({searchResults: result})
      })
     ) : (
      this.setState({searchResults: []})
     )
    );
    
  }

  getCurrentReads() {
    BooksAPI.getAll().then((result) => {
      this.setState({
        currentReads: result
      })
    })
  }

  changeBookshelf = (bookId, shelfId) =>  {
    // first update our state, then update the backend. Much better performance on front end
    this.setState((prevState) => {
      let bookToChange = prevState.currentReads.find((book) => book.id === bookId)
      if (bookToChange) {
        bookToChange.shelf = shelfId
      } else {
        let newBook = prevState.searchResults.find((book) => book.id === bookId)
        newBook.shelf = shelfId
        {currentReads : prevState.currentReads.push(newBook)}
      }
      
    }, () => {
      try {
        const bookObj = {id: bookId}
        BooksAPI.update(bookObj, shelfId).then((result) => {
          /**
           * TODO: compare ids in the result shelves with the ids in our 
           * new state. If they're different, it probably means nothing was actually updated
           * reset state back to prevState and show user an error message?
           */
          console.log(`bookupdate - result for book id ${bookId}: %O`, result);
        });
      } catch(err) {
        /**
           * TODO: maybe some error handling to let user know 
           * backend hasn't been updated even though UI has?
           * I'd rather do the state update first since it's (almost) instanteneous
           * from a UI perspectve, but if update fails, I want to reset the state in a user friendly way
           * 
           */
          console.log("book update error: %O", err);
      }
      
    })

  }

  componentDidMount() {
    this.getCurrentReads()
  }

  render() {
    
    return (
      <div className="app">
        <Route path='/search' render={() =>  (
          <BookSearch
            searchVal={this.state.searchVal}
            onUpdate={this.updateSearchVal}
            searchResults={this.state.searchResults}
            changeShelf={this.changeBookshelf}
            currentReads={this.state.currentReads}
          />
        )}/>
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {this.bookshelfList.map((bookshelf) => 
                  (
                    <Bookshelf
                      key={bookshelf.id}
                      shelfName={bookshelf.name}
                      id={bookshelf.id}
                      bookList={this.state.currentReads.filter((booklist) => (bookshelf.id === booklist.shelf))}
                      changeShelf={this.changeBookshelf}
                    />
                  )
                )}
              </div>
            </div>
            <div className="open-search">
                <Link to={'/search'}>Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
