========================================================================= Step : 20 redux with auth token ====================================================

# in authActionCreators.jsx => authSuccess(token,userId) : use the function to send the token in redux : 
-----------------------------------------------------------------------------------------
#authActionCreators.jsx => 
---------------------------

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: { token: token, userId: userId },
  }
}


# if axios auth success then pass (userId=localId, token=idToken ) call/dispatch authSuccess (userId,token) function . 
 
 axios.post(mode === "Sign Up" ? signup_url : signin_url,authData)
      .then((response) => {
        // console.log(response.data);
        dispatch(authSuccess(response.data.idToken, response.data.localId)); //pass to authSuccess, then authSuccess will dispatch to reducer
      })
      .catch((err) => {
        console.log(err);
      });

# reducer.jsx=> if auth success then set token and userId in redux state and write a new case function 
--------------------

in state => 
--------------

const INITIAL_STATE = {
  ingredients: [
    { type: "salad", amount: 0 },
    { type: "cheese", amount: 0 },
    { type: "meat", amount: 0 },
  ],
  totalPrice: 80,
  purchaseable: false,

  orders: [],
  orderLoading: true,
  orderErr: false,

  //for Auth newly add: 
  token: null,
  userId: null

};


in Case => 
------------

 //Auth cases
    case actionTypes.AUTH_SUCCESS : 

      return {
        ...state,
        authLoading : false,
        authErr : false,
        token : action.payload.token,
        userId : action.payload.userId
      }
      
      
#If user Login success and update the redux state then don't show the Login in Header.jsx => 
------------------------------------------------------------------------------------------
 => fetch the userId, tokenId form redux 
 => use a variable , let links = that store token from redux state . 
 => if link is null then only show the without login menu item such as : Home, Login 
 => if link has token then show the login menu item also : Home , Order, Checkout, etc. 
 
 --------------------------------------
 import { connect } from "react-redux";

const mapStateToProps = (state) => {
  console.log("redux state", state);
  return {
    isAuthenticated: state.token,
  };
};

const Header = (props) => {
  let links = null; 
  if(props.isAuthenticated === null){
    links = (
      <>
      
      <NavItem>
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </NavItem>
         
            <NavItem>
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </NavItem>
      </>
    )
  }
  else{
    links = (
     <>
       <NavItem>
      <NavLink className="nav-link" to="/">
        Home
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink className="nav-link" to="/order">
        Order
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink className="nav-link" to="/checkout">
        Checkout
      </NavLink>
    </NavItem>
    {/* <NavItem>
      <NavLink className="nav-link" to="/login">
        Login
      </NavLink>
    </NavItem> */}
     </>
    )
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow sticky-top rounded m-4">
      <div className="container-fluid">
        {/* Brand/Logo */}
        <NavLink className="nav-link navbar-brand" to="/">
          BBuilder
        </NavLink>

        {/* Toggle Button for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <Nav className="navbar-nav ms-auto"> {/* Use ms-auto to align links to the right */}
            {links}
          </Nav>
        </div>
      </div>
    </nav>
  );
};

export default connect(mapStateToProps,null)(Header);

# problem : If we refresh the window in browser , then token value is null in redux state , solve : set the token in cookies . 
# Main.jsx => without login or token user can browse any route without token have to fix this. 
# Learn {Switch,Redirect} from react router dom . (if Switch not get any route location then use Rediect route)

#Main.jsx => 
-------------
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./Header/Header";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Order from "./BurgerBuilder/Order/Order";
import Checkout from "./BurgerBuilder/Order/Checkout/Checkout";
import Auth from "./Auth/Auth";

export const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null, // Ensure it's a boolean value, if condition true then store value , $a = ($value != null);  
  };
};

const Main = ({ isAuthenticated }) => {
  return (
    <div>
      <Header />
      <div className="container">
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Auth />} />
          
          {/* Protected Routes */}
          {isAuthenticated ? (
            <>
              <Route path="/" element={<BurgerBuilder />} />
              <Route path="/order" element={<Order />} />
              <Route path="/checkout" element={<Checkout />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Main);
