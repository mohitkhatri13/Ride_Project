import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCaptain } from "../Slice/captainslice";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submithandler = async (e) => {
    e.preventDefault();
    const captainData = {
      email: email,
      password: password,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/login`,
      captainData
    );
    if (response.status === 200) {
      const data = response?.data;
      console.log("data", data.captain);
      dispatch(setCaptain(data.captain));
      localStorage.setItem("captaintoken", data?.token);
      navigate("/captain-home");
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen bg-black gap-y-10">
        {/* Header */}
        <h2 className="text-white absolute font-bold text-3xl left-10 top-6">Airvata</h2>

        {/* Form box */}
        <div className="flex flex-col items-center justify-center w-[30%] p-8 bg-white rounded-lg shadow-lg">
           <h2 className="font-bold text-3xl mb-10">Welcome back Captain!</h2>
          <form onSubmit={submithandler} className="w-full">
            <h3 className="block text-lg font-medium text-gray-700 mb-2">What's your Email</h3>
            <input
              className="w-full p-1 px-2 mb-6 rounded-lg border border-gray-300 placeholder:text-gray-400"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
            />
            <h3 className="block text-lg font-medium text-gray-700 mb-2">Enter Password</h3>
            <input
              className="w-full p-1 px-2 mb-6 rounded-lg border border-gray-300 placeholder:text-gray-400"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button
              type="submit"
              className="w-full p-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all duration-300 mb-4"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Join a fleet?{" "}
            <NavLink to="/captainsignup" className="text-blue-400 font-semibold">
              Register as Captain
            </NavLink>
          </p>
        </div>

        {/* Original "Sign in as User" button preserved */}
        <div className="mt-2 w-[30%]">
          <NavLink
            to="/userlogin"
            className="w-full block text-center p-2 bg-white text-black font-bold rounded-lg hover:scale-95 transition-all duration-300"
          >
            Sign in as User
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default CaptainLogin;
