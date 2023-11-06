import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
function Navbar() {

  const logout = useLogout();
  const {author} = useAuthContext();

  const handleLogout = () =>{
    logout.handleLogout();
  }
  console.log(author);

  return (
    <div className="navbar">
      <div className="logo">
        <Link to='/'><h1>BlogShots</h1></Link>
      </div>
      <div className='navlinks'>
        <Link to="/addBlog"><button>Create a Shot</button></Link>
        {author && (
              <>
                <Link to='/profile'>{author.name}</Link>        
              </>
            )}
        <Link to="/profile"><button>Profile</button></Link>
        <Link to="/login"><button>Login</button></Link>
        <Link to= "" onClick={handleLogout}><button>Logout</button></Link>
      </div>  
    </div>
  )
}

export default Navbar;