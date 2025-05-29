import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { RiUserLocationLine } from "react-icons/ri";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FinishRide = (props) => {
  const navigate = useNavigate();
  async function endRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
      {
        rideId: props.ride._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("captaintoken")}`,
        },
      }
    );

    if (response.status === 200) {
      navigate("/captain-home");
    }
  }
  return (
    <div className="">
      <div className="flex  flex-col items-center ">
        <h4
          onClick={() => {
            props.setfinishridePanel(false);
          }}
          className="text-4xl px-4  font-semibold text-center  hover:scale-x-80 duration-300"
        >
          <IoIosArrowDown />
        </h4>
        <h2 className="font-bold text-2xl text-center p-4 ">
          Finish this ride
        </h2>

        <div className="flex my-6 items-center justify-between w-[80%] border-4 border-yellow-300 p-2 px-4 rounded-xl">
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
            <div className="text-2xl">
              <RiUserLocationLine />
            </div>
            <div className="px-10 font-semibold py-2 text-lg">
              {/* <h3>562/11 A </h3> */}
              <p>{props?.ride?.pickup}</p>
            </div>
          </div>

          <div className="w-full  border-b-2 flex items-center px-5 text-lg">
            <div className="text-2xl">
              <IoLocationSharp />
            </div>
            <div className="px-10 font-semibold py-4">
              {/* <h3>562/11 A </h3> */}
              <p>{props?.ride?.destination}</p>
            </div>
          </div>

          <div className="w-full  flex items-center px-5">
            <div className="text-2xl">
              <FaIndianRupeeSign />
            </div>

            <div className="px-10 font-semibold py-2 text-lg">
              <h3>{props?.ride?.fare}</h3>
              <p>Cash</p>
            </div>
          </div>
        </div>
        <div className="   w-full p-6 flex  flex-col items-center justify-center ">
          <button
            onClick={endRide}
            className=" w-10/12 hover:scale-95 my-2 py-2  bg-orange-400 rounded-lg text-lg  text-center  font-bold"
          >
            Finish Ride
          </button>
          <p className="text-lg mt-4 font-semibold text-center">
            Click on Finish Ride if you completed the payment
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
