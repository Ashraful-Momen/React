#React with the router : 
--------------------------
#main.jsx: 
----------
1. first import  => import { createBrowserRouter,RouterProvider } from 'react-router-dom'

2. create the route => 
-----------------------
const router = createBrowserRouter([
  {
    path:'/',
    element: <Navbar/> //import the componet here 
  },
  {
    path:'/custom_page',
    element: <div>This is the Custom Page !</div>
  },

]); 

3. Provide the route => 
--------------------
createRoot(document.getElementById('root')).render(
  <StrictMode>
   
    <RouterProvider router={router}/>   {/* Provide the route  */}
  </StrictMode>,
)


--------------------------------------------------------------------
--------------------------------------------------------------------
#Navbar => 
-----------
import React from "react";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/product">Product</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

#main.jsx => Update the code : 
------------------------------
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'


import Home from './pages/Home.jsx'
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx'
import Product from './pages/Product.jsx'
import Navbar from './components/Navbar.jsx';

const router = createBrowserRouter([
  {
    path:'/',
    element: <Navbar/> //import the componet here 
  },
  {
    path:'/product',
    element: <Product/> //import the componet here 
  },
  {
    path:'/contact',
    element: <Contact/> //import the componet here 
  },
  {
    path:'/about',
    element: <About/> //import the componet here 
  },
  {
    path:'/*', //Fallback Page . 
    element:<div><strong>Route Not Found!!!</strong></div>
  }

]); 

createRoot(document.getElementById('root')).render(
  <StrictMode>
   
    <RouterProvider router={router}/>   {/* Provide the route  */}
  </StrictMode>,
)


--------------------------------------------------------------------
#How to create the Nested Route : (in the Navbr.jsx use at the end <Outlet > )
-----------------------------------

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/product">Product</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>
      <Outlet/>
    </nav>
  );
};



and in the main.jsx => 
-------------------------

const router = createBrowserRouter([
  {
    path:'/',
    element: <Navbar/>, //import the componet here 
    children:[
      {
        path:'/',
        element: <Home/>
      },
      {
        path:'/product',
        element: <Product/> //import the componet here 
      },
      {
        path:'/contact',
        element: <Contact/> //import the componet here 
      },
      {
        path:'/about',
        element: <About/> //import the componet here 
      },
    ]
    
  },
 
  {
    path:'/*', //Fallback Page . 
    element:<div><strong>Route Not Found!!!</strong></div>
  }

]); 
--------------------------------------------------------------------
#Prevent the refresh when click the Link : 
------------------------------------------
1. import the Link 
2. use to='/routes_name' in the <Link> tag. 

#Navbar.jsx => 
---------------
import {Link} from 'react-router-dom'

 <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
      <Outlet/>
</nav>
