
import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import useFetch from '../hooks/useFetch';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import formatDistanceToNow  from "date-fns/formatDistanceToNow"


function Home() {

  const truncatedText=(text)=>{
    const wordLimit = 40;
    if (text.length > wordLimit) {
      return text.slice(0, wordLimit); // Truncate the text and add ellipsis
    }
    return text;
  }
  const {author} = useAuthContext();
  const {blogs, load: loading} = useFetch('http://localhost:8000/api/blogs');
  console.log(blogs);

  const reverseBlogs = blogs.slice().reverse();
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 1920, min: 720 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 480, min: 0 },
      items: 1
    }
  };
  const categories = [...new Set(blogs.map(blog => blog.category))]; // Extract unique categories

  return (
    
    <div className="homepage">
      
      {loading ? ( 
        <h1>Loading...</h1>
      ) : (
      <div>
        
        <h2 id='category'>Blogshots Blend: Where Genres Collide and Stories Unfold</h2>
        
        <div className='carousel-section'>
            
            <Carousel className='carousel' responsive={responsive}>
                
                {reverseBlogs.map((data) => (
                  
                  <div className="home">
                    
                    <div className="image">
                      <img src={`http://localhost:8000/${data.image}`} alt="blog_image" />
                    </div>
                    
                    <div className="BlogContent" key={data._id}>
                      
                      <div className="autCat">
                          <p id='author'>{data.author}</p>
                          <p id='category'>{data.category}</p>
                      </div>
                      
                      <h2><Link to={`/blog/${data._id}`}>{data.title}</Link></h2>
                
                      <p>{truncatedText(data.body)}<Link to={`/blog/${data._id}`}>... read more</Link></p>
                      
                      <p>{formatDistanceToNow (new Date(data.createdAt), {addSuffix: true})}</p>                
                    
                    </div>
                  
                  </div>
            
            ))}  
            
            </Carousel>
        
        </div>
      
      {/* //Categorized sections */}

      {categories.map((category) => (
        
        <>
        
          <h2 id='category'>{category} Shots</h2>

          <Carousel className='carousel' responsive={responsive}>
        
            {reverseBlogs.filter(blog => blog.category === category).map((data) => (
              <div className="home">
        
                <div className="image">
                  <img src={`http://localhost:8000/${data.image}`} alt="blog_image" />
                </div>
        
                <div className="BlogContent" key={data._id}>
                    <div className="autCat">
                      <p id='author'>{data.author}</p>
                      <p id='category'>{data.category}</p>
                    </div>
                    <h2><Link to={`/blog/${data._id}`}>{data.title}</Link></h2>

                    <p>{truncatedText(data.body)}<Link to={`/blog/${data._id}`}>... read more</Link></p>
                    <p>{formatDistanceToNow (new Date(data.createdAt), {addSuffix: true})}</p>                
                </div>
              
              </div>
            
            ))}  
        
          </Carousel>
        
        </>
        
      ))}
      
      </div>
      
      )}

    </div>
 
  );
}
//   return (
    
//     <div className="homepage">
      
//       {loading ? ( 
//         <h1>Loading...</h1>
//       ) : (
//       <div>

      
      
//       </div>
      
//       )}

//     </div>
 
//   );
// }

export default Home;
