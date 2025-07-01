import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../Slice/userslice";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submithandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      userData
    );

    if (response.status === 200) {
      const data = response?.data;
      dispatch(setUser(data?.user));
      localStorage.setItem("token", data?.token);
      navigate("/home");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black p-4">
      {/* App Name */}
      <h2 className="text-white font-bold text-3xl mb-8 absolute top-6 left-6">
        Airavata
      </h2>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h2 className="text-center font-bold text-3xl text-gray-800">
            Welcome back
          </h2>
          <p className="text-center text-sm text-gray-600">
            New to Airavata?{" "}
            <NavLink to="/usersignup" className="text-blue-400 font-semibold">
              Create an account
            </NavLink>
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Login as User
          </h2>
          <form onSubmit={submithandler} className="flex flex-col gap-4">
            {/* Email Input */}
            <div>
              <label className="block text-lg text-gray-700 mb-1" htmlFor="email">
                Email
              </label>
              <input
                className="w-full p-2 rounded-lg border border-gray-300 placeholder:text-gray-400"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-lg text-gray-700 mb-1" htmlFor="password">
                Password
              </label>
              <input
                className="w-full p-2 rounded-lg border border-gray-300 placeholder:text-gray-400"
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition-all duration-300"
            >
              Log In
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-600">
          New here?{" "}
          <NavLink to="/usersignup" className="text-blue-400 font-semibold">
            Create new Account
          </NavLink>
        </p>
      </div>

      {/* Captain Login */}
      <div className="mt-8 w-full max-w-xs">
        <NavLink
          to="/captainlogin"
          className="block w-full p-3 bg-orange-500 text-white font-bold text-center rounded-lg hover:bg-orange-600 transition-all duration-300"
        >
          Sign in as Captain
        </NavLink>
      </div>
    </div>
  );
};

export default UserLogin;
