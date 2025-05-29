import React from "react";
import carimage from "../assets/carimage.jpeg";
import { IoIosArrowDown } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { RiUserLocationLine } from "react-icons/ri";
import { FaIndianRupeeSign } from "react-icons/fa6";
const ConfirmRide = (props) => {
  return (
    <div  >
      <div className="flex flex-col items-center ">
        <h4
          onClick={() => {
            props.setConfirmRidePanel(false);
          }}
          className="text-4xl px-4 font-semibold text-center  hover:scale-x-80 duration-300"
        >
          <IoIosArrowDown />
        </h4>
        <h2 className="font-bold text-3xl text-center p-4 mb-4">
          Confirm Your Ride
        </h2>
      </div>
      <div className="flex flex-col justify-center items-center ">
        <img className="h-40 mb-5 " src={carimage} alt="" />
        <div className="w-[90%] text-xl">
          <div className="w-full border-b-2 flex items-center px-5">
            <div className="text-3xl">
              <RiUserLocationLine />
            </div>
            <div className="px-10 text-sm font-semibold py-4">
              <h3>562/11 A </h3>
              <p>{props.pickup}</p>
            </div>
          </div>

          <div className="w-full  border-b-2 flex items-center px-5">
            <div className="text-3xl">
              <IoLocationSharp />
            </div>
            <div className="px-10 text-sm font-semibold py-4">
              <h3>562/11 A </h3>
              <p>{props.destination}</p>
            </div>
          </div>

          <div className="w-full  flex items-center px-5">
            <div className="text-3xl">
              <FaIndianRupeeSign />
            </div>

            <div className="px-10 text-sm font-semibold py-4">
              <h3>Rs {props.fare[props.vehicleType]}</h3>
              <p>Cash</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            props.setVehicleFound(true);
            props.setConfirmRidePanel(false);
            props.setVehiclePanel(false);
            props.createRide();
          }}
          className="w-[80%] hover:scale-95 my-10 py-2 h-15 bg-gray-300 rounded-lg text-xl  font-bold"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
