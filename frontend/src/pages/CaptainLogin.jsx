import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
      <div className="p-7 flex h-screen flex-col justify-between  ">
        <div>
          <h2 className="text-3xl font-bold mb-10 ">Airvata</h2>
          <form onSubmit={(e) => submithandler(e)}>
            <h3 className="text-lg font-medium mb-2">Whats your Email</h3>
            <input
              className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              required
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="email@example.com"
            ></input>
            <h3 className="text-lg font-medium mb-2">Enter Password</h3>
            <input
              className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              required
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
            />
            <button className="bg-[#111] mb-7 rounded px-4 py-2  w-full text-[#fff] font-semibold placeholder:text-base">
              Login
            </button>
          </form>
          <p className="text-center text-lg">
            Join a fleet ?{" "}
            <NavLink to={"/captainsignup"} className={`text-lg text-blue-400`}>
              Register as as Captain
            </NavLink>{" "}
          </p>
        </div>
        <div className="mb-4 ">
          <NavLink
            to={"/userlogin"}
            className="bg-[#d5622d] text-white text-lg text-center font-bold inline-block  w-full py-3 rounded mt-5 "
          >
            Sign in as User
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default CaptainLogin;
