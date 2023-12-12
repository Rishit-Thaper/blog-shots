import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

export default function UpdateBlog() {
  const { author } = useAuthContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const blogID = id;
  const { blogs: blog, loading: load } = useFetch(`http://localhost:8000/api/blogs/${blogID}`);
  
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateCategory, setUpdateCategory] = useState('');
  const [updateText, setUpdateText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const wordLimit = 150;

  useEffect(() => {
    setUpdateTitle(blog.title || '');
    setUpdateCategory(blog.category || '');
    setUpdateText(blog.body || '');
  }, [blog]);

  const handleChange = (e) => {
    const inputText = e.target.value;
    setUpdateText(inputText);

    const words = inputText.trim().split(/\s+/).filter(Boolean);
    setWordCount(words.length);

    if (words.length > wordLimit) {
      const truncatedText = words.slice(0, wordLimit).join(' ');
      setUpdateText(truncatedText);
      setWordCount(wordLimit);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/api/blogs/update/${blogID}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${author.token}`
        },
        body: JSON.stringify({
          title: updateTitle,
          body: updateText,
          category: updateCategory,
        }),
      });

      if (response.ok) {
        const json = await response.json();
        console.log(json);
        alert('Blog updated successfully');
        navigate('/');
      } else {
        const error = await response.json();
        console.log(error);
        alert('Error updating blog');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {load ? (
        <h1>Loading...</h1>
      ) : (
        
          <div className='mainBlogFormDiv'>
      
      <div className="blogFormDiv">
        <h1>Update Your Shot</h1>
        <form onSubmit={handleSubmit} className='blogForm' encType="multipart/form-data">
          
          <input
            type="text"
            placeholder="Shot Title"
            name="title"
            value={updateTitle}
            onChange={(e) => setUpdateTitle(e.target.value)}
            required
          />

          <div className="file-category">

          <select
            name="category"
            value={updateCategory}
            onChange={(e) => setUpdateCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="Current">Current Affairs</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Technology">Technology</option>
            <option value="Fashion">Fashion</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Science">Science</option>
            <option value="Sports">Sports</option>
          </select>

          </div>

          <textarea
            name="body"
            cols="90"
            rows="10"
            placeholder="Blog Body"
            value={updateText}
            required
            onChange={handleChange}
          ></textarea>
            
          <input type="hidden" name="author" value={author.author.name}/>
      
          <p>
            {wordCount} / {wordLimit} words
          </p>
          <button type="submit">Update Blog</button>
      
        </form>
      
      </div>
      
    </div> )}
    </div>
  );
}
