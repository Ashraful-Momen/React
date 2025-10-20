# Redux Toolkit with Thunk - API CRUD Tutorial

## 🚀 Project Setup

### 1. Create Vite Project
```bash
npm create vite@latest
# Select: react > javascript > project_name
cd project_name
npm install
npm run dev
```

### 2. Install Dependencies
```bash
# Install Redux Toolkit and React-Redux
npm install @reduxjs/toolkit react-redux

# Install Bootstrap for styling
npm install bootstrap

# Install Axios for API calls
npm install axios
```

### 3. Verify Installation
Check `package.json` to confirm all packages are installed correctly.

---

## 📁 Folder Structure
```
src/
├── app/
│   └── store.js                    # Redux store configuration
│
├── features/
│   └── posts/
│       ├── postSlice.js           # Post logic (extraReducers with thunks)
│       ├── PostView.js            # Post list UI component
│       └── PostForm.js            # Form for create/edit posts
│
├── App.jsx                         # Main app component
├── main.jsx                        # App entry point with Provider
└── index.css                       # Global styles
```

---

## 📝 File Templates

### **src/main.jsx**
```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import { store } from './app/store'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
```

---

### **src/App.jsx**
```javascript
import React from 'react'
// TODO: Import PostView and PostForm components

const App = () => {
  return (
    <div>
      {/* TODO: Add your components here */}
    </div>
  )
}

export default App
```

---

### **src/app/store.js**
```javascript
import { configureStore } from '@reduxjs/toolkit'
// TODO: Import postReducer from postSlice

export const store = configureStore({
  reducer: {
    // TODO: Add your reducers here
  },
})
```

---

### **src/features/posts/postSlice.js**
```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// TODO: Define API_URL

// TODO: Create async thunks for:
// - fetchPosts
// - createPost
// - updatePost
// - deletePost

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // TODO: Add cases for async thunks (pending, fulfilled, rejected)
  },
})

export default postSlice.reducer
```

---

### **src/features/posts/PostView.js**
```javascript
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// TODO: Import thunks

const PostView = () => {
  // TODO: Setup dispatch and selectors
  
  // TODO: Fetch posts on component mount
  
  // TODO: Create delete handler
  
  // TODO: Display loading, error, and posts list

  return (
    <div>
      {/* TODO: Build your UI here */}
    </div>
  )
}

export default PostView
```

---

### **src/features/posts/PostForm.js**
```javascript
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// TODO: Import thunks

const PostForm = () => {
  // TODO: Setup form state and handlers
  
  // TODO: Create submit handler for create/update
  
  // TODO: Build form UI

  return (
    <div>
      {/* TODO: Build your form here */}
    </div>
  )
}

export default PostForm
```

---

## 🎯 Learning Objectives

Students will learn to:
1. Configure Redux store with Redux Toolkit
2. Create async thunks for API operations (CRUD)
3. Handle async states (pending, fulfilled, rejected) in extraReducers
4. Connect React components with Redux using hooks
5. Perform API calls with Axios

---

## 🔗 API Endpoint
Use JSONPlaceholder for testing: `https://jsonplaceholder.typicode.com/posts`
