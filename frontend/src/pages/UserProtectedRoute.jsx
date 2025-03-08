import React , {useContext , useEffect} from 'react'
import { UserDataContext } from '../context/usercontext'
import { useNavigate } from 'react-router-dom'

const UserProtectedRoute = ({children}) => {
    const token  = localStorage.getItem('token');
     const navigate= useNavigate();
  
      useEffect(()=>{
        if(!token){
            navigate('/userlogin')
           }
      } , [token])
  return (
    <div>
      {children}
    </div>
  )
}

export default UserProtectedRoute
