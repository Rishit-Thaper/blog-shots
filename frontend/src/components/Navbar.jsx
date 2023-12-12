import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

export default function Navbar() {
  const {author} = useAuthContext();
  // const [authorInfo, setAuthorInfo] = useState(author);

  // useEffect(() => {
  //   // Update the authorInfo state variable whenever the AuthContext state changes.
  //   setAuthorInfo(author);
  // }, [author]);
  const {logout} = useLogout()

  const handleClick = ()=>{
    logout();
  }
  return (
    <div>
      <div className="navbar">
        <div className="logo">
          <Link to="/"><h1>BlogShots</h1></Link>

        </div>
        <div className="navLinks">
        <nav>
            {author && (
              <nav>
                <Link to="/addBlog"><button>Create Shot</button></Link>
                <Link className='authorname' to="/profile"><button>{author?.author.name}</button></Link>        
                <Link className='logout' onClick={handleClick}><button>Logout</button></Link>
              </nav>
            )}
            {!author && (
              <>
                <nav>
                  <Link to="/login"><button>Login</button></Link>
                  <Link to="/signup"><button>Signup</button></Link> 
                </nav> 
              </>
            )}

        </nav>
        </div>
      </div>
    </div>
  )
}
