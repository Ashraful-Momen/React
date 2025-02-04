#Redux - Toolkit : 
-------------------
#install react redux toolkit: 
---------------------------------
>>> npm install redux/toolkit react-redux

#after install check the package.json for the the redux version . 

#Slice : According to the React => "Collection of Logics is the Slice". 

/src

    /----------------app
                        /---------------------store.js [create the store]
                        
    /----------------features
                            /-----------------counter
                                                    /counterSlice.js [write all the counter logic: Reducer]
                                                    /CounterView.js
                            /-----------------post
                                                    /postSlice.js [write all the post logic: extraReducer:thunk]
                                                    /PostView.js
    
    

================================================================
1. postSlice.js => 
----------------------
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk function: Fetch data from an external API using async/await.
// This thunk action creator uses `createAsyncThunk` from Redux Toolkit.
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return res.data;
});

const postSlice = createSlice({

  name: "posts",

  initialState: {
    posts: [],
    isLoading: false,
    error: null,
  },

  // Thunk function: Extra reducers are used to handle asynchronous API response operations (thunk).
  // These reducers manage the state changes for different promise states (pending, fulfilled, rejected).
  extraReducers: (builder) => {
    // Use the builder method to handle promise states (pending, fulfilled, rejected):

    // Case: When the fetchPosts thunk is pending (request is in progress)
    builder.addCase(fetchPosts.pending, (state) => {
      state.isLoading = true; // Set loading state to true
    });

    // Case: When the fetchPosts thunk is fulfilled (request is successful)
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.isLoading = false; // Set loading state to false
      state.posts = action.payload; // Update state with the fetched data
      state.error = null; // Clear any previous errors
    });

    // Case: When the fetchPosts thunk is rejected (request fails)
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.isLoading = false; // Set loading state to false
      state.posts = []; // Clear posts data
      state.error = action.error.message; // Set error message from the rejected action
    });
  },
});

export default postSlice.reducer;


========================================================================================
#store.js=> 
-----------
import { configureStore } from "@reduxjs/toolkit";


// custom import : _____________________________________________
// import counterSlice from "../features/counter/counterSlice";
// change the name 'counterSlice' to 'counterReducer', cause we export as default


import counterReducer from "../features/counter/counterSlice";
import postSlice from "../features/posts/postSlice";

const store = configureStore({
    reducer: {
        counter: counterReducer, 
        posts  :   postSlice, 
    },
});

export default store;

=====================================================================================
#index.js => 
------------------
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';

//custom import: _________________________________________
import store from './app/store';



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
=====================================================================================
#App.js => 
------------
import "./App.css";
import CounterView from "./features/counter/CounterView";
import PostView from "./features/posts/PostView";

function App() {
 


  return (
    <div className="App">
     

      <h3>Counter App</h3>

      <CounterView />
      <PostView />
     
    
    </div>
  );
}

export default App;
  
=====================================================================================
#PostView.js => 
-----------------
import React, { useEffect } from 'react'
import { use } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {fetchPosts} from '../posts/postSlice';

const PostView = () => {

    //fetch data from postSlice.state
    // const posts = useSelector((state) => console.log(state));
    const {isLoading,posts,error} = useSelector((state) => state.posts);


    //for dispatching actions
    const dispatch = useDispatch();

    //call the fetchPost thunk
    useEffect(() => {
       dispatch(fetchPosts());
    })
  return (
    <div>
        {isLoading && <h2>Loading...</h2>}
        {error && <h2>{error}</h2>}
        {posts && posts.map((post) => {
            return (
                <div  key={post.id}>
                    <b>{post.title}</b>
                    <p >{post.body}</p>
                </div>
                
            );
        })}
    </div>
  )
}

export default PostView



