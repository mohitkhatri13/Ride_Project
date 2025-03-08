
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import UserSignup from './pages/UserSignup'
const App = () => {
  return (
    <div > 
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/userlogin' element={<UserLogin/>}></Route>
        <Route path='/usersignup' element={<UserSignup/>}></Route>
        <Route path='/captainlogin' element={<CaptainLogin/>}></Route>
        <Route path='/captainsignup' element={<CaptainSignup/>}></Route>
      </Routes>
    </div>
  )
}

export default App
