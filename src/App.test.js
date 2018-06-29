import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

/** 
 This course is not designed to teach Test Driven Development. 
 Feel free to use this file to test your application, but it 
 is not required.
**/

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})

it('creates error on update() when invalid id is sent', () => {
  BooksAPI.update('blah','blah').then((result) => {
    console.log("result: %O", result);
    result.error ? true : false;
  })
})


