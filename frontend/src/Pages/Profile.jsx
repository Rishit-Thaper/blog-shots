import React, {useEffect, useState} from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import useFetch from '../hooks/useFetch';
import { Link } from 'react-router-dom';
import formatDistanceToNow  from "date-fns/formatDistanceToNow"

export default function Profile() {
  const {author} =  useAuthContext()
  const {blogs: authorBlogs, load: loading} = useFetch('http://localhost:8000/api/blogs/author/blogs');
  console.log(authorBlogs);
  
  const reverseBlogs = authorBlogs.slice().reverse();
  const deleteBlog = async(blogID) =>{
    if(!author){
      setError("Please login to delete the blog");
    }
    try{
      const deleteResponse = await fetch(`http://localhost:8000/api/blogs/delete/${blogID}`,{
        mode: 'cors',
        method: 'DELETE',
        headers:{
          'Authorization': `Bearer ${author.token}`
        }
      })
      const deleteJson = await deleteResponse.json();
      if(deleteResponse.ok){
        console.log(deleteJson);
        console.log("Blog deleted successfully");
        window.location.reload();
      }else{
        console.log(deleteJson.error);
        console.log("Blog not deleted");
      }
    }
    catch(error){
      setError(error);
      console.log(error);
    }
  }
    const truncatedText=(text, limit)=>{
    const wordLimit = limit;
    if (text.length > wordLimit) {
      return text.slice(0, wordLimit); // Truncate the text and add ellipsis
    }
    return text;
  }
    return (
      <>
          <div className="main-user-div">
            <div className="user-details">
              <h1>Author: {author?.author.name}</h1>
              <h3>Email: {author?.author.email}</h3>
            </div>
          </div>
          {
            loading ?(
              <h1 id='loading'>Loading...</h1>
            ):(
              <div className='profile-page'>
                <div className="main-profile-blogs">
                  {reverseBlogs.length > 0 ? (
                    reverseBlogs.map((data) => (
                      <div className='profileBlogs'>
                        <div className="image">
                            <img src={`http://localhost:8000/${data.image}`} alt="blog_image" />
                        </div>
                        <div className="profileBlogContent">
                          <h2><Link to={`/blog/${data._id}`}>{truncatedText(data.title, 30)}...</Link></h2>
                          <p>{truncatedText(data.body, 40)}<Link to={`/blog/${data._id}`}> ...</Link></p>
                          <p>You ({data.author}) | {data.category}</p>
                          <p>{formatDistanceToNow (new Date(data.createdAt), {addSuffix: true})}</p>
                        </div>
                        <Link to={`/updateBlog/${data._id}`}><button>Update</button></Link>
                        <button onClick={()=>deleteBlog(data._id)}>Delete</button>
                      </div>
              
                    ))
                  ):(
                    <h2>No Shots created by you, Let's create one!!</h2>
                  )}
                </div>
              </div>
            )
          }
      </>
    )
}
