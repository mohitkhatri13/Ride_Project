import React from "react";
import carimage from "../assets/carimage.jpeg";
import { IoIosArrowDown } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { RiUserLocationLine } from "react-icons/ri";
import { FaIndianRupeeSign } from "react-icons/fa6";

const RidePopUs = (props) => {
  return (
    <div>
      <div className="flex flex-col items-center ">
        <h4
          onClick={() => {
            props.setRidePopUpPanel(false);
          }}
          className="text-4xl px-4 font-semibold text-center  hover:scale-x-80 duration-300"
        >
          <IoIosArrowDown />
        </h4>
        <h2 className="font-bold text-4xl text-center p-4 mb-4">
          New Ride Avaiable!
        </h2>

        <div className="flex my-6 items-center justify-between w-[80%] bg-yellow-300 p-2 px-4 rounded-xl">
          <div className="flex gap-4 items-center ">
            <img
              className="h-20 w-20 rounded-full object-cover"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"
              alt=""
            />
            <h2 className="text-2xl font-medium ">
              {props?.ride?.user?.fullname?.firstname +
                " " +
                props?.ride?.user?.fullname?.lastname}
            </h2>
          </div>

          <h2 className="text-xl font-medium">2.2 km</h2>
        </div>
      </div>
      <div className="flex  flex-col  items-center ">
        <div className="w-[90%] text-xl ">
          <div className="w-full border-b-2 flex items-center px-5">
            <div className="text-3xl">
              <RiUserLocationLine />
            </div>
            <div className="px-10 font-semibold py-4">
              <h3>562/11 A </h3>
              <p>{props?.ride?.pickup}</p>
            </div>
          </div>

          <div className="w-full  border-b-2 flex items-center px-5">
            <div className="text-3xl">
              <IoLocationSharp />
            </div>
            <div className="px-10 font-semibold py-4">
              <h3>562/11 A </h3>
              <p>{props?.ride?.destination}</p>
            </div>
          </div>

          <div className="w-full  flex items-center px-5">
            <div className="text-3xl">
              <FaIndianRupeeSign />
            </div>

            <div className="px-10 font-semibold py-4">
              <h3>{props?.ride?.fare}</h3>
              <p>Cash</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            props.setConfirmRidepopup(true);
            props.confirmRide()
          }}
          className="w-[80%] hover:scale-95 my-10 py-2 h-15 bg-orange-400 rounded-lg text-xl  font-bold"
        >
          Accept
        </button>
        <button
          onClick={() => {
            props.setRidePopUpPanel(false);
          }}
          className="w-[80%] hover:scale-95 mb-10 py-2 h-15 bg-gray-300 rounded-lg text-xl text-gray-700 font-bold"
        >
          Ignore
        </button>
      </div>
    </div>
  );
};

export default RidePopUs;
