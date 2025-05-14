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
    <div>
      <div className="flex flex-col justify-center items-center h-screen bg-black gap-y-10">
        {/* Logo */}
        <div>
          <h2 className="text-white absolute font-bold text-3xl left-10 top-6">
            Airavata
          </h2>
        </div>

        {/* Signup Form */}
        <div className="flex flex-col items-center justify-center w-[30%] p-8 bg-white rounded-lg shadow-lg">
          <div className="mt-6 mb-6 flex flex-col gap-3">
            <h2 className="text-center font-bold text-3xl text-gray-800">
              Create Account
            </h2>
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <NavLink
                to="/userlogin"
                className="text-blue-400 font-semibold"
              >
                Log In
              </NavLink>
            </p>
          </div>

          <div className="w-full">
            <form onSubmit={submithandler}>
              {/* Name Fields */}
              <div className="flex gap-x-4 mb-4">
                <input
                  className="w-1/2 p-2 rounded-lg border border-gray-300 placeholder:text-gray-400"
                  required
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  placeholder="First name"
                />
                <input
                  className="w-1/2 p-2 rounded-lg border border-gray-300 placeholder:text-gray-400"
                  required
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  placeholder="Last name"
                />
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <input
                  className="w-full p-2 rounded-lg border border-gray-300 placeholder:text-gray-400"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                />
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <input
                  className="w-full p-2 rounded-lg border border-gray-300 placeholder:text-gray-400"
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>

              {/* Submit Button */}
              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full p-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition-all duration-300"
                >
                  Create User Account
                </button>
              </div>
            </form>
          </div>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <NavLink to="/userlogin" className="text-blue-400">
              Login
            </NavLink>
          </p>
        </div>

        {/* Captain Signup Link */}
        {/* <div className="mt-6 md:w-1/2 flex justify-center items-center">
          <NavLink
            to="/captainsignup"
            className="w-[30%] p-2 bg-orange-500 text-white font-bold text-center rounded-lg hover:bg-orange-600 transition-all duration-300"
          >
            Sign up as Captain
          </NavLink>
        </div> */}

        {/* Bottom Text */}
        <div className="mb-4">
          <p className="text-gray-400 text-sm text-center">
            By proceeding, you consent to get calls, WhatsApp or SMS from us for verification.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
