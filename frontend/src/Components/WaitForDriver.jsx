import React from "react";
import carimage from "../assets/carimage.jpeg";
import { IoIosArrowDown } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { RiUserLocationLine } from "react-icons/ri";
import { FaIndianRupeeSign } from "react-icons/fa6";
const WaitForDriver = (props) => {
  return (
    <div>
      <div className="flex flex-col items-center ">
        <h4
          onClick={() => {
            props.setWaitingFOrDriver(false);
          }}
          className="text-4xl px-4 font-semibold text-center  hover:scale-x-80 duration-300"
        >
          <IoIosArrowDown />
        </h4>
      </div>
      <div className=" flex-col  flex justify-center items-center  ">
        <div className="flex items-center justify-around w-[90%] border rounded-sm px-2">
          <img className="h-20 mb-5 " src={carimage} alt="" />
          <div className="text-right ">
            <h2 className="text-xl font-medium">
              {props?.ride?.captain?.fullname?.firstname +
                " " +
                props?.ride?.captain?.fullname?.lastname}
            </h2>
            <h4 className="text-2xl font-semibold">
              {props?.ride?.captain?.vehicle?.plate}
            </h4>
            <p className="text-xl text-gray-600">Maruti Suzuki Brezza</p>
            <div className="flex  text-right">
              <h1 className="font-semibold text-lg">OTP-</h1>
              <h1 className="font-semibold text-lg">{props?.ride?.otp}</h1>
            </div>
          </div>
        </div>
        <div className="w-[90%] text-xl">
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
      </div>
    </div>
  );
};

export default WaitForDriver;
