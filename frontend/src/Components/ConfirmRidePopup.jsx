import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { RiUserLocationLine } from "react-icons/ri";
import { FaIndianRupeeSign } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const ConfirmRidePopup = (props) => {
  const [otp, setotp] = useState("");
  const navigate = useNavigate();
  const submithandler =async (e) => {
    e.preventDefault();
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
      params: {
          rideId: props.ride._id,
          otp: otp
      },
      headers: {
          Authorization: `Bearer ${localStorage.getItem('captaintoken')}`
      }
  })
  console.log("response in confirm ride panel", response.data);
  if (response.status === 200) {
    props.setConfirmRidepopup(false)
    props.setRidePopUpPanel(false)
    navigate('/captain-riding', { state: { ride: props.ride } })
}

  };
  return (
    <div className="h-screen">
      <div className="flex  flex-col items-center ">
        <h4
          onClick={() => {
            props.setRidePopUpPanel(false);
            props.setConfirmRidepopup(false);
          }}
          className="text-4xl px-4 mt-10 font-semibold text-center  hover:scale-x-80 duration-300"
        >
          <IoIosArrowDown />
        </h4>
        <h2 className="font-bold text-4xl text-center p-4 mb-4">
          Confirm this ride to start
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
              {/* <h3>562/11 A </h3> */}
              <p>{props?.ride?.pickup}</p>
            </div>
          </div>

          <div className="w-full  border-b-2 flex items-center px-5">
            <div className="text-3xl">
              <IoLocationSharp />
            </div>
            <div className="px-10 font-semibold py-4">
              {/* <h3>562/11 A </h3> */}
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
        <div className="  w-full p-6 ">
          <form
            className="flex flex-col items-center"
            onSubmit={(e) => {
              submithandler(e);
            }}
          >
            <input
              className="bg-[#eee]  px-12 py-4 text-lg rounded-lg w-[90%] mt-5"
              type="text"
              placeholder="Enter OTP"
              onChange={(e) => {
                setotp(e.target.value);
              }}
              value={otp}
            ></input>
            <button 
           
            className="w-[90%] hover:scale-95 my-10 py-4  bg-orange-400 rounded-lg text-xl  text-center  font-bold">
              Confirm
            </button>
            <button
               onClick={() => {
                props.setConfirmRidepopup(false);
                props.setRidePopUpPanel(false);
              }}
              className="w-[90%]  hover:scale-95 mb-10 py-2 h-15 bg-red-600 rounded-lg text-xl text-gray-700 font-bold"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopup;
