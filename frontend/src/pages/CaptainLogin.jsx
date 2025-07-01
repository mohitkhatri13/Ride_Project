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
    const captainData = { email, password };
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
    <div className="min-h-screen flex flex-col justify-center items-center bg-black p-4 relative">
      {/* Header */}
      <h2 className="text-white absolute font-bold text-3xl top-6 left-6">Airvata</h2>

      {/* Form Box */}
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg flex flex-col gap-6">
        <h2 className="font-bold text-3xl text-center">Welcome back Captain!</h2>
        <form onSubmit={submithandler} className="flex flex-col gap-4 w-full">
          <div>
            <h3 className="block text-lg font-medium text-gray-700 mb-1">What's your Email</h3>
            <input
              className="w-full p-2 rounded-lg border border-gray-300 placeholder:text-gray-400"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
            />
          </div>
          <div>
            <h3 className="block text-lg font-medium text-gray-700 mb-1">Enter Password</h3>
            <input
              className="w-full p-2 rounded-lg border border-gray-300 placeholder:text-gray-400"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all duration-300"
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

      {/* Sign in as User Button */}
      <div className="mt-6 w-full max-w-xs">
        <NavLink
          to="/userlogin"
          className="block w-full text-center p-3 bg-white text-black font-bold rounded-lg hover:scale-95 transition-all duration-300"
        >
          Sign in as User
        </NavLink>
      </div>
    </div>
  );
};

export default CaptainLogin;
