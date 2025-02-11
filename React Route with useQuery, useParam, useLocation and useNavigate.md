### React Routing: A Complete Guide with `useParams`, `useQuery`, `useLocation`, and `useNavigate`

React Router is a powerful library for handling routing in React applications. It allows you to create single-page applications with navigation without refreshing the page. In this guide, we'll explore some of the most commonly used hooks in React Router: `useParams`, `useQuery`, `useLocation`, and `useNavigate`.

### 1. Setting Up React Router

First, you need to install `react-router-dom` if you haven't already:

```bash
npm install react-router-dom
```

### 2. Basic Routing Setup

Let's start by setting up a basic routing structure in a React application.

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/user/123">User 123</Link>
        <Link to="/search?query=react">Search React</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/user/:userId" element={<User />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}

function Home() {
  return <h1>Home Page</h1>;
}

function About() {
  return <h1>About Page</h1>;
}

function User() {
  return <h1>User Page</h1>;
}

function Search() {
  return <h1>Search Page</h1>;
}

export default App;
```

### 3. `useParams` Hook

The `useParams` hook allows you to access the dynamic parameters from the URL.

```jsx
import { useParams } from 'react-router-dom';

function User() {
  const { userId } = useParams(); // Extracts the `userId` parameter from the URL

  return (
    <div>
      <h1>User Page</h1>
      <p>User ID: {userId}</p>
    </div>
  );
}
```

- **Explanation**:
  - `useParams()` returns an object of key/value pairs of URL parameters.
  - In this example, the `userId` parameter is extracted from the URL `/user/:userId`.

### 4. `useQuery` Hook (Custom Hook)

React Router v6 does not provide a built-in `useQuery` hook, but you can create a custom hook to parse query parameters.

```jsx
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Search() {
  const query = useQuery(); // Parses the query string
  const searchQuery = query.get('query'); // Extracts the 'query' parameter

  return (
    <div>
      <h1>Search Page</h1>
      <p>Search Query: {searchQuery}</p>
    </div>
  );
}
```

- **Explanation**:
  - `useLocation()` returns the location object, which contains information about the current URL.
  - `URLSearchParams` is used to parse the query string.
  - `query.get('query')` retrieves the value of the `query` parameter from the URL.

### 5. `useLocation` Hook

The `useLocation` hook provides access to the location object, which represents the current URL.

```jsx
import { useLocation } from 'react-router-dom';

function About() {
  const location = useLocation(); // Gets the current location object

  return (
    <div>
      <h1>About Page</h1>
      <p>Current Path: {location.pathname}</p>
    </div>
  );
}
```

- **Explanation**:
  - `useLocation()` returns the location object, which contains properties like `pathname`, `search`, `hash`, and `state`.
  - `location.pathname` gives the current path of the URL.

### 6. `useNavigate` Hook

The `useNavigate` hook allows you to programmatically navigate to different routes.

```jsx
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleNavigate = () => {
    navigate('/about'); // Navigates to the '/about' route
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handleNavigate}>Go to About</button>
    </div>
  );
}
```

- **Explanation**:
  - `useNavigate()` returns a function that can be used to navigate to different routes.
  - `navigate('/about')` navigates to the `/about` route when the button is clicked.

### 7. Complete Example

Here’s the complete example with all the hooks integrated:

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation, useNavigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/user/123">User 123</Link>
        <Link to="/search?query=react">Search React</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/user/:userId" element={<User />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}

function Home() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/about');
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handleNavigate}>Go to About</button>
    </div>
  );
}

function About() {
  const location = useLocation();

  return (
    <div>
      <h1>About Page</h1>
      <p>Current Path: {location.pathname}</p>
    </div>
  );
}

function User() {
  const { userId } = useParams();

  return (
    <div>
      <h1>User Page</h1>
      <p>User ID: {userId}</p>
    </div>
  );
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Search() {
  const query = useQuery();
  const searchQuery = query.get('query');

  return (
    <div>
      <h1>Search Page</h1>
      <p>Search Query: {searchQuery}</p>
    </div>
  );
}

export default App;
```

### Summary

- **`useParams`**: Extracts dynamic parameters from the URL.
- **`useQuery` (Custom Hook)**: Parses query parameters from the URL.
- **`useLocation`**: Provides access to the current location object.
- **`useNavigate`**: Allows programmatic navigation between routes.

These hooks are essential for building dynamic and navigable React applications. By understanding and using them effectively, you can create more interactive and user-friendly web applications.
