import React from "react";
import carimage from "../assets/carimage.jpeg";
import { IoIosArrowDown } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { RiUserLocationLine } from "react-icons/ri";
import { FaIndianRupeeSign } from "react-icons/fa6";
const LookingforDriver = (props) => {
  return (
    <div>
          <div className="flex flex-col items-center ">
            <h4
              onClick={() => {
                props.setVehicleFound(false);
              }}
              className="text-4xl px-4 font-semibold text-center  hover:scale-x-80 duration-300"
            >
              <IoIosArrowDown />
            </h4>
            <h2 className="font-bold text-4xl text-center p-4 mb-4">
              Looking for a Driver
            </h2>
          </div>
          <div className="flex flex-col justify-center items-center ">
            <img className="h-40 mb-5 " src={carimage} alt="" />
            <div className="w-[90%] text-xl">
              <div className="w-full border-b-2 flex items-center px-5">
              <div className="text-3xl"><RiUserLocationLine /></div>  
                <div className="px-10 font-semibold py-4">
                  {/* <h3>562/11 A </h3> */}
                  <p>{props.pickup}</p>
                </div>
              </div>
              
              <div className="w-full  border-b-2 flex items-center px-5">
              <div className="text-3xl"><IoLocationSharp /></div>  
                <div className="px-10 font-semibold py-4">
                  <h3>562/11 A </h3>
                  <p>{props.destination}</p>
                </div>
              </div>
    
              <div className="w-full  flex items-center px-5">
              <div className="text-3xl"><FaIndianRupeeSign /></div>
                
                <div className="px-10 font-semibold py-4">
                  <h3>{props.fare[props.vehicleType]}</h3>
                  <p>Cash</p>
                </div>
              </div>
            </div>
           
          </div>
        </div>
  )
}

export default LookingforDriver
