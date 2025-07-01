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
      fullname: { firstname, lastname },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType
      },
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`,
      captainData
    );

    if (response.status === 201) {
      const data = response?.data;
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
    <div className="min-h-screen flex flex-col justify-center items-center bg-black p-4 relative">
      {/* Header */}
      <h2 className="text-white absolute font-bold text-3xl top-6 left-6">Airvata</h2>

      {/* Form Card */}
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 flex flex-col gap-6">
        <h2 className="font-bold text-3xl text-center">Register as Captain!</h2>
        
        <form onSubmit={submithandler} className="flex flex-col gap-4 w-full">
          {/* Name Fields */}
          <div>
            <h3 className="font-medium mb-2">What's our Captain's name</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                className="w-full p-2 rounded-lg border border-gray-300 placeholder:text-gray-400"
                required
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                placeholder="First name"
              />
              <input
                className="w-full p-2 rounded-lg border border-gray-300 placeholder:text-gray-400"
                required
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                placeholder="Last name"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <h3 className="font-medium mb-2">What's our Captain's Email</h3>
            <input
              className="w-full p-2 rounded-lg border border-gray-300 placeholder:text-gray-400"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <h3 className="font-medium mb-2">Enter Password</h3>
            <input
              className="w-full p-2 rounded-lg border border-gray-300 placeholder:text-gray-400"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          {/* Vehicle Color */}
          <div>
            <h3 className="font-medium mb-2">Vehicle Color</h3>
            <input
              className="w-full p-2 rounded-lg border border-gray-300 placeholder:text-gray-400"
              required
              type="text"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              placeholder="Vehicle Color"
            />
          </div>

          {/* Vehicle Plate */}
          <div>
            <h3 className="font-medium mb-2">Vehicle Plate</h3>
            <input
              className="w-full p-2 rounded-lg border border-gray-300 placeholder:text-gray-400"
              required
              type="text"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              placeholder="Vehicle Plate"
            />
          </div>

          {/* Capacity & Type */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              className="w-full p-2 rounded-lg border border-gray-300 placeholder:text-gray-400"
              required
              type="number"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              placeholder="Vehicle Capacity"
            />
            <select
              className="w-full p-2 rounded-lg border border-gray-300 placeholder:text-gray-400"
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

          {/* Submit */}
          <button
            type="submit"
            className="w-full p-2 bg-[#111] text-white font-semibold rounded-lg hover:bg-[#222] transition-all duration-300 mt-2"
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

      {/* Bottom Consent */}
      <p className="mt-6 w-full max-w-md text-white text-sm text-center">
        By proceeding, you consent to get calls, WhatsApp or SMS from us for verification.
      </p>
    </div>
  );
};

export default CaptainSignup;
