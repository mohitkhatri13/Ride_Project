import React, { useState } from "react";
import homeimage from "../assets/homeimage.jpg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { useRef } from "react";
import FinishRide from "../Components/FinishRide";
import { useLocation } from "react-router-dom";

const CaptainRiding = () => {
  const [finishridePanel, setfinishridePanel] = useState(false);
  const finishRideRef = useRef(null);
  const location = useLocation();
  const ridedata = location.state?.ride;
  useGSAP(
    function () {
      if (finishridePanel) {
        gsap.to(finishRideRef.current, {
          y: 0,
          duration: 1,
        });
      } else {
        gsap.to(finishRideRef.current, {
          y: "100%",
          duration: 1,
        });
      }
    },
    [finishridePanel]
  );
  return (
    <div className=" w-full h-screen flex flex-col items-center justify-center bg-amber-50">
    <div className="h-screen relative overflow-hidden  flex flex-col w-[50%] items-center ">
      <div className=" fixed   w-screen flex px-4 py-2 items-center justify-between">
        <h2 className="text-3xl  text-white  font-bold  ">Airvata</h2>
        <Link
          to={"/captain-home"}
          className="rounded-full  p-2 text-3xl text-white "
        >
          <MdLogout />
        </Link>
      </div>

      <div className="h-[80%]">
        <img
          className="h-[100%] object-fill"
          src={homeimage}
          alt="home image"
        />
      </div>
      <div
        onClick={() => {
          setfinishridePanel(true);
        }}
        className="h-[50%] relative  flex items-center justify-center  bg-yellow-300   w-full"
      >
        <h4
          onClick={() => {}}
          className="text-4xl absolute top-2  px-4 font-semibold text-center  hover:scale-x-80 duration-300"
        >
          <IoIosArrowDown />
        </h4>
        <div className="flex  justify-between w-[60%] items-center ">
          <h4 className="text-3xl font-bold"></h4>
          <button className=" hover:scale-95  py-2 h-15 w-[10em] bg-green-600 rounded-lg text-xl text-gray-700 font-bold">
            Complete Ride
          </button>
        </div>
      </div>
      <div
        ref={finishRideRef}
        className=" absolute bottom-0 translate-y-full py-6 pt-12 w-full bg-white"
      >
        <FinishRide ride={ridedata} setfinishridePanel={setfinishridePanel} />
      </div>
    </div>
    </div>
  );
};

export default CaptainRiding;
