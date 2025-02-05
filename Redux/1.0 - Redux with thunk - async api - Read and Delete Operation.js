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
                                                    /PostForm.js //for edit or create the use this form 
    
    

================================================================
1. postSlice.js => 
----------------------
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunks for CRUD Operations
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return res.data;
});

export const createPost = createAsyncThunk('posts/createPost', async (post) => {
  const res = await axios.post('https://jsonplaceholder.typicode.com/posts', post);
  return res.data;
});

export const updatePost = createAsyncThunk('posts/updatePost', async (post) => {
  const res = await axios.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, post);
  return res.data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return id;
});

// Slice for Posts
const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Posts
    builder.addCase(fetchPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // Create Post
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.posts.unshift(action.payload); // Add new post to the beginning
    });

    // Update Post
    builder.addCase(updatePost.fulfilled, (state, action) => {
      const index = state.posts.findIndex((post) => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload; // Update the post
      }
    });

    // Delete Post
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload); // Remove the post
    });
  },
});

export default postsSlice.reducer;


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
#PostForm.js => 
-----------------
import React, { useState, useEffect } from 'react';

const PostForm = ({ post, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        body: post.body,
      });
    }
  }, [post]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      userId: post?.userId || 1,
      id: post?.id
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="title" className="mb-2 font-medium">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
      </div>
      
      <div className="flex flex-col">
        <label htmlFor="body" className="mb-2 font-medium">
          Content
        </label>
        <textarea
          id="body"
          name="body"
          value={formData.body}
          onChange={handleChange}
          required
          rows={4}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {post ? 'Update Post' : 'Create Post'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PostForm;
  
=====================================================================================
#PostView.js => 
-----------------
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, createPost, updatePost, deletePost } from './postSlice';
import PostForm from '../posts/PostForm';

const PostView = () => {
  const { isLoading, posts, error } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleCreatePost = (newPost) => {
    dispatch(createPost(newPost));
    setIsFormOpen(false);
    setSelectedPost(null);
  };

  const handleUpdatePost = (updatedPost) => {
    dispatch(updatePost(updatedPost));
    setIsFormOpen(false);
    setSelectedPost(null);
  };

  const handleDeletePost = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePost(id));
    }
  };

  const openCreateForm = () => {
    setSelectedPost(null);
    setIsFormOpen(true);
  };

  const openUpdateForm = (post) => {
    setSelectedPost(post);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setSelectedPost(null);
  };

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Posts</h1>
        <button
          onClick={openCreateForm}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Create New Post
        </button>
      </div>

      {isFormOpen && (
        <div className="mb-6 p-4 border rounded bg-gray-50">
          <h2 className="text-xl font-bold mb-4">
            {selectedPost ? 'Edit Post' : 'Create New Post'}
          </h2>
          <PostForm
            post={selectedPost}
            onSubmit={selectedPost ? handleUpdatePost : handleCreatePost}
            onCancel={closeForm}
          />
        </div>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded">
            <h3 className="text-xl font-bold">{post.title}</h3>
            <p className="mt-2">{post.body}</p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => openUpdateForm(post)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeletePost(post.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostView;


