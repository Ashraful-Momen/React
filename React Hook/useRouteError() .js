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
