import React from 'react'
import { Link } from 'react-router-dom'
import{IoCreateOutline} from 'react-icons/io5'
function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <h1>BlogShots</h1>
      </div>
      <div className='navlinks'>
        <Link to="/addBlog"><button>Create a Shot</button></Link>
        <Link to="/profile"><button>Profile</button></Link>
        <Link to="/login"><button>Login</button></Link>
        <Link to="/signup"><button>Logout</button></Link>
      </div>  
    </div>
  )
}

export default Navbar;