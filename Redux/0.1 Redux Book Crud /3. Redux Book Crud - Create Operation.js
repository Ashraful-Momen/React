#Redux Book Crud - Create Operation: 
-------------------------------



============================================================ src > components > BookSlice ================================================
import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    books: [
        {
            id: 1, 
            title: 'The Alchemist',
            author: 'Paulo Coelho',
            price: 10,
            quantity: 1
        },
         {
            id: 2, 
            title: 'The Name Of Jungle',
            author: 'Momen',
            price: 20,
            quantity: 1
        },
        {
            id: 3, 
            title: 'Life of Pi',
            author: 'Yann Martel',
            price: 30,
            quantity: 1
        },
    ],
}


export const bookSlice = createSlice({

    name: 'book',

    initialState: initialState,



    reducers: {
        deleteBook: (state, action) => {
            const {id} = action.payload;
            state.books = state.books.filter((book) => book.id !== id);
        },

        addBook:(state,action) => {

            const newbook = action.payload;
            
            state.books.push(newbook);

        }
    },
});

export const { deleteBook, addBook } = bookSlice.actions;

export default bookSlice.reducer;
============================================================ src > app > Store.js ================================================

import { configureStore } from '@reduxjs/toolkit'; 
import BookSlice  from '../features/bookSlice';

export const store = configureStore({

    reducer: {
        bookR: BookSlice,
    },
});



============================================================ src > main.jsx ================================================
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'


//custom import : _____________________________-
import 'bootstrap/dist/css/bootstrap.min.css'
import { store } from './app/store'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)


============================================================ src > App.jsx ================================================
import React from 'react'


import BookList from './components/BookList'
import BookForm from './components/BookForm'


const App = () => {
  return (
    <div className='row'>
      <BookForm />
      <BookList />
    </div>
  )
}

export default App

================================================== src > component > BookList ======================================================
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteBook } from "../features/bookSlice";

const BookList = () => {

  //fetch all state from store
  const books = useSelector((state) => state.bookR.books);

  //for the dispatch : 
  const dispatch = useDispatch(); 

  //delete method : 
  const handleDelete = (id) => {
    dispatch(deleteBook({id}));
  }


  return (
    <div>
      <div className="row">
        <h2 className="text-center">List of Books</h2>
        <hr />
        {books && books.length > 0 ? (
          <ul>
            {books.map((book) => {
              return (
                <li key={book.id} className="row text-center">
                  <h3>
                    {book.title} - <span>{book.author}</span>
                  </h3>
                  <p>
                    Price: {book.price} Tk - Quantity: {book.quantity}
                  </p>
                  <div className="col">
                    <button onClick={() => handleDelete(book.id)} className="btn btn-sm btn-danger col-md-2 text-center">
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <h3 className="text-center">No Books Found</h3>
        )}
      </div>
    </div>
  );
};

export default BookList;


===================================================================== src > components > BookForm ==========================================================

import React, { useState } from "react";

import { addBook } from "../features/bookSlice";
import { useDispatch } from "react-redux";


const BookForm = () => {

  //initialazed the state of book state:
  const [book, setBook] = useState({
    title: "",
    author: "",
    price: "",
    quantity: "",
  });

  
  //send value to reducer : dispatch 
  const dispatch = useDispatch(); 

  //set the book to the state 
  const handleChange = (event) => {

    const {name, value} = event.target; 

    setBook((prevBook)=>({...prevBook,[name]:value}));
    // console.log(name,value)

  }


  //dispatch the book to the reducer.action
  const handleSubmit = (event) => {
    event.preventDefault();

      // Generate a random number for the ID
      const randomId = Math.floor(Math.random() * 1000000); // Generates a random number between 0 and 999999

      // Create a new book object with the random ID
      const newBook = { ...book, id: randomId };


        // console.log(newBook);
      dispatch(addBook(newBook));  

  }



  return (
    <div className="text-center m-3">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={book.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <br />
        <input
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
          placeholder="Author"
          required
        />
        <br />
        <input
          type="number"
          name="price"
          value={book.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <br />
        <input
          type="number"
          name="quantity"
          value={book.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          required
        />
        <br />
        <button type="submit" className="btn btn-sm btn-primary my-2" > Submit</button>
      </form>
    </div>
  );
};

export default BookForm;
