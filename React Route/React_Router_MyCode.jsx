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

return (
    <>
        <nav>
            <ul>
                <li>
                <Link to="/">Home</Link>
                </li>
            </ul>
        </nav>
        <div>
            <Outlet/> {* Basically the children component from the main.jsx*}
        </div>
    </div>
)
 

#Navigate to a Link  => 
--------------------------------------------
Contact.jsx=> 
-------------
import React from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate(); // Correct way to use navigate

  const handleNavigate = () => {
    navigate('/'); // Using navigate function properly
  };

  return (
    <div>
      <h3>Contact Page</h3>
      <button type="submit" onClick={handleNavigate}>Go to Home</button>
    </div>
  );
};

export default Contact;

================================== Route Navigate with Params ====================================
*** useNavigate() , useLocation(). 

#How to navigate any route => /profile with params => 
------------------------------------------------------
 navigate('/route_name', { state: pass_object });

 details code SingIn.jsx => 
 ---------------------------
  const handleSubmit = (event) => {
    event.preventDefault();
    const { userName, password } = user; // Corrected destructuring

    console.log("User:", user);
    console.log("Name:", userName, "Password:", password);

    if (userName === "Ashraful" && password === "786Shuvo") {
      console.log("Valid Credential");
      navigate('/profile', { state: user });
    } else {
      console.log("Invalid Credentials");
    }
  };

#how to receive object from route => 
--------------------------------------
const location = useLocation(); 
    console.log("Location data ",location);

details code Profile.jsx=> 
---------------------------
import { useLocation } from 'react-router-dom'

const Profile = () => {
    const location = useLocation(); 
    console.log("Location data ",location); 
  return (
    <div>
        <h4>User Profile</h4>
    </div>
  )
}

