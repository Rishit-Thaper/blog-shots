import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import formatDistanceToNow  from "date-fns/formatDistanceToNow"

function Blog() {
    const {id} = useParams();
    const blogID = id;
    const {blogs: blog, load: loading} = useFetch(`http://localhost:8000/api/blogs/${blogID}`);
    console.log(loading)
    console.log(blog);

  return (
    <div className="blog-page">
        <div className='single-blog'>
        {loading ? (
            <h1>Loading...</h1>
        ):(
            <div className="blog">
                <div className="image">
                    <img src={`http://localhost:8000/${blog.image}`} alt="blog_image" />
                </div>
                <div className="blogContent">
                    <h2>{blog.title}</h2>
                    <p><span>{blog.author} | {blog.category}</span> | {formatDistanceToNow (new Date(blog.createdAt), {addSuffix: true})}</p>
                    <p>{blog.body}</p>
                    <p></p>
                </div>
            </div>
        )
        }
        </div>    
    </div>
    
  )
}

export default Blog