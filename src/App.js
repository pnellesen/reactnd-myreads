import React from 'react'
 import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    
    currentReads: []// Array which will store the results of getAll() and search();
  }
  bookshelfList = [
    {id: 'currentlyReading', name:'Currently Reading'},
    {id: 'wantToRead', name:'Want to read'},
    {id: 'read', name:'Read'},
  ]

  componentDidUpdate() {
    console.log("currentReads? %O", this.state.currentReads);
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
      bookToChange.shelf = shelfId;
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
          console.log("bookupdate - newState: %O", this.state.currentReads.map((book) => [book.shelf, book.id]));
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
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
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
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
