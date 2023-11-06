import React, { useEffect, useState } from 'react';
import image from '../assets/image.jpg';
function Blog() {

  interface BlogItem {
    _id: string;
    title: string;
    body: string;
    author: string;
    image: string;
    category: string;
    createdAt: string;
  }
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true); 

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
      
      {loading ? ( 
        <h1>Loading...</h1>
      ) : (

        <div className='blogDivs'>
    
          <div className="leftDiv">
            {blogs.length > 0 && (
              <div className="left">
                <div className="image">
                  <img src={`http://localhost:8000/${blogs[0].image}`} alt="blog_image" />
                </div>
                <div className="leftBlogContent">
                  <h2>{blogs[0].title}</h2>
                  <p>{blogs[0].body}</p>
                  <p>{blogs[0].author}</p>
                  <p>{blogs[0].category}</p>
                  <p>{blogs[0].createdAt}</p>
                </div>                
              </div>
            )}
          </div>
  
          <div className="rightDiv">
            {blogs.slice(1).map((data) => (
              <div className="right">
                <div className="image">
                  <img src={`http://localhost:8000/${data.image}`} alt="blog_image" />
                </div>
                <div className="rightBlogContent">
                  <h2>{data.title}</h2>
                  <p>{data.body}</p>
                  <p>{data.author}</p>
                  <p>{data.category}</p>
                  <p>{data.createdAt}</p>                
                </div>
              </div>
            ))}  
          </div>
          
        </div>
      
      )}
    
    </div>
 
  );
}

export default Blog;
