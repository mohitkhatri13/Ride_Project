import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
  };

  return (
    <div className="flex flex-col justify-center items-center h-full min-h-screen bg-black">
      <h2 className="text-white absolute font-bold text-3xl left-10 top-6">Airvata</h2>

      <div className="w-[35%] bg-white rounded-lg shadow-lg p-8">
      <h2 className="font-bold text-3xl mb-10 text-center">Register as Captain!</h2>
        <form onSubmit={submithandler} className="w-full">
          <h3 className=" font-medium mb-2">What's our Captain's name</h3>
          <div className="flex gap-4 mb-5">
            <input
              className="w-1/2 p-1 rounded-lg border border-gray-300 placeholder:text-gray-400"
              required
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="First name"
            />
            <input
              className="w-1/2 p-1 rounded-lg border border-gray-300 placeholder:text-gray-400"
              required
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Last name"
            />
          </div>

          <h3 className=" font-medium mb-2">What's our Captain's Email</h3>
          <input
            className="w-full p-1 mb-5 rounded-lg border border-gray-300 placeholder:text-gray-400"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
          />

          <h3 className=" font-medium mb-2">Enter Password</h3>
          <input
            className="w-full p-1 mb-5 rounded-lg border border-gray-300 placeholder:text-gray-400"
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <h3 className=" font-medium mb-2">Vehicle Color</h3>
          <input
            className="w-full p-1 mb-5 rounded-lg border border-gray-300 placeholder:text-gray-400"
            required
            type="text"
            value={vehicleColor}
            onChange={(e) => setVehicleColor(e.target.value)}
            placeholder="Vehicle Color"
          />

          <h3 className=" font-medium mb-2">Vehicle Plate</h3>
          <input
            className="w-full p-1 mb-5 rounded-lg border border-gray-300 placeholder:text-gray-400"
            required
            type="text"
            value={vehiclePlate}
            onChange={(e) => setVehiclePlate(e.target.value)}
            placeholder="Vehicle Plate"
          />
             <div className="flex gap-x-4">
          {/* <h3 className=" font-medium mb-2">Vehicle Capacity</h3> */}
          <input
            className="w-full p-1 mb-5 rounded-lg border border-gray-300 placeholder:text-gray-400"
            required
            type="number"
            value={vehicleCapacity}
            onChange={(e) => setVehicleCapacity(e.target.value)}
            placeholder="Vehicle Capacity"
          />

          {/* <h3 className=" font-medium mb-2">Vehicle Type</h3> */}
          <select
            className="w-full p-1 mb-5 rounded-lg border border-gray-300 placeholder:text-gray-400"
            required
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
          >
            <option value="" disabled>Select Vehicle Type</option>
            <option value="car">Car</option>
            <option value="auto">Auto</option>
            <option value="moto">Moto</option>
          </select>
          </div>

          <button
            type="submit"
            className="w-full p-1 bg-[#111] text-white font-semibold rounded-lg hover:bg-[#222] transition-all duration-300 mt-2 mb-5"
          >
            Create Captain's Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <NavLink to="/captainlogin" className="text-blue-400 font-semibold">
            Login
          </NavLink>
        </p>
      </div>

      <div className="w-[35%] mt-4 text-white text-sm text-center">
        <p>By proceeding, you consent to get calls ...</p>
      </div>
    </div>
  );
};

export default CaptainSignup;
