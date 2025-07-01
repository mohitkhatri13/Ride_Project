import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../Slice/userslice";
import axios from "axios";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submithandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser
    );

    if (response.status === 201) {
      const data = response?.data;
      localStorage.setItem("token", data?.token);
      dispatch(setUser(data?.user));
      navigate("/home");
    }

    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black p-4 relative">
      {/* Logo */}
      <h2 className="text-white absolute font-bold text-3xl top-6 left-6">
        Airavata
      </h2>

      {/* Signup Form */}
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h2 className="text-center font-bold text-3xl text-gray-800">
            Create Account
          </h2>
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <NavLink to="/userlogin" className="text-blue-400 font-semibold">
              Log In
            </NavLink>
          </p>
        </div>

        <form onSubmit={submithandler} className="flex flex-col gap-4 w-full">
          {/* Name Fields */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <input
              className="w-full sm:w-1/2 p-2 rounded-lg border border-gray-300 placeholder:text-gray-400"
              required
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="First name"
            />
            <input
              className="w-full sm:w-1/2 p-2 rounded-lg border border-gray-300 placeholder:text-gray-400"
              required
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Last name"
            />
          </div>

          {/* Email */}
          <input
            className="w-full p-2 rounded-lg border border-gray-300 placeholder:text-gray-400"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
          />

          {/* Password */}
          <input
            className="w-full p-2 rounded-lg border border-gray-300 placeholder:text-gray-400"
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition-all duration-300"
          >
            Create User Account
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <NavLink to="/userlogin" className="text-blue-400 font-semibold">
            Login
          </NavLink>
        </p>
      </div>

      {/* Bottom Text */}
      <p className="mt-6 text-gray-400 text-sm text-center max-w-sm">
        By proceeding, you consent to get calls, WhatsApp or SMS from us for verification.
      </p>
    </div>
  );
};

export default UserSignup;
