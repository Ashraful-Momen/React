import { createRoot } from "react-dom/client";
import "./index.css";


// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";

import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Bootstrap JS

import NavBar from "./feature/Navbar/NavBar.jsx";
import Login from "./feature/Auth/Login.jsx";
import Singup from "./feature/Auth/Singup.jsx";
import Profile from "./feature/Auth/Profile.jsx";
import Home from "./feature/Auth/Home.jsx";
import Product from "./feature/Post/PostView.jsx";
import CustomerRoute from "./feature/Auth/CustomerRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />, // NavBar now handles token checking
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: (
          <CustomerRoute>
            <Profile />
          </CustomerRoute>
        ),
      },
      {
        path: "/product",
        element: (
          <CustomerRoute>
            <Product />
          </CustomerRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Singup />,
      },
    ],
  },
  {
    path: "/*",
    element: (
      <div>
        <strong>Route Not Found!!!</strong>
      </div>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