================================== SignUP System ==================================
set the route for /signup and component => signup.jsx 
set the route for /profile and component => profile.jsx 
------------------------------------------------------
SingIn.jsx=> 
-------------
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {

  const navigate = useNavigate(); 

  const [user, setUser] = useState({
    userName: "",
    password: "",
  });

  const handleUser = (event) => {
    setUser((prevUser) => ({
      ...prevUser,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { userName, password } = user; // Corrected destructuring

    console.log("User:", user);
    console.log("Name:", userName, "Password:", password);

    if (userName === "Ashraful" && password === "786Shuvo") {
      console.log("Valid Credential");
      navigate('/profile', { state: user });
    } else {
      console.log("Invalid Credentials");
    }
  };

  return (
    <div className="row text-center">
      <h4>SignIn Page</h4>
      <hr />
      <div className="mx-auto d-flex justify-content-center">
        <form
          onSubmit={handleSubmit}
          className="col-md-4 p-4 m-4 border rounded"
        >
          <input
            type="text"
            name="userName"
            placeholder="Type Name"
            className="form-control"
            onChange={handleUser}
            value={user.userName}
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Type Password"
            className="form-control"
            onChange={handleUser}
            value={user.password}
          />
          <br />
          <button type="submit" className="btn btn-sm btn-success">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;


#Profile.jsx => 
------------------
import React from 'react'
import { useLocation } from 'react-router-dom'

const Profile = () => {
    const location = useLocation(); 
    // console.log("Location data ",location); 
    const {state} = location;
    console.log("useLocation ",state); 
  return (
    <div className='card mx-auto'>
        <h4>User Profile</h4>
        <hr />
        <div>

            {state ?  ( <><h5>Login Successful!</h5>
            <hr />
            <p>Username : {state.userName}</p>
            <br />
            <p>Password : {state.password}</p></>) : <>Login Faild</> }
            
        </div>
    </div>
  )
}

export default Profile

================================== End SignUP System ==================================


=========================== Product All and Single product Show: isLoading,isError =========================
create a ProductDetails.jsx component then set the route => 

#pass the product id to the route => Product.jsx=> 
---------------------------------------------------



#Product.jsx => pass the id of the product to the route 
---------------
 <Link to={`/product_details/${id}`} >Show Details</Link>


#main.jsx => set the route => 
-----------------------------
const router = createBrowserRouter([
  {
    path:'/',
    element: <Navbar/>, //import the componet here 
    children:[
      {
        path:'/product_details/:id',  //set the id
        element: <ProductDetails/> //import the componet here 
      },
  }

#ProductDetails.jsx=> receive the product id 
---------------------
import React from 'react';
import { useLocation } from 'react-router-dom';

const ProductDetails = () => {
  const { state } = useLocation();

  // Check if product data exists
  if (!state) {
    return <div>Error: Product details not found.</div>;
  }
  console.log(state)
}

#full code of Product.jsx and ProductDetails.jsx
--------------------------------------------------
#Product.jsx => 
----------------
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState("");

  // Fetch data:
  const fetchData = () => {
    setLoading(true);
    setError(""); // Reset error before fetching

    fetch("https://dummyjson.com/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Data could not be fetched");
        }
        return res.json(); // ✅ Return JSON data
      })
      .then((data) => {
        setProduct(data.products);
      })
      .catch((error) => setError(error.message)) // ✅ Store error message
      .finally(() => setLoading(false)); // ✅ Corrected finally block
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h3>All Products</h3>
      <hr />

      {isLoading && <div>Loading...</div>}
      {isError && <div style={{ color: "red" }}>Error: {isError}</div>}

      {!isLoading && !isError && product.length > 0 ? (
        product.map((singleProduct) => {
          const { id, title, price } = singleProduct;
          return (
            <div key={id}>
              <p><strong>Title:</strong> {title}</p>
              <p><strong>Price:</strong> ${price}</p>
              {/* Pass the product object via state */}
              <Link to={`/product_details/${id}`} state={singleProduct }>
                Show Details
              </Link>
              <hr />
            </div>
          );
        })
      ) : (
        !isLoading && !isError && <p>No products found.</p>
      )}
    </div>
  );
};

export default Product;


#ProductDetails.jsx => 
-----------------------
import React from 'react';
import { useLocation } from 'react-router-dom';

const ProductDetails = () => {
    
  const { state } = useLocation();

  // Check if product data exists
  if (!state) {
    return <div>Error: Product details not found.</div>;
  }
  console.log(state)



  const { id, title, price, description, images } = state;

  return (
    <div className="product-details">
      <h3>Product Details</h3>
      <hr />

      <div>
        <p><strong>Title:</strong> {title}</p>
        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Description:</strong> {description}</p>

        {/* Display images if available */}
        {images && images.length > 0 && (
          <div>
            <strong>Images:</strong>
            <div className="images">
              {images.map((image, index) => (
                <img key={index} src={image} alt={`product-img-${index}`} width="200" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
----------------------------------------------

#ProductDetails.jsx => use just 1 hook , either useParams() or useLocation . if we use both then getting error.

#ProductDetials.jsx (alter native code for ProductDetails.jsx)=> 
----------------------
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from the URL [we set the /url/:id, that's why use the id]
  const [product, setProduct] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState("");

  // Fetch product by ID when component mounts
  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Product details could not be loaded.");
        setLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !product) {
    return <div>Error: Product details not found.</div>;
  }

  const { title, price, description, images } = product;

  return (
    <div className="product-details">
      <h3>Product Details</h3>
      <hr />

      <div>
        <p><strong>Title:</strong> {title}</p>
        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Description:</strong> {description}</p>

        {/* Display images if available */}
        {images && images.length > 0 && (
          <div>
            <strong>Images:</strong>
            <div className="images">
              {images.map((image, index) => (
                <img key={index} src={image} alt={`product-img-${index}`} width="200" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;



================================== EndProduct Details /id: isLoading,isError =================================


============================ useRouteError() hook =========================================
import React from 'react';
import { useRouteError } from 'react-router-dom';

const Error = () => {
  const error = useRouteError(); // Get the error from the route

  // Display the error message or fallback if no error is present
  const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
  
  return (
    <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
      <h2>Something went wrong!</h2>
      <p>{errorMessage}</p>
      <p>Please check the URL or go back to the <a href="/">home page</a>.</p>
    </div>
  );
};

export default Error;

=================================== Route Projection ======================================
1. create AdminRoute.jsx as component . and AdminPage.jsx
2. setup the route . 

AdminRoute.jsx => if isAdmin && isLoggedIn : <Outlet> : <SingIn/>
-----------------
import React from 'react'
import { Outlet } from 'react-router-dom';
import SignIn from '../pages/SingIn';

const AdminRoute = () => {

    const isLoggedIn = true;
    const isAdmin = true;

    return (
        !isLoggedIn ? (
          <SignIn /> // If not logged in, show the SignIn page
        ) : !isAdmin ? (
          <div>Access Denied: You are not an admin.</div> // If logged in but not admin, show access denied
        ) : (
          <Outlet /> // If logged in and admin, show the child routes
        )
      );
}




export default AdminRoute; 


// another way use the trynary operator : 
// --------------------------------------
// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import SignIn from '../pages/SignIn';

// const AdminRoute = () => {
//   const isLoggedIn = true;
//   const isAdmin = true;

//   return !isLoggedIn ? <SignIn /> : !isAdmin ? <div>Access Denied: You are not an admin.</div> : <Outlet />;
// };

// export default AdminRoute;




#main.jsx => setup the route : 
----------------------------------
import AdminRoute from './route/AdminRoute.jsx'
import AdminPage from './pages/AdminPage.jsx';

const router = createBrowserRouter([
  {
    path: '/admin',
    element: <AdminRoute />,
    children: [
      {
        path: 'dashboard',
        element: <AdminPage />,
      },
    ],
  }, 
])
