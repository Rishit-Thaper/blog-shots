import React,{useState} from 'react'

function Category() {
    
    const[category, setCategory] = useState("all");
    
    const handleSubmit = async (e:any)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:8000/api/blogs/categories/${category}`,{
          method: 'GET',
          mode:'cors',
        });

        if(!response.ok){
          console.log("error in getting data");
        }
        const data = await response.json();
        console.log(data);
    }
  return (
    <div><div className="category-section">
    <h2>Category</h2>
    <form onSubmit={handleSubmit}>
      
      <input 
        type="radio" 
        name="category" 
        value="Tech" 
        id="tech" 
        checked={category === "Tech"} 
        onChange={e=>{setCategory(e.target.value)}}
      />
      <label htmlFor="tech">Technology</label><br />
      
      <input 
        type="radio" 
        name="category" 
        value="Lifestyle" 
        id="lifestyle" 
        checked={category === "Lifestyle"} 
        onChange={e=>{setCategory(e.target.value)}} 
      />
      <label htmlFor="lifestyle">Lifestyle</label><br />
      
      <input 
        type="radio" 
        name="category" 
        value="Education" 
        id="education" 
        checked={category === "Education"} 
        onChange={e=>{setCategory(e.target.value)}} 
      />
      <label htmlFor="education">Education</label><br />
      
      <input 
        type="radio" 
        name="category" 
        value="Entertainment" 
        id="entertainment" 
        checked={category === "Entertainment"} 
        onChange={e=>{setCategory(e.target.value)}} 
      />
      <label htmlFor="entertainment">Entertainment</label><br />
      
      <input 
        type="radio" 
        name="category" 
        value="Inspiring" 
        id="inspiring" 
        checked={category === "Inspiring"} 
        onChange={e=>{setCategory(e.target.value)}} 
      />
      <label htmlFor="inspiring">Science</label><br />
      
      <input 
        type="radio" 
        name="category" 
        value="Fashion" 
        id="fashion" 
        checked={category === "Fashion"} 
        onChange={e=>{setCategory(e.target.value)}} 
      />
      <label htmlFor="fashion">Fashion</label><br />
        
      <button>Get Shots</button>
    </form>
  </div></div>
  )
}

export default Category