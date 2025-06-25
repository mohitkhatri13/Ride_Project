import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MdLogout } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import FinishRide from "../Components/FinishRide";
import LiveTracking from "../Components/LiveTracking";

const CaptainRiding = () => {
  const [finishridePanel, setfinishridePanel] = useState(false);
  const finishRideRef = useRef(null);
  const location = useLocation();
  const ridedata = location.state?.ride;

  useGSAP(() => {
    gsap.to(finishRideRef.current, {
      y: finishridePanel ? 0 : "100%",
      duration: 1,
    });
  }, [finishridePanel]);

  return (
    <div className="w-full min-h-screen bg-amber-50 flex flex-col items-center">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 px-4 py-2 flex items-center justify-between bg-amber-500 z-10">
        <h2 className="text-3xl text-white font-bold">Airvata</h2>
        <Link
          to="/captain-home"
          className="rounded-full p-2 text-3xl text-white"
        >
          <MdLogout />
        </Link>
      </div>

      {/* Main Content */}
      <div className="w-[50%] mx-auto my-8 h-[90vh] relative overflow-hidden flex flex-col items-center justify-between">
        {/* Live Map Section */}
        <div className="w-full h-[50%] mt-16 z-10">
          <LiveTracking />
        </div>

        {/* Ride Action Section */}
        <div
          onClick={() => setfinishridePanel(true)}
          className="w-full h-[50%] bg-yellow-300 flex items-center justify-center relative cursor-pointer z-10"
        >
          <h4 className="text-4xl absolute top-2 px-4 text-center">
            <IoIosArrowDown />
          </h4>
          <div className="flex justify-between w-[60%] items-center gap-x-6">
            <h4 className="text-3xl font-bold">Ride in progress</h4>
            <button className="hover:scale-95 py-2 px-6 bg-green-600 rounded-lg text-xl text-white font-bold">
              Complete Ride
            </button>
          </div>
        </div>

        {/* Finish Ride Slide Panel (from bottom, height 85%) */}
        <div
          ref={finishRideRef}
          className="absolute bottom-0 translate-y-full py-6 pt-12 w-full bg-white z-20 h-[100%]"
        >
          <FinishRide ride={ridedata} setfinishridePanel={setfinishridePanel} />
        </div>
      </div>
    </div>
  );
};

export default CaptainRiding;
