
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

// Create async thunks for Read and Delete operations
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return res.data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return id;
});

// Create the posts slice
const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Posts cases
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

    // Delete Post case
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    });
  },
});

export default postsSlice.reducer;


========================================================================================
#store.js=> 
-----------
import { configureStore } from "@reduxjs/toolkit";
import postSlice from "../features/posts/postSlice";

const store = configureStore({
    reducer: {
        posts: postSlice,
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
import PostView from "./features/posts/PostView";

function App() {
 


  return (
    <div className="App">
     

      <h3>Post Crud App</h3>

 
      <PostView />
     
    
    </div>
  );
}

export default App;


=====================================================================================

=====================================================================================
#PostView.js => 
-----------------
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, deletePost } from './postSlice';

const PostView = () => {
  const { isLoading, posts, error } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  // Fetch posts when component mounts
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // Handle post deletion
  const handleDeletePost = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePost(id));
    }
  };

  // Loading state
  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  // Error state
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Posts</h1>

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded">
            <h3 className="text-xl font-bold">{post.title}</h3>
            <p className="mt-2">{post.body}</p>
            <div className="mt-4">
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

=======================================================================
Break down the CRUD operations step by step, starting with Read operation.

1. READ Operation Flow:
-----------------------

**A. Initial Setup (store.js):**
```javascript
import postSlice from "../features/posts/postSlice";

const store = configureStore({
    reducer: {
        posts: postSlice,  // Register posts reducer in the store
    },
});
```

**B. Async Thunk for Fetching (postSlice.js):**
```javascript
// Create async thunk for fetching posts
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return res.data;  // Return fetched data
});

// Handle fetch states in extraReducers
extraReducers: (builder) => {
    builder
        .addCase(fetchPosts.pending, (state) => {
            state.isLoading = true;  // Set loading state while fetching
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.posts = action.payload;  // Store fetched posts
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;  // Handle errors
        });
}
```

**C. Component Implementation (PostView.js):**
```javascript
const PostView = () => {
    // Get posts data from Redux store
    const { isLoading, posts, error } = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    // Fetch posts when component mounts
    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    // Display loading/error states
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    // Render posts
    return (
        <div>
            {posts.map((post) => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    );
}
```

2. DELETE Operation Flow:
-------------------------

**A. Async Thunk (postSlice.js):**
```javascript
export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return id;  // Return deleted post id
});

// Handle in extraReducers
builder.addCase(deletePost.fulfilled, (state, action) => {
    // Remove deleted post from state
    state.posts = state.posts.filter((post) => post.id !== action.payload);
});
```

**B. Component Implementation (PostView.js):**
```javascript
const handleDeletePost = (id) => {
    // Confirm before deletion
    if (window.confirm('Are you sure?')) {
        dispatch(deletePost(id));  // Dispatch delete action
    }
};

// Delete button in render
<button onClick={() => handleDeletePost(post.id)}>
    Delete
</button>
```

3. CREATE Operation Flow:
-------------------------

**A. Form Component (PostForm.js):**
```javascript
const PostForm = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        body: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            userId: 1  // Default userId
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="title"
                value={formData.title}
                onChange={handleChange}
            />
            <textarea
                name="body"
                value={formData.body}
                onChange={handleChange}
            />
            <button type="submit">Create</button>
        </form>
    );
};
```

**B. Async Thunk (postSlice.js):**
```javascript
export const createPost = createAsyncThunk('posts/createPost', async (post) => {
    const res = await axios.post('https://jsonplaceholder.typicode.com/posts', post);
    return res.data;  // Return created post
});

// Handle in extraReducers
builder.addCase(createPost.fulfilled, (state, action) => {
    state.posts.unshift(action.payload);  // Add new post to beginning
});
```

**C. Parent Component Implementation (PostView.js):**
```javascript
const [isFormOpen, setIsFormOpen] = useState(false);

const handleCreatePost = (newPost) => {
    dispatch(createPost(newPost));  // Dispatch create action
    setIsFormOpen(false);  // Close form after creation
};

// Render form
{isFormOpen && (
    <PostForm
        onSubmit={handleCreatePost}
        onCancel={() => setIsFormOpen(false)}
    />
)}
```

4. UPDATE Operation Flow:
-------------------------

**A. Async Thunk (postSlice.js):**
```javascript
export const updatePost = createAsyncThunk('posts/updatePost', async (post) => {
    const res = await axios.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, post);
    return res.data;  // Return updated post
});

// Handle in extraReducers
builder.addCase(updatePost.fulfilled, (state, action) => {
    const index = state.posts.findIndex((post) => post.id === action.payload.id);
    if (index !== -1) {
        state.posts[index] = action.payload;  // Update post in state
    }
});
```

**B. Parent-Child Flow (PostView.js & PostForm.js):**
```javascript
// In PostView.js
const [selectedPost, setSelectedPost] = useState(null);

const handleUpdatePost = (updatedPost) => {
    dispatch(updatePost(updatedPost));  // Dispatch update action
    setIsFormOpen(false);
    setSelectedPost(null);
};

const openUpdateForm = (post) => {
    setSelectedPost(post);  // Set post to be updated
    setIsFormOpen(true);  // Open form
};

// Render form with selected post
{isFormOpen && (
    <PostForm
        post={selectedPost}  // Pass selected post to form
        onSubmit={selectedPost ? handleUpdatePost : handleCreatePost}
        onCancel={() => {
            setIsFormOpen(false);
            setSelectedPost(null);
        }}
    />
)}
```

This implementation follows a clean and organized structure where:
1. Each CRUD operation has its own async thunk
2. The Redux store manages all state changes
3. Components are separated by concern (PostView for display/logic, PostForm for input)
4. All operations have proper error handling and loading states
