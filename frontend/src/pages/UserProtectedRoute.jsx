import React , {useContext , useEffect , useState} from 'react'
import { UserDataContext } from '../context/usercontext'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const UserProtectedRoute = ({children}) => {
    const token  = localStorage.getItem('token');
     const navigate= useNavigate();
     const {user , setUser} = React.useContext(UserDataContext);
     const[isloading , setIsLoading] = useState(true);
  
      useEffect(()=>{
        if(!token){
            navigate('/userlogin')
           }
      } , [token]);

      axios
    .get(`${import.meta.env.VITE_API_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        setUser(response?.data?.captain);
        setIsLoading(false);
      }
    })
    .catch((err) => {
      localStorage.removeItem("token");
      navigate("/userlogin");
    });

  if (isloading) {
    return <div>IsLoading</div>;
  }

  return <div>{children}</div>;
  
}

export default UserProtectedRoute
