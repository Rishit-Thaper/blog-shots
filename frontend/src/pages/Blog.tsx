import React, { useEffect, useState } from 'react';
import Category from '../components/Category';

function Blog() {

  interface BlogItem {
    _id: string;
    title: string;
    body: string;
    author: string;
    category: string;
    createdAt: string;
    // Add other properties as needed
  }
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    try {
      fetch('http://localhost:8000/api/blogs')
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setBlogs(data);
          setLoading(false); 
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false); 
        });
    } catch (error) {
      console.error('Error:', error);
      setLoading(false); 
    }
  }, []);

  return (
    <div className="homepage">
      <div className="blog-content">
        {loading ? ( // Display "Loading..." while data is being fetched
          <h1>Loading...</h1>
        ) : (
          <>
            {blogs.length > 0 && (
              <div className="left">
                <h2>{blogs[0].title}</h2>
                <p>{blogs[0].body}</p>
                {blogs[0].author} <br />
                {blogs[0].category} <br />
                {blogs[0].createdAt} <br />                
              </div>

            )}
            <div className="right">
              {blogs.slice(1).map((data) => (
                <li key={data._id}>
                  {data.title} <br />
                  {data.body} <br />
                  {data.author} <br />
                  {data.category} <br />
                  {data.createdAt} <br />
                </li>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Blog;
