import './App.scss'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import AddBlog from './pages/AddBlog'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Profile from './pages/Profile'
import Blog from './pages/Blog'
import { useAuthContext } from './hooks/useAuthContext'

function App() {

  const {author} = useAuthContext();
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={author ? <Blog/> : <Navigate to="/login"/>}/>
          <Route path="/login" element={!author ? <Login/> : <Navigate to="/"/> }/>
          <Route path="/signup" element={!author ? <SignUp/> : <Navigate to="/"/>}/>
          <Route path="/addBlog" element={author ? <AddBlog/> : <Navigate to="/login"/>}/>
          <Route path="/profile" element={author ? <Profile/> : <Navigate to="/login"/> }/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App