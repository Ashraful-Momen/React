# Redux Book CRUD - Update Operation Flow

## 🔄 Complete Update Process ASCII Diagram

```
                          REDUX BOOK CRUD - UPDATE OPERATION FLOW
                     ═════════════════════════════════════════════════════════

STEP 1: USER CLICKS EDIT BUTTON
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                                  BOOKLIST.JSX                                      │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │  📚 Books Display                                                           │   │
│  │                                                                             │   │
│  │  Book: "The Alchemist"  [Edit] [Delete]  ◄── USER CLICKS HERE             │   │
│  │                                          │                                  │   │
│  │  const handleEdit = (book) => {          │                                  │   │
│  │    onHandleEdit(book); ◄─────────────────┘                                  │   │
│  │  }                                                                          │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────────┘
                                           │
                                           │ PASS 'book' OBJECT
                                           ▼
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                                    APP.JSX                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │  📝 Parent Component State Management                                       │   │
│  │                                                                             │   │
│  │  const [bookToEdit, setBookToEdit] = useState(null);                       │   │
│  │                                                                             │   │
│  │  const handleEdit = (book) => {                                            │   │
│  │    setBookToEdit(book); ◄── RECEIVES book FROM BookList                    │   │
│  │  };                                                                         │   │
│  │                                                                             │   │
│  │  ┌─────────────────┐    ┌───────────────────────────────────────────────┐  │   │
│  │  │ <BookForm       │    │ <BookList                                     │  │   │
│  │  │   bookToEdit={  │    │   onHandleEdit={handleEdit}                   │  │   │
│  │  │   bookToEdit}   │    │ />                                            │  │   │
│  │  │   handleCancel  │    │                                               │  │   │
│  │  │   Edit={handle  │    │                                               │  │   │
│  │  │   CancelEdit}   │    │                                               │  │   │
│  │  │ />              │    │                                               │  │   │
│  │  └─────────────────┘    └───────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────────┘
                                           │
                                           │ PASS bookToEdit AS PROP
                                           ▼

STEP 2: BOOKFORM RECEIVES bookToEdit PROP
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                                  BOOKFORM.JSX                                      │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │  🎨 Form Component - useEffect Hook                                         │   │
│  │                                                                             │   │
│  │  const BookForm = ({bookToEdit, handleCancelEdit}) => {                    │   │
│  │                                                                             │   │
│  │    const [book, setBook] = useState({                                       │   │
│  │      title: "",                                                             │   │
│  │      author: "",                                                            │   │
│  │      price: "",                                                             │   │
│  │      quantity: "",                                                          │   │
│  │    });                                                                      │   │
│  │                                                                             │   │
│  │    useEffect(() => {                                                        │   │
│  │      if(bookToEdit) {                                                       │   │
│  │        setBook(bookToEdit); ◄── POPULATE FORM WITH BOOK DATA               │   │
│  │      }                                                                      │   │
│  │    }, [bookToEdit]);                                                        │   │
│  │                                                                             │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────────┘

STEP 3: FORM GETS POPULATED & USER CAN EDIT
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              FORM STATE CHANGE                                     │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │  📝 Form Fields Now Show Book Data                                          │   │
│  │                                                                             │   │
│  │  ┌─────────────────────────┐  bookToEdit = {                               │   │
│  │  │ Title: [The Alchemist ] │    id: 1,                                     │   │
│  │  │ Author: [Paulo Coelho ] │    title: "The Alchemist",                    │   │
│  │  │ Price: [10            ] │    author: "Paulo Coelho",                    │   │
│  │  │ Quantity: [1          ] │    price: 10,                                 │   │
│  │  │                         │    quantity: 1                                │   │
│  │  │ [Update Book] [Cancel]  │  }                                            │   │
│  │  └─────────────────────────┘                                               │   │
│  │                                                                             │   │
│  │  setBook(bookToEdit) ◄── useEffect TRIGGERS THIS                           │   │
│  │                                                                             │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────────┘

STEP 4A: USER SUBMITS FORM (UPDATE)
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                               FORM SUBMISSION                                      │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │  const handleSubmit = (event) => {                                          │   │
│  │    event.preventDefault();                                                  │   │
│  │                                                                             │   │
│  │    if(bookToEdit) {                                                         │   │
│  │      const updatedBook = { ...book, id: bookToEdit.id };                   │   │
│  │      dispatch(updateBook(updatedBook)); ◄── DISPATCH TO REDUX              │   │
│  │      handleCancelEdit(); ◄── CLEAR EDIT STATE                              │   │
│  │    }                                                                        │   │
│  │  }                                                                          │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────────┘
                                           │
                                           │ DISPATCH ACTION
                                           ▼
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                                REDUX STORE                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │  🔄 bookSlice.js - updateBook Reducer                                       │   │
│  │                                                                             │   │
│  │  updateBook: (state, action) => {                                          │   │
│  │    const updatedBook = action.payload;                                     │   │
│  │    const index = state.books.findIndex(                                    │   │
│  │      (book) => book.id === updatedBook.id                                  │   │
│  │    );                                                                       │   │
│  │    if (index !== -1) {                                                     │   │
│  │      state.books[index] = updatedBook; ◄── UPDATE BOOK IN ARRAY            │   │
│  │    }                                                                        │   │
│  │  }                                                                          │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────────┘
                                           │
                                           │ STATE UPDATED
                                           ▼
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                             UI RE-RENDERS                                          │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │  📱 BookList useSelector Hook                                               │   │
│  │                                                                             │   │
│  │  const books = useSelector((state) => state.bookR.books);                  │   │
│  │                        │                                                    │   │
│  │                        ▼                                                    │   │
│  │  [UPDATED BOOK DATA DISPLAYED IN LIST]                                     │   │
│  │                                                                             │   │
│  │  📝 BookForm State Reset                                                    │   │
│  │                                                                             │   │
│  │  bookToEdit = null (from handleCancelEdit)                                 │   │
│  │  form fields cleared                                                        │   │
│  │  "Add Book" button shown instead of "Update Book"                          │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────────┘

STEP 4B: USER CLICKS CANCEL BUTTON
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                                CANCEL FLOW                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │  👆 USER CLICKS CANCEL                                                      │   │
│  │                                                                             │   │
│  │  <button onClick={handleCancelEdit}>Cancel</button>                        │   │
│  │                    │                                                        │   │
│  │                    ▼                                                        │   │
│  │  handleCancelEdit() ◄── FROM APP.JSX PROP                                  │   │
│  │                    │                                                        │   │
│  │                    ▼                                                        │   │
│  │  setBookToEdit(null) ◄── CLEARS EDIT STATE IN APP.JSX                      │   │
│  │                    │                                                        │   │
│  │                    ▼                                                        │   │
│  │  useEffect triggers with bookToEdit = null                                 │   │
│  │  Form resets to empty state                                                │   │
│  │  "Add Book" button shows instead of "Update Book"                          │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow Summary

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ BookList    │    │ App.jsx     │    │ BookForm    │    │ Redux       │
│             │    │             │    │             │    │ Store       │
│ Edit Click  │───▶│ handleEdit  │───▶│ useEffect   │───▶│ updateBook  │
│             │    │ setBookTo   │    │ setBook()   │    │ reducer     │
│             │    │ Edit()      │    │             │    │             │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       ▲                   ▲                   │                   │
       │                   │                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ UI Updates  │    │ State Reset │    │ Form Submit │    │ State       │
│ with new    │◀───│ bookToEdit  │◀───│ or Cancel   │◀───│ Updated     │
│ book data   │    │ = null      │    │             │    │             │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

## 🎯 Key Points:

1. **Parent-Child Communication**: `onHandleEdit` prop passes data UP from BookList to App
2. **State Management**: App.jsx manages `bookToEdit` state and passes DOWN to BookForm  
3. **useEffect Hook**: Triggers when `bookToEdit` changes, populating form fields
4. **ID Preservation**: Update operation keeps original book's ID
5. **State Reset**: After update or cancel, form returns to "Add" mode
6. **Redux Flow**: `useSelector` triggers re-render when store updates



----------------------------------------------------------------explanation of working flow --------------------------------------------------------------------------------------
#Redux Book Crud - Create Operation: 
-------------------------------

1 => from App.jsx => Receive 'book' params from BookList by handle Edit Function 

2 => Set the State to pass value to Book Form 

3. BookForm => useEffect if {bookToEdit value change }

----------------------------------------------------------
for the change button : 

4. App.jsx => handleCancelEdit pass to BookForm Component. 

=================================================== Details Explation of the Update Process ==========================
    **** parent to child component if pass any function then directly pass valo from child to Parent function. 

    #App.js => 
    ------------
    
    const handleEdit = (book) => {console.log(book)}; 
    
    <BookList onHandleEdit={handleEdit}>
    
    #BookList =>  **** Directly pass the 'book' to the App.js function
    ---------------
  
    
    const BookList = ({onHandleEdit}) => {
    
      //edit method : 
      const handleEdit = (book) => {
        // console.log(book); 
        onHandleEdit(book); //send value to the App.js function directly
      }
      
     #App.js => update the state setBookEdit by useState() and send the 'book' to <BookForm >
     ----------
        //pass value to the BookForm Component :
        const [bookToEdit, setBookToEdit] = useState(null);
        
         const handleEdit = (book) => {
                    // console.log("app edit",book);
                    setBookToEdit(book);
                  };
     
        <BookForm bookToEdit={bookToEdit} />
    
     #<BookForm> : After Receiving the book then use useEffect hook , 
     
         //***For edit part use this function => if bookToEdit is not null useEffect=> 
         useEffect(() => {
                          if(bookToEdit){
                            setBook(bookToEdit);
                          }
                          
                        },[bookToEdit]);
                        
        //initialazed the state of book state:
                  const [book, setBook] = useState({
                    title: "",
                    author: "",
                    price: "",
                    quantity: "",
                  });

#====================
#Main Part From Here:
#====================

================================================  BookSlice ================================================
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
