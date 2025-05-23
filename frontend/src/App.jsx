import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import UserSignup from "./pages/UserSignup";
import Start from "./pages/Start";
import UserLogout from "./pages/UserLogout";
import CaptainHome from "./pages/CaptainHome";
import UserProtectedRoute from "./pages/UserProtectedRoute";
import CaptainProtextWrapper from "./pages/CaptainProtextWrapper";
import Riding from "../src/pages/Riding.jsx";
import CaptainRiding from "./pages/CaptainRiding.jsx";
import { initializeSocket } from "./Slice/socketSlice.js";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import LiveTracking from "./Components/LiveTracking.jsx";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("initialization");
    dispatch(initializeSocket());
  }, [dispatch]);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route path="/userlogin" element={<UserLogin />}></Route>
        <Route path="/riding" element={<Riding />}></Route>
        <Route path="/usersignup" element={<UserSignup />}></Route>
        <Route path="/captainlogin" element={<CaptainLogin />}></Route>
        <Route path="/captainsignup" element={<CaptainSignup />}></Route>
        <Route path="/captain-riding" element={<CaptainRiding />}></Route>
        <Route path="/temp" element ={<LiveTracking/>}></Route>
        <Route
          path="captain-home"
          element={
            <CaptainProtextWrapper>
              <CaptainHome />
            </CaptainProtextWrapper>
          }
        ></Route>
        <Route
          path="/home"
          element={
            <UserProtectedRoute>
              {" "}
              <Home />
            </UserProtectedRoute>
          }
        ></Route>
        <Route
          path="/user/logout"
          element={
            <UserProtectedRoute>
              <UserLogout />
            </UserProtectedRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
