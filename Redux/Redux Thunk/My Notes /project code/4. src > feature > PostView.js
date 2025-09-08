import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import the action for fetching posts
import { fetchPosts, deletePost, createPost, updatePost } from "./postSlice";

const PostView = () => {
  //fetch reducer and their content from the store
  const { posts, isLoading, error } = useSelector((state) => state.postR);
  //useDispatch :
  const dispatch = useDispatch();

  //fetch posts
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  //handleDelete:
  const handleDeletePost = (id) => {
    console.log(id);
    dispatch(deletePost(id));
  };

  //handle createPost :

  const handleCreatePost = (postData) => {
    console.log("Creating post:", postData);
    dispatch(createPost(postData));
  };

  // Add state for edit mode
  const [editingPost, setEditingPost] = useState(null);

  // handle Update Post:
  const handleUpdatePost = (id, postData) => {
    console.log("Updating post:", id, postData);
    dispatch(updatePost({ id, postData }));
    setEditingPost(null); // Exit edit mode
  };

  // Add edit toggle handler
  const handleEditToggle = (post) => {
    setEditingPost(editingPost?.id === post.id ? null : post);
  };

  return (
    <div>
      <div className="row">
        <div className="col text-center fw-bold">Redux Async thunk</div>
        <hr />
      </div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {/* Post Create  */}
      <div className="row m-3">
        <div className="col">
          <h4>Create New Post</h4>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const postData = {
                title: formData.get("title"),
                body: formData.get("body"),
                userId: 1, // Default user ID
              };
              handleCreatePost(postData);
              e.target.reset(); // Clear form
            }}
          >
            <div className="mb-3">
              <input
                name="title"
                className="form-control"
                placeholder="Post Title"
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                name="body"
                className="form-control"
                placeholder="Post Body"
                rows="3"
                required
              />
            </div>
            <button type="submit" className="btn btn-success">
              Create Post
            </button>
          </form>
        </div>
      </div>


      // Replace each post section with this conditional rendering
      {posts.map((post) => (
        <section className="row" key={post.id}>
          <div className="col text-start m-3">
            {editingPost?.id === post.id ? (
              // Edit Form
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const postData = {
                    title: formData.get("title"),
                    body: formData.get("body"),
                    userId: post.userId,
                  };
                  handleUpdatePost(post.id, postData);
                }}
              >
                <div className="mb-3">
                  <input
                    name="title"
                    className="form-control"
                    defaultValue={post.title}
                    required
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    name="body"
                    className="form-control"
                    defaultValue={post.body}
                    rows="3"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success me-2">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditingPost(null)}
                >
                  Cancel
                </button>
              </form>
            ) : (
              // Display Mode
              <>
                <h5>ID: {post.id}</h5>
                <h5>Title: {post.title}</h5>
                <p>Body: {post.body}</p>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleEditToggle(post)}
                >
                  Edit
                </button>
                <button
                  className="btn bg-dark text-white"
                  onClick={() => handleDeletePost(post.id)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </section>
      ))}


      
      {/* for Post list :  */}
      {posts.map((post) => (
        <section className="row" key={post.id}>
          <div className="col text-start m-3">
            <h5>ID: {post.id}</h5>
            <h5>Title: {post.title}</h5>
            <p>Body: {post.body}</p>
            <button
              className="btn bg-dark text-white"
              onClick={() => handleDeletePost(post.id)}
            >
              Delete
            </button>
          </div>
        </section>
      ))}
    </div>
  );
};

export default PostView;
