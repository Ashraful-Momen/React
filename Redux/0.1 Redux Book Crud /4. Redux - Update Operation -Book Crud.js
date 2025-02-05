#Redux Book Crud - Create Operation: 
-------------------------------

1 => from App.jsx => Receive 'book' params from BookList by handle Edit Function 

2 => Set the State to pass value to Book Form 

3. BookForm => useEffect if {bookToEdit value change }

----------------------------------------------------------
for the change button : 

4. App.jsx => handleCancelEdit pass to BookForm Component. 


============================================================ BookSlice ================================================
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
============================================================ app / Store.js ================================================

import { configureStore } from '@reduxjs/toolkit'; 
import BookSlice  from '../features/bookSlice';

export const store = configureStore({

    reducer: {
        bookR: BookSlice,
    },
});



============================================================ main.jsx ================================================
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


============================================================ App.jsx ================================================
import React, { useState } from "react";

import BookList from "./components/BookList";
import BookForm from "./components/BookForm";

const App = () => {

  //pass value to the BookForm Component :
  const [bookToEdit, setBookToEdit] = useState(null);



  //receive book form the BookList Component :
  const handleEdit = (book) => {
    // console.log("app edit",book);
    setBookToEdit(book);
    console.log(bookToEdit);
  };


  //cancecl method : then set the bookToEdit to null : 
  const handleCancelEdit = () => {
    setBookToEdit(null);
  }

  return (
    <div className="row">
      <BookForm bookToEdit={bookToEdit} />
      <BookList onHandleEdit={handleEdit} onHandleCancelEdit={handleCancelEdit} />
    </div>
  );
};

export default App;


================================================== BookList ======================================================
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteBook } from "../features/bookSlice";

const BookList = ({onHandleEdit}) => {

  //fetch all state from store
  const books = useSelector((state) => state.bookR.books);

  //for the dispatch : 
  const dispatch = useDispatch(); 

  //delete method : 
  const handleDelete = (id) => {
    dispatch(deleteBook({id}));
  }

  //edit method : 
  const handleEdit = (book) => {
    // console.log(book); 
    onHandleEdit(book);
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
                    <button onClick={() => handleEdit(book)} className="btn btn-sm btn-danger col-md-2 text-center">
                      Edit
                    </button>
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


===================================================================== BookForm ==========================================================

import React, { useEffect, useState } from "react";

import { addBook } from "../features/bookSlice";
import { useDispatch } from "react-redux";


const BookForm = ({bookToEdit, handleCancelEdit}) => {

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
      // dispatch(addBook(newBook)); 


      //if bookToEdit then dispatch update book else dispatch add book :
      if(bookToEdit){
        dispatch(addBook(newBook));
        handleCancelEdit();
      }
      else{

        // console.log(newBook);
      dispatch(addBook(newBook));  
      }

      //after submit set the book to empty : 
      setBook({
        title: "",
        author: "",
        price: "",
        quantity: "",
      });



  }


  //For edit part use this function => if bookToEdit is not null useEffect=> 
    useEffect(() => {
      if(bookToEdit){
        setBook(bookToEdit);
      }
      
    },[bookToEdit]);



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
        <button type="submit" className="btn btn-sm btn-primary my-2" > {bookToEdit ? "Update Book" : "Add Book"}</button>
        
        <button type="submit" className="btn btn-sm btn-primary my-2" onClick={onCancel} > Cancel </button>
      </form>
    </div>
  );
};

export default BookForm;
