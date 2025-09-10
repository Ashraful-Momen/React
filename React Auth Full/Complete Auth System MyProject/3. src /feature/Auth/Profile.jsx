// Profile.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user, token, isAuthenticated } = useSelector((state) => state.authR );
  
  console.log("Profile page - User data:", user);
  
  if (!isAuthenticated) {
    return <div>Not authenticated</div>;
  }
  
  return (
    <div className="container mt-4">
      <h2>Instasure Profile Page</h2>
      <div className="card">
        <div className="card-body">
          <h5>User Information:</h5>
          <pre>{JSON.stringify(user, null, 2)}</pre>
          <p><strong>Token:</strong> {token ? 'Present' : 'Missing'}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;