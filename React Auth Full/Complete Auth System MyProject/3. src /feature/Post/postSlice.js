import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  isLoading: false,
  error: null,
};

//fetch post:
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return response.data;
});

//delete Post:
export const deletePost = createAsyncThunk(
  "post/deletePost",

  async (id) => {
    console.log("deletePost calling", id);
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );

    return id;
  }
);

//create post:
export const createPost = createAsyncThunk(
  "post/createPost",
  async (postData) => {
    console.log("createPost calling", postData);
    const response = await axios.post(
      `https://jsonplaceholder.typicode.com/posts`,
      postData
    );
    // Return the new post data
    return response.data;
  }
);

// Upate the post :
export const updatePost = createAsyncThunk(
  "post/updatePost",
  async ({ id, postData }) => {
    console.log("updatePost calling", id, postData);
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      postData
    );
    // Return both id and updated data
    return { id, ...response.data };
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetch post :
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.posts = [];
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.posts = [];
      });

    //delete post
    builder
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = state.posts.filter((post) => post.id != action.payload);
        state.error = null;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    //create post :
    builder
      // Add these cases to your extraReducers builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        // Add the new post to the beginning of the array
        state.posts = [action.payload, ...state.posts];
        state.error = null;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    //update the post :
    builder

      
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        // Find and replace the updated post
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {} = postSlice.actions;
export default postSlice.reducer;
