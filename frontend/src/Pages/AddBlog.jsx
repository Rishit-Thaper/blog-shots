import React,{useState, useEffect} from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import {useNavigate} from 'react-router-dom';
export default function AddBlog() {

  const {author} = useAuthContext();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');

  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const wordLimit = 150;

  const handleChange = (e) => {
    const inputText = e.target.value;
    setText(inputText);

    const words = inputText.trim().split(/\s+/).filter(Boolean);
    setWordCount(words.length);

    if (words.length > wordLimit) {
      const truncatedText = words.slice(0, wordLimit).join(' ');
      setText(truncatedText);
      setWordCount(wordLimit);
    }
  };

  // console.log(author);
  // console.log(author.author.name);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const formData = new FormData();

    formData.append('title', title);
    formData.append('body', text);
    formData.append('category', category);
    formData.append('image', image);
    formData.append('author', author.author.name);
    
    try{
      const response = await fetch('http://localhost:8000/api/blogs/addshots',{
        method: 'POST',
        mode: 'cors',
        headers:{
          'Authorization': `Bearer ${author.token}`
        },
        body: formData,
      })
      if(response.ok){
        const json = await response.json();
        console.log(json);
        alert("Shot successfully created");
        navigate('/')
      }
    }catch(error){
      console.log(error);
    }
  }
  useEffect(() => {
    console.log(author);
    console.log(author.author.name);
  }, []);
  return (
    <div className='mainBlogFormDiv'>
      
      <div className="blogFormDiv">
        <h1>Create & Shine: Your Shot, Your Stage</h1>
        <form onSubmit={handleSubmit} className='blogForm' encType="multipart/form-data">
          
          <input type="text" placeholder='Shot Title' name='title' value={title} onChange={(e)=>setTitle(e.target.value)} required/> <br />

          <div className="file-category">

            <select name="category" id="category" required value={category} onChange={(e)=> setCategory(e.target.value)}>
              <option className='option' style={{padding:'1rem'}} value="none">Select a category</option>
              <option className='option' style={{padding:'1rem'}} value="Current">Current Affairs</option>
              <option className='option' style={{padding:'1rem'}} value="Entertainment">Entertainment</option>
              <option className='option' style={{padding:'1rem'}} value="Technology">Technology</option>
              <option className='option' style={{padding:'1rem'}} value="Fashion">Fashion</option>
              <option className='option' style={{padding:'1rem'}} value="Lifestyle">Lifestyle</option>
              <option className='option' style={{padding:'1rem'}} value="Science">Science</option>
              <option className='option' style={{padding:'1rem'}} value="Sports">Sports</option>
            </select>

            <input type="file" accept="image/jpeg" name="image" id="file" placeholder='Shot Banner'required onChange={(e)=>setImage(e.target.files[0])}/>

          </div>

          <textarea name="body" id="" cols="90" rows="10" placeholder='Shot Body' value={text} required onChange={handleChange}></textarea><br />
      
          <p>{wordCount} / {wordLimit} words</p>
      
          <input type="hidden" name="author" value={author.author.name}/>
      
          <button>Add Shot</button>
      
        </form>
      
      </div>
      
    </div>
  )
}
