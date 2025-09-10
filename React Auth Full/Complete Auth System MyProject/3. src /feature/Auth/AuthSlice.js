// Updated AuthSlice.js - Store and restore user data with token
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { isTokenValid, getTokenFromStorage, clearExpiredToken } from './tokenUtils';

const initialState = {
  user: [],
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

// Set token AND user data in localStorage with 4 hour expiry
const setTokenWithExpiry = (token, userData) => {
  try {
    const now = new Date();
    const expiry = new Date(now.getTime() + 4 * 60 * 60 * 1000); // 4 HOURS
    
    const tokenData = {
      token: token,
      user: userData, // Store user data with token
      expiry: expiry.toISOString()
    };
    
    localStorage.setItem('authToken', JSON.stringify(tokenData));
    console.log("Token and user data saved to localStorage successfully");
    return token;
  } catch (error) {
    console.error("Failed to save token to localStorage:", error);
    return token;
  }
};

// Check existing token on app load
export const checkExistingToken = createAsyncThunk(
  "auth/checkExistingToken",
  async (_, { rejectWithValue }) => {
    try {
      if (isTokenValid()) {
        const tokenData = getTokenFromStorage();
        console.log("Valid token found in storage with user data:", tokenData);
        
        return {
          token: tokenData.token,
          user: tokenData.user, // Return user data too
          isValid: true
        };
      } else {
        clearExpiredToken();
        return rejectWithValue("No valid token found");
      }
    } catch (error) {
      return rejectWithValue("Token validation failed");
    }
  }
);

export const authLogin = createAsyncThunk(
  "auth/authLogin",
  async (user, { rejectWithValue }) => {
    try {
      let { userName, phone, password } = user;
      console.log("Attempting login with:", phone, password);
      
      const postData = {
        phone,
        password,
      };
      
      const response = await axios.post("https://dev.instasure.xyz/api/login", postData);
      console.log("API Response Status:", response.status);
      console.log("API Response Data:", response.data);
      
      if (response.status === 200 && response.data.data) {
        const token = response.data.data.token || response.data.data.access_token;
        
        if (token) {
          console.log("Token found:", token);
          console.log("User data:", response.data.data);
          
          // Save token WITH user data
          const savedToken = setTokenWithExpiry(token, response.data.data);
          console.log("About to return success data...");
          
          return {
            data: response.data.data,
            token: savedToken,
            redirect: true
          };
        } else {
          console.error("No token found in response data");
          return rejectWithValue("No token found in response");
        }
      } else {
        console.error("Invalid response status or missing data");
        return rejectWithValue("Invalid response from server");
      }
    } catch (error) {
      console.error("Login error:", error);
      return rejectWithValue(error.response?.data?.message || error.message || "Login failed");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      try {
        localStorage.removeItem('authToken');
      } catch (error) {
        console.error("Failed to remove token from localStorage:", error);
      }
      state.user = [];
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(authLogin.pending, (state) => {
        console.log("Login pending...");
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        console.log("LOGIN SUCCESS:", action.payload);
        state.isLoading = false;
        state.user = action.payload.data;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
        console.log("State updated successfully");
      })
      .addCase(authLogin.rejected, (state, action) => {
        console.log("LOGIN REJECTED:", action.payload);
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = [];
        state.token = null;
      })
      // Token check cases - FIXED: Now restores user data too
      .addCase(checkExistingToken.fulfilled, (state, action) => {
        console.log("Existing valid token found");
        console.log("Restoring user data:", action.payload.user);
        state.token = action.payload.token;
        state.user = action.payload.user; // Restore user data
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(checkExistingToken.rejected, (state) => {
        console.log("No valid existing token");
        state.isAuthenticated = false;
        state.token = null;
        state.user = [];
        state.isLoading = false;
      })
      .addCase(checkExistingToken.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;