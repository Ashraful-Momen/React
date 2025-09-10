import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // ADD THIS IMPORT
import { authLogin } from "./AuthSlice";

const Login = () => {
  let userR = useSelector((state) => state.authR);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ADD THIS



  //only for the handle the login system : ____________________________________________
  const [user, setUser] = useState({
    userName: "",
    phone: "",
    password: "",
  });

  const handleUser = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitting login form...");
    dispatch(authLogin(user));
  };


  // if login success then redirect to /profile : ________________________________
    
  // CHECK FOR AUTH SUCCESS AND REDIRECT
  useEffect(() => {
    console.log("Auth state changed:", userR);
    
    // IF AUTH SUCCESS, REDIRECT TO /PROFILE AND CONSOLE USER DATA
    if (userR.isAuthenticated && userR.user) {
      console.log("🎉 AUTH SUCCESS! User data:", userR.user);
      console.log("Token:", userR.token);
      console.log("Redirecting to /profile...");
      
      // REDIRECT TO /PROFILE PAGE
      navigate("/profile");
    }
    
    // IF AUTH FAILED, SHOW ERROR
    if (userR.error) {
      console.log("❌ AUTH FAILED:", userR.error);
    }
  }, [userR]); // ADD navigate to dependencies



  return (
    <div className="container rounded mt-4 p-4 shadow-lg">
      <p>Login</p>
      
      {/* SHOW ERROR MESSAGE IF LOGIN FAILS */}
      {userR.error && (
        <div className="alert alert-danger">
          {userR.error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">User Name</label>
          <input
            type="text"
            className="form-control"
            name="userName"
            onChange={handleUser}
            value={user.userName}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="tel"
            className="form-control"
            name="phone"
            onChange={handleUser}
            value={user.phone}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={handleUser}
            value={user.password}
          />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label">Check me out</label>
        </div>
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={userR.isLoading}
        >
          {userR.isLoading ? "Logging in..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Login;
