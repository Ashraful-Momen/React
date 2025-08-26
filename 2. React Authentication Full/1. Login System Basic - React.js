
================================== SignIn System ==================================
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
