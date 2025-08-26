# React Router Complete Guide

## Lesson 1: Basic Router Setup

### Step 1: Install and Import
```jsx
// main.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
```

### Step 2: Create Basic Routes
```jsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/about',
    element: <About />
  }
]);
```

### Step 3: Provide Router
```jsx
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
```

---

## Lesson 2: Navigation with Link

### Problem with Regular Links
```jsx
// ❌ This causes page refresh
<a href="/about">About</a>
```

### Solution: Use Link
```jsx
// ✅ No page refresh
import { Link } from 'react-router-dom'

<Link to="/about">About</Link>
```

### Basic Navbar Component
```jsx
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};
```

---

## Lesson 3: Nested Routes with Outlet

### Step 1: Update Navbar Component
```jsx
import { Link, Outlet } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>
      <Outlet /> {/* Child routes render here */}
    </>
  );
};
```

### Step 2: Setup Nested Routes
```jsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/about',
        element: <About />
      }
    ]
  },
  {
    path: '/*',
    element: <div>Page Not Found!</div>
  }
]);
```

---

## Lesson 4: Programmatic Navigation

### Using useNavigate Hook
```jsx
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/'); // Go to home page
  };

  return (
    <div>
      <h3>Contact Page</h3>
      <button onClick={handleNavigate}>Go to Home</button>
    </div>
  );
};
```

---

## Lesson 5: Passing Data Between Routes

### Method 1: Using State
```jsx
// Sending data
const navigate = useNavigate();
const userData = { name: "John", age: 25 };

navigate('/profile', { state: userData });
```

```jsx
// Receiving data
import { useLocation } from 'react-router-dom';

const Profile = () => {
  const location = useLocation();
  const { state } = location;
  
  return (
    <div>
      {state ? (
        <p>Welcome, {state.name}!</p>
      ) : (
        <p>No user data</p>
      )}
    </div>
  );
};
```

---

## Lesson 6: Simple Login System

### SignIn Component
```jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (user.userName === 'admin' && user.password === '123') {
      navigate('/profile', { state: user });
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={user.userName}
        onChange={(e) => setUser({...user, userName: e.target.value})}
      />
      <input
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}
      />
      <button type="submit">Login</button>
    </form>
  );
};
```

---

## Lesson 7: URL Parameters with useParams

### Setup Route with Parameter
```jsx
const router = createBrowserRouter([
  {
    path: '/product/:id',
    element: <ProductDetails />
  }
]);
```

### Link with Parameter
```jsx
<Link to={`/product/${productId}`}>View Product</Link>
```

### Get Parameter in Component
```jsx
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  
  return <div>Product ID: {id}</div>;
};
```

---

## Lesson 8: Loading States & API Data

### Product List Component
```jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <p>${product.price}</p>
          <Link to={`/product/${product.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};
```

---

## Lesson 9: Error Handling

### Error Component
```jsx
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  
  return (
    <div>
      <h2>Oops! Something went wrong</h2>
      <p>{error?.message || 'Unknown error occurred'}</p>
      <Link to="/">Go Home</Link>
    </div>
  );
};
```

### Add Error Boundary to Routes
```jsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar />,
    errorElement: <ErrorPage />,
    children: [
      // your routes here
    ]
  }
]);
```

---

## Lesson 10: Route Protection

### Protected Route Component
```jsx
import { Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const isLoggedIn = true; // Replace with actual auth logic
  const isAdmin = true;    // Replace with actual role check
  
  if (!isLoggedIn) {
    return <SignIn />;
  }
  
  if (!isAdmin) {
    return <div>Access Denied: Admin only!</div>;
  }
  
  return <Outlet />;
};
```

### Setup Protected Routes
```jsx
const router = createBrowserRouter([
  {
    path: '/admin',
    element: <ProtectedRoute />,
    children: [
      {
        path: 'dashboard',
        element: <AdminDashboard />
      }
    ]
  }
]);
```

---

## Quick Reference

### Essential Imports
```jsx
import { 
  createBrowserRouter, 
  RouterProvider, 
  Link, 
  Outlet, 
  useNavigate, 
  useLocation, 
  useParams,
  useRouteError 
} from 'react-router-dom';
```

### Common Patterns
- **Navigation**: `<Link to="/path">Text</Link>`
- **Programmatic**: `navigate('/path')`
- **With Data**: `navigate('/path', { state: data })`
- **Get Data**: `const { state } = useLocation()`
- **URL Params**: `const { id } = useParams()`
- **Nested Routes**: Use `<Outlet />` in parent component

---

**Practice Tips:**
1. Start with basic routing
2. Add navigation with Link
3. Try nested routes with Outlet
4. Practice passing data between routes
5. Build a simple login system
6. Add loading states and error handling
7. Implement route protection

Each lesson builds on the previous one. Practice each concept before moving to the next!
