import React from 'react'

function AddBlog() {

  const [body, setBody] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [image, setImage] = React.useState('');
  const [wordCount, setWordCount] = React.useState(0);
  const[author, setAuthor] = React.useState('')
  const wordLimit = 150;
  
  const handleChange = (e:any)=>{
    
    setBody(e.target.value);
    
    const word = body.trim().split(/\s+/).filter(Boolean);
    setWordCount(word.length);

    if(word.length > wordLimit){
      const truncatedText = word.slice(0, wordLimit).join(" ");
      setBody(truncatedText);
      setWordCount(wordLimit);
    }

  }

  const handleSubmit=(e:any)=>{
    e.preventDefault();

    const blog = {title, category, image, body, author};
    

    console.log("submitted");
  }

  return (
    <div>
      
      <h2>Create Your Shots</h2>
      
      <div className="form">

        <form id='addBlog' method='post' onSubmit={handleSubmit}>

          <input type="text" required value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Shot Title'/>

          <select name="category" id="category" form="addBlog" value={category} onChange={(e)=>setCategory(e.target.value)}>
            <option value="all">Category</option>
            <option value="Education">Education</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Fashion">Fashion</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Technology">Technology</option>
            <option value="Motivation">Motivation</option>
          </select><br />
          <input type="text" required value={author} onChange={(e)=>setAuthor(e.target.value)} placeholder='Author'/> <br />

          <label htmlFor="image" >Select Cover Image</label><br />
          <input type="file" name="image" id="" accept="image/jpeg" value={image} onChange={(e)=>setImage(e.target.value)}/><br />

          <textarea name="blogContent" onChange={handleChange} value={body} cols = {30} rows= {10} placeholder='Shot Content'></textarea><br />
          <p>{wordCount}/{wordLimit}</p>
          <button>Add Shot</button>

        </form>

      </div>
      
    </div>
  )
}

export default AddBlog