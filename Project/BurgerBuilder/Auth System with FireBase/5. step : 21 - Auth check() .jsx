========================================================================= Step : 21 LocalStorage : auth token ====================================================

#authActionCreators.jsx => if token get by axios , then set the token, userId to the localStorage . 
    => Set the Expire : set time as 1hr from the current time . ex: new Date().getTime() + response.data.expiresIn * 1000
    => axios response.data.expiresIn = 3600s which is value in second  but , new Date().getTime() = mili sec . for convert in mili second => response.data.expiresIn * 1000 
    => now whole time convert in date format => new Date (new Date().getTime() + response.data.expiresIn * 1000)
    => then set into localStorage.setItem() . 
    ---------------------------------------------
    

#authActionCreators.jsx=> 
----------------------------
 axios.post(mode === "Sign Up" ? signup_url : signin_url,authData)
      .then((response) => {
        // console.log(response.data);
        //set the token and userID(localId) to the localStorage: 
        localStorage.setItem('token',response.data.idToken);
        localStorage.setItem('userId',response.data.localId);

        //set the token expire with 1hr cz firebase give us 1hr(In second) but new Date () (In mili - have to convert)
        //set expirationTime = currectTime + 1hr from firebase. 
        const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000)

        localStorage.setItem('expirationTime',expirationTime);

        dispatch(authSuccess(response.data.idToken, response.data.localId)); //pass to authSuccess, then authSuccess will dispatch to reducer
      })
      .catch((err) => {
        console.log(err);
      });
      


#actionCreators.jsx => Auth check for user : 
--------------------------------------------
 => check the user is log in or not 
 => check the expiration time
 
 
 //for auth check : call this function in the root component cz when user run the app firstly check the user has valid token or not. root : <Mian.jsx>

export const authCheck = () => dispatch => {

  //check the token : if token exit and token time not expire then user pass the auth check : 

  const token = localStorage.getItem('token'); 

  if(!token) {
    //Logout
  }
  else{
    // for the date format convertion use => new Date(here_the_code)
    const expirationTime = new Date (localStorage.getItem('expirationTime'))

    //if expiration time <= current time then token expire 
    if(expirationTime <= new Date()){
      //Logout 
    }
    //this else block : indecate that user has the validate token . 
    else{

      const userId = localStorage.getItem('userId')
      dispatch (authSuccess(token,userId)); 

    }
  }
}

#Convert Main.jsx function component to class component for use useEffect or  the componentDidmount(after full load of component then run this function), compnentDidUpdate(if update any component then update this function) function . 

#Main.jsx => 
--------------
import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./Header/Header";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Order from "./BurgerBuilder/Order/Order";
import Checkout from "./BurgerBuilder/Order/Checkout/Checkout";
import Auth from "./Auth/Auth";

import { authCheck } from "../redux/authActionCreators";

export const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null, // Ensure it's a boolean value
  };
};

// when load app then check the user is authenticated or not .
export const mapDispatchToProps = (dispatch) => {
  return {
    authCheck: () => dispatch(authCheck()), // Return a function that dispatches the action
  };
};

const Main = ({ isAuthenticated, authCheck }) => {
  useEffect(() => {
    authCheck(); // Every time : Call authCheck when the component mounts
  }, [authCheck]);

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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
