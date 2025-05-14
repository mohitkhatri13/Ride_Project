import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
      console.log("data", data);
      dispatch(setUser(data?.user));
      localStorage.setItem("token", data?.token);
      navigate("/home");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <div className="flex flex-col  justify-center items-center h-screen bg-black gap-y-10">
        {/* Form Section */}
        <div>
          <h2 className="text-white absolute flex font-bold text-3xl  left-10 top-6">Airavata</h2>
        </div>
        <div className="flex flex-col items-center justify-center w-[30%] p-8 bg-white rounded-lg shadow-lg">
          <div className="mt-6 mb-6 flex flex-col gap-3">
            <h2 className="text-center md:text-left font-bold text-3xl text-gray-800">
              Welcome back
            </h2>
            <p className="text-center md:text-left text-sm text-gray-600">
              New to Airavata?{" "}
              <NavLink to="/usersignup" className="text-blue-400 font-semibold">
                Create an account
              </NavLink>
            </p>
          </div>

          <div className="w-full">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Login as User
            </h2>
            <form onSubmit={submithandler}>
              {/* Email Input */}
              <div className="mb-4">
                <label
                  className="block text-lg text-gray-700 mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full p-2 rounded-lg border border-gray-300   placeholder:text-gray-400"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                />
              </div>

              {/* Password Input */}
              <div className="mb-6">
                <label className="block  text-gray-700 mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="w-full p-2 rounded-lg border border-gray-300  placeholder:text-gray-400"
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>

              {/* Login Button */}
              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full p-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition-all duration-300"
                >
                  Log In
                </button>
              </div>
            </form>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600">
            New here?{" "}
            <NavLink to="/usersignup" className="text-blue-400">
              Create new Account
            </NavLink>
          </p>
        </div>

        {/* Captain Login Link */}
        <div className="mt-6 md:mt-0 md:w-1/2 flex justify-center items-center">
          <NavLink
            to="/captainlogin"
            className="w-[30%] p-2 bg-orange-500 text-white font-bold text-center rounded-lg hover:bg-orange-600 transition-all duration-300"
          >
            Sign in as Captain
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default UserLogin;
