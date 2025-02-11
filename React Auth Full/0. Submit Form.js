import React, { useState } from "react";

const SignIn = () => {

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
    if(user.userName == "Ashraful" && user.password == "786Shuvo"){

    }
    console.log("Submitted User:", user);

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
