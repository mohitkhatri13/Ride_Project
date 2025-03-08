import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [captainData, setCaptainData] = useState({});

  const submithandler = (e) => {
    e.preventDefault();
    setCaptainData({
      fullName: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
    });
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <div className="p-7 flex h-screen flex-col justify-between  ">
        <div>
          <h2 className="text-3xl font-bold mb-10 ">Airvata</h2>
          <form onSubmit={(e) => submithandler(e)}>
            <h3 className="text-lg font-medium mb-2">What's out Captain's name</h3>
            <div className=" flex gap-x-4 mb-5">
              <input
                className="bg-[#eeeeee]  w-1/2 rounded px-4 py-2 border  text-lg placeholder:text-base"
                required
                type="text"
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
                placeholder="First name"
              ></input>

              <input
                className="bg-[#eeeeee] w-1/2  rounded px-4 py-2 border  text-lg placeholder:text-base"
                required
                type="text"
                value={lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
                placeholder="Last name"
              ></input>
            </div>

            <h3 className="text-lg font-medium mb-2">Whats our Captain's Email</h3>
            <input
              className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
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
              className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              required
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
            />
            <button className="bg-[#111] mb-5 mt-5 rounded px-4 py-2  w-full text-[#fff] font-semibold placeholder:text-base">
              Login
            </button>
          </form>
          <p className="text-center text-lg">
            Already have an Account ?{" "}
            <NavLink to={"/captainlogin"} className={`text-lg text-blue-400`}>
              Login
            </NavLink>{" "}
          </p>
        </div>
        <div className="mb-4 ">
          <p className="">By proceeding, you cansent to get calls ...</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignup;
