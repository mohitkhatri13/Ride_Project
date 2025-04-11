import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCaptain } from "../Slice/captainslice";
const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const submithandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`,
      captainData
    );

    if (response.status === 201) {
      const data = response?.data;
      console.log("signupdata", data);
      dispatch(setCaptain(data.captain));
      localStorage.setItem("captaintoken", data?.token);
      navigate("/captain-home");
    }

    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
    setCaptain(captainData);
  };

  return (
    <div>
      <div className="p-7 flex h-screen flex-col justify-between  ">
        <div>
          <h2 className="text-3xl font-bold mb-10 ">Airvata</h2>
          <form onSubmit={(e) => submithandler(e)}>
            <h3 className="text-lg font-medium mb-2">
              What's out Captain's name
            </h3>
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

            <h3 className="text-lg font-medium mb-2">
              Whats our Captain's Email
            </h3>
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

            <h3 className="text-lg font-medium mb-2">Vehicle Color</h3>
            <input
              className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              required
              type="text"
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value);
              }}
              placeholder="Vehicle Color"
            />

            <h3 className="text-lg font-medium mb-2">Vehicle Plate</h3>
            <input
              className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              required
              type="text"
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value);
              }}
              placeholder="Vehicle Plate"
            />

            <h3 className="text-lg font-medium mb-2">Vehicle Capacity</h3>
            <input
              className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              required
              type="number"
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value);
              }}
              placeholder="Vehicle Capacity"
            />

            <h3 className="text-lg font-medium mb-2">Vehicle Type</h3>
            <select
              className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              required
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value);
              }}
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
            <button className="bg-[#111] mb-5 mt-5 rounded px-4 py-2  w-full text-[#fff] font-semibold placeholder:text-base">
              Create Captain's Account
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
