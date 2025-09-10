import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { isTokenValid, clearExpiredToken } from './tokenUtils';
import { logout } from './AuthSlice.js';

const CustomerRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, isLoading } = useSelector((state) => state.authR);
  
  // Check if user is customer
  const isCustomer = user?.user_type === 'customer' ||
    user?.role === 'customer' ||
    (!user?.user_type || user?.user_type !== 'admin');
  
  // Check if token is valid
  const tokenValid = isTokenValid();

  // Only handle token expiry during session (not initial load)
  useEffect(() => {
    // Only check if we're authenticated and token becomes invalid
    if (isAuthenticated && !tokenValid) {
      console.log("Token expired during session, logging out...");
      clearExpiredToken();
      dispatch(logout());
    }

    // Periodic token validation every minute
    const interval = setInterval(() => {
      if (isAuthenticated && !isTokenValid()) {
        console.log("Token expired during session, logging out...");
        clearExpiredToken();
        dispatch(logout());
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [isAuthenticated, dispatch, tokenValid]);

  // Don't show loading here - let NavBar handle initial loading
  
  // Log debug info
  console.log("CustomerRoute validation:", {
    isAuthenticated,
    tokenValid,
    isCustomer,
    user_type: user?.user_type,
    hasUser: !!user
  });

  // Check access permissions
  if (!isAuthenticated || !tokenValid) {
    return <Navigate to="/login" replace />;
  }

  if (!isCustomer) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning text-center">
          <h4>Access Restricted</h4>
          <p>This area is for customers only.</p>
          <p className="text-muted">User type: {user?.user_type || 'Unknown'}</p>
        </div>
      </div>
    );
  }

  // Render protected content
  return children;
};

export default CustomerRoute;