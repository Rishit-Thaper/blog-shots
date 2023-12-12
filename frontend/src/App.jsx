import React,{useEffect} from 'react'
import './App.scss'
import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import AddBlog from './Pages/AddBlog'
import Profile from './Pages/Profile'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Update from './Pages/UpdateBlog'
import Blog from './Pages/Blog'
import { useAuthContext } from './hooks/useAuthContext'

export default function App() {
  const {author} = useAuthContext();

  return (
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={ author? <Home/> : <Navigate to="/login"/>}/>
          <Route path='/addBlog' element={ author? <AddBlog/> : <Navigate to="/login"/>}/>
          <Route path='/profile' element={ author? <Profile/> : <Navigate to="/login"/>}/>
          <Route path='/login' element={ !author? <Login/> : <Navigate to="/"/>}/>
          <Route path='/signup' element={ !author? <Signup/> : <Navigate to="/"/>}/>
          <Route path='/updateBlog/:id' element={ author? <Update/> : <Navigate to="/login"/>}/>
          <Route path='/blog/:id' element={ author? <Blog/> : <Navigate to="/login"/>}/>
        </Routes>
        <div>
          <Footer/>
        </div>
    </BrowserRouter>

    )
}
