Pagination : 
---------------
App.jsx => 
----------
import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Post from './component/Post';
import Pagination from './component/Pagination';

function App() {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); //by default set current page is 1
  const [postPerPage, setPostPerPage] = useState(10);

  // Fetch post function
  const fetchPost = async () => {
    setLoading(true);
    setError(null); // Reset error state before fetching
  
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!res.ok) {
        throw new Error('Something went wrong');
      }
      const data = await res.json();
      setPost(data); // Set the fetched data to state
    } catch (error) {
      setError(error.message); // Set error state if something goes wrong
    } finally {
      setLoading(false); // Ensure loading is set to false after fetch
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  //Main Part => get the current post :--------------------------------------------------- 
  const indexOfLastPost = currentPage * postPerPage; // 1*10 = 10
  const indexOfFirstPost = indexOfLastPost - postPerPage; // 10 - 10 = 0
  const currentPost = post.slice(indexOfFirstPost, indexOfLastPost); // slice(0, 10) : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  // Pass the function to the pagination component . cz pagination show the page number . when user click the number then set the currentPageNumbr . 
  const paginate = (pageNumber) => setCurrentPage(pageNumber);



  return (
    <>
      <div className='d-flex justify-content-center'>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && (
          <div>
            <h6 className='text-center mt-4 mb-4 text-info fw-bold fs-3'>Pagination </h6>
          <hr />
          {/* pass the currentPost to the Post component */}
          <Post post={currentPost}></Post>
          <div className='d-flex justify-content-center'>
          {/** pass the paginate function */}
          <Pagination postPerPage={postPerPage} totalPosts={post.length} paginate={paginate}></Pagination>
          </div>
          </div>
         
        )}
      </div>
    </>
  );
}

export default App;


Post.jsx=> 
-------------
import React from 'react'

const Post = ({post}) => {

    console.log("check the post ",post);
    
  return (
    <div className='m-4 p-4'>
          <ul className='list-group'>
             {post.map((item) => (
               <li key={item.id} className='list-group-item'>
                {item.id}.{item.title}
               </li>
             ))}
           </ul>
    </div>
  )
}

export default Post

Pagination.jsx=> 
-------------
import React from 'react'

const Pagination = ({postPerPage, totalPosts, paginate}) => {
    // Calculate the total number of pages
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
        pageNumbers.push(i);
    }

  return (
    <nav>
        <ul className='pagination'>
            {pageNumbers.map(number => (
                <li key={number} className='page-item'>
                   {/* set the current page to active */}
                    <a  onClick={() => paginate(number)} className='page-link'>{number}</a>
                </li>
            ))}
        </ul>
        
    </nav>
  )
}

export default Pagination
