// Updated NavBar.jsx with logout functionality
import { Outlet, Link, useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkExistingToken, logout } from '../Auth/AuthSlice';

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, user } = useSelector((state) => state.authR);

  // Check for existing token when NavBar (app) loads
  useEffect(() => {
    console.log("NavBar loaded, checking for existing token...");
    dispatch(checkExistingToken());
  }, [dispatch]);

  // Handle logout
  const handleLogout = () => {
    console.log("Logging out...");
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Instasure
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              
              {/* Show these links only when authenticated */}
              {isAuthenticated && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/product">
                      Product
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      Profile
                    </Link>
                  </li>
                </>
              )}
            </ul>

            {/* Right side navigation */}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {isAuthenticated ? (
                // Show user info and logout when authenticated
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Welcome, {user?.name || user?.user_name || 'User'}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        <i className="fas fa-user me-2"></i>
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button 
                        className="dropdown-item text-danger" 
                        onClick={handleLogout}
                        style={{ cursor: 'pointer', border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
                      >
                        <i className="fas fa-sign-out-alt me-2"></i>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              ) : (
                // Show login/signup when not authenticated
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Account
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link className="dropdown-item" to="/login">
                        <i className="fas fa-sign-in-alt me-2"></i>
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/signup">
                        <i className="fas fa-user-plus me-2"></i>
                        Sign Up
                      </Link>
                    </li>
                  </ul>
                </li>
              )}
            </ul>

            {/* Search form */}
            <form className="d-flex ms-3" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* Show loading overlay while checking token on initial load */}
      {isLoading && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white bg-opacity-75" style={{ zIndex: 9999 }}>
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="mt-2">Checking authentication...</div>
          </div>
        </div>
      )}

      {/* This is where child routes will be rendered */}
      <Outlet />
    </>
  );
}

export default NavBar;
