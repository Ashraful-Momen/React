Sure! Let's create a **real-world example** of a React project using `react-router-dom` with `useParams`, `useQuery` (custom hook), `useLocation`, and `useNavigate`. This example will simulate a simple blog application where users can view posts, search for posts, and navigate between pages.

---

### Project Structure

```
src/
├── components/
│   ├── Navbar.js
├── pages/
│   ├── Home.js
│   ├── About.js
│   ├── Post.js
│   ├── Search.js
├── App.js
├── index.js
```

---

### Step 1: Install `react-router-dom`

If you haven't already installed `react-router-dom`, run:

```bash
npm install react-router-dom
```

---

### Step 2: Create the Components

#### 1. `Navbar.js` (Navigation Bar)

```jsx
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/post/1">Post 1</Link>
      <Link to="/post/2">Post 2</Link>
      <Link to="/search?query=react">Search React</Link>
    </nav>
  );
}

export default Navbar;
```

---

#### 2. `Home.js` (Home Page)

```jsx
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/about'); // Navigate to the About page
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handleNavigate}>Go to About</button>
    </div>
  );
}

export default Home;
```

---

#### 3. `About.js` (About Page)

```jsx
import { useLocation } from 'react-router-dom';

function About() {
  const location = useLocation();

  return (
    <div>
      <h1>About Page</h1>
      <p>Current Path: {location.pathname}</p>
    </div>
  );
}

export default About;
```

---

#### 4. `Post.js` (Dynamic Post Page)

```jsx
import { useParams } from 'react-router-dom';

function Post() {
  const { postId } = useParams(); // Extract `postId` from the URL

  return (
    <div>
      <h1>Post Page</h1>
      <p>You are viewing Post ID: {postId}</p>
    </div>
  );
}

export default Post;
```

---

#### 5. `Search.js` (Search Page with Query Parameters)

```jsx
import { useLocation } from 'react-router-dom';

// Custom hook to parse query parameters
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Search() {
  const query = useQuery();
  const searchQuery = query.get('query'); // Get the 'query' parameter

  return (
    <div>
      <h1>Search Page</h1>
      <p>You searched for: {searchQuery}</p>
    </div>
  );
}

export default Search;
```

---

### Step 3: Set Up Routing in `App.js`

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Post from './pages/Post';
import Search from './pages/Search';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/post/:postId" element={<Post />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
```

---

### Step 4: Render the App in `index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

---

### Step 5: Run the Project

Run the project using:

```bash
npm start
```

---

### Explanation of the Code

1. **`Navbar.js`**:
   - Uses `Link` from `react-router-dom` to navigate between pages without reloading the app.

2. **`Home.js`**:
   - Uses `useNavigate` to programmatically navigate to the `/about` page when the button is clicked.

3. **`About.js`**:
   - Uses `useLocation` to display the current pathname (e.g., `/about`).

4. **`Post.js`**:
   - Uses `useParams` to extract the `postId` from the URL (e.g., `/post/1`).

5. **`Search.js`**:
   - Uses a custom `useQuery` hook to parse query parameters from the URL (e.g., `/search?query=react`).

6. **`App.js`**:
   - Sets up the routing using `BrowserRouter`, `Routes`, and `Route`.
   - Each `Route` maps a path to a component.

---

### Final Output

- **Home Page**: Displays a button to navigate to the About page.
- **About Page**: Displays the current pathname.
- **Post Page**: Displays the dynamic `postId` from the URL.
- **Search Page**: Displays the search query from the URL.

---

This example demonstrates how to use `react-router-dom` in a real-world project with easy-to-understand code. You can expand this project by adding more features like authentication, protected routes, or fetching data from an API.
