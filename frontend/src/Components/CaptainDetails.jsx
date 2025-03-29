import React, { useContext } from "react";
import { FaRegClock } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import { LuNotebook } from "react-icons/lu";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const CaptainDetails = () => {

  const captain = useSelector((state)=>state.captain.captain)


  return (
    <div>
      <div className="flex items-center  justify-between ">
        <div className="flex items-center justify-start gap-3">
          <img
            className="h-20 w-20 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"
            alt=""
          />
          <h4 className="text-2xl font-medium capitalize">
            {captain
              ? `${captain.fullname.firstname} ${captain.fullname.lastname}`
              : "Loading..."}
          </h4>
        </div>
        <div>
          <h4 className="text-2xl font-semibold">₹295.20</h4>
          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>
      <div className="flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-10 items-start">
        <div className="text-center  p-2 flex flex-col items-center text-4xl gap-y-3">
          <FaRegClock />
          <h5 className="text-2xl font-medium">10.2</h5>
          <p className="text-xl text-gray-600">Hours Online</p>
        </div>
        <div className="text-center  p-2 flex flex-col items-center text-4xl gap-y-3">
          <FaClockRotateLeft />
          <h5 className="text-2xl font-medium">10.2</h5>
          <p className="text-xl text-gray-600">Hours Online</p>
        </div>
        <div className="text-center  p-2 flex flex-col items-center text-4xl gap-y-3">
          <LuNotebook />
          <h5 className="text-2xl font-medium">10.2</h5>
          <p className="text-xl text-gray-600">Hours Online</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
