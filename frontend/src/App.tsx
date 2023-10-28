import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import AddBlog from './pages/AddBlog'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Profile from './pages/Profile'
import Blog from './pages/Blog'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Blog/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/addblog" element={<AddBlog/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/addblog" element={<AddBlog/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App