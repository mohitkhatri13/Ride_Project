import React from "react";
import carimage from "../assets/carimage.jpeg";
import bikeimage from "../assets/bikeimage.jpeg";
import autoimage from "../assets//autoimage3.jpeg";
import { FaUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
const VehiclePanel = (props) => {
  return (
    <div className=" flex flex-col items-center ">
      <div className="flex  items-center justify-between ">
        <h2 className="font-bold text-3xl p-4 mb-4">Select a Vehicle</h2>
        <h4
          onClick={() => {
            props.setVehiclePanel(false);
          }}
          className="text-4xl px-4 font-semibold   hover:scale-x-80 duration-300"
        >
          <IoIosArrowDown />
        </h4>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.setVehicleType("car");
        }}
        className="bg-white  border-2  rounded-xl border-gray-300 active:border-black mb-5   p-4 w-[90%] flex items-center justify-between"
      >
        <img className="h-15" src={carimage} alt="" />
        <div>
          <h4 className="flex gap-x-4 items-center text-lg font-semibold">
            AirGo{" "}
            <span>
              <FaUser />
            </span>
            4
          </h4>
          <h5 className=" text-lg font-semibold"> 2 mins away</h5>
          <p className=" text-sm font-semibold text-gray-600">
            Affordable, Compact rides
          </p>
        </div>
        <h2 className="text-xl font-bold">Rs. {props.fare.car}</h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.setVehicleType("moto");
        }}
        className="bg-white mb-5   border-2  rounded-xl border-gray-300 gap-x-2 active:border-black p-4 w-[90%] flex items-center justify-between"
      >
        <img className="h-18 scale-120" src={bikeimage} alt="" />
        <div>
          <h4 className="flex gap-x-4 items-center text-lg font-semibold">
            AirMoto{" "}
            <span>
              <FaUser />
            </span>
            1
          </h4>
          <h5 className=" text-lg font-semibold"> 2 mins away</h5>
          <p className=" text-sm font-semibold text-gray-600">
            Affordable, motorcycles rides
          </p>
        </div>
        <h2 className="text-xl font-bold">Rs. {props.fare.moto}</h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.setVehicleType("auto");
        }}
        className="bg-white mb-5  border-2  rounded-xl border-gray-300 active:border-black p-4 w-[90%] flex items-center justify-between"
      >
        <img className="h-10 scale-120" src={autoimage} alt="" />
        <div>
          <h4 className="flex gap-x-4 items-center text-lg font-semibold">
            AirAuto{" "}
            <span>
              <FaUser />
            </span>
            3
          </h4>
          <h5 className=" text-lg font-semibold"> 2 mins away</h5>
          <p className=" text-sm font-semibold text-gray-600">
            Affordable, Auto rides
          </p>
        </div>
        <h2 className="text-xl font-bold">Rs. {props.fare.auto}</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
