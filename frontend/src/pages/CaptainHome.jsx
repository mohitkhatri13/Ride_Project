import React, { useState } from "react";
import homeimage from "../assets/homeimage.jpg";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import CaptainDetails from "../Components/CaptainDetails";
import RidePopUs from "../Components/RidePopUs";
import ConfirmRidePopup from "../Components/ConfirmRidePopup";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  initializeSocket,
  sendMessage,
  receiveMessage,
} from "../Slice/socketSlice";
const CaptainHome = () => {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const [confirmride, setConfirmRidepopup] = useState(false);
  const[ride , setRide] = useState(null)
  const ridepopupref = useRef(null);
  const confirmridepopupref = useRef(null);

  const dispatch = useDispatch();
  const captainId = useSelector((state) => state.captain.captain._id);
  console.log("capainId" , captainId)
  useEffect(() => {
    dispatch(initializeSocket());
  }, [dispatch]);

  useEffect(() => {
    if (captainId) {
      console.log("captainId:", captainId);
      dispatch(sendMessage("join", { userType: "captain", captainId }));
    }

    const updateLocation = ()=>{
      if(navigator.geolocation && captainId){
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          dispatch(
            sendMessage("update-location-captain", {
              captainId: captainId,
              location: { ltd: latitude, lng: longitude },
            })
          );
        });
      }
    }

    
    
    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    return () => clearInterval(locationInterval);
  }, [captainId, dispatch]);

  useEffect(() => {
    dispatch(
      receiveMessage("new-ride", (data) => {
        console.log("New Ride Received:", data);
        setRide(data); // Update state with new ride data
        setRidePopUpPanel(true); // Show ride popup
      })
    );
  }, [dispatch]);
  

  useGSAP(
    function () {
      if (ridePopUpPanel) {
        gsap.to(ridepopupref.current, {
          y: 0,
          duration: 1,
        });
      } else {
        gsap.to(ridepopupref.current, {
          y: "100%",
          duration: 1,
        });
      }
    },
    [ridePopUpPanel]
  );

  useGSAP(
    function () {
      if (confirmride) {
        gsap.to(confirmridepopupref.current, {
          y: 0,
          duration: 1,
        });
      } else {
        gsap.to(confirmridepopupref.current, {
          y: "100%",
          duration: 1,
        });
      }
    },
    [confirmride]
  );

  async function confirmRide(){
    
  }

  return (
    <div className=" relative overflow-hidden  h-screen border  flex flex-col w-full items-center ">
      <div className=" fixed   w-screen flex px-4 py-2 items-center justify-between">
        <h2 className="text-3xl  text-white  font-bold  ">Airvata</h2>
        <Link
          to={"/captain-home"}
          className="rounded-full  p-2 text-3xl text-white "
        >
          <MdLogout />
        </Link>
      </div>

      <div className="h-[50%]">
        <img
          className="h-full w-screen object-fill"
          src={homeimage}
          alt="home image"
        />
      </div>
      <div className=" w-[80%] mt-20">
        <CaptainDetails />
      </div>
      <div
        ref={ridepopupref}
        className=" absolute bottom-0 translate-y-full py-6 pt-12 w-full bg-white"
      >
        <RidePopUs
          setRidePopUpPanel={setRidePopUpPanel}
          setConfirmRidepopup={setConfirmRidepopup}
          ride={ride}
          confirmride={confirmride}
        />
      </div>
      <div
        ref={confirmridepopupref}
        className=" absolute bottom-0 translate-y-full py-6 pt-12 w-full bg-white"
      >
        <ConfirmRidePopup
          setRidePopUpPanel={setRidePopUpPanel}
          setConfirmRidepopup={setConfirmRidepopup}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
