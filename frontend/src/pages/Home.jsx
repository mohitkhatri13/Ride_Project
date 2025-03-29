import React, { useEffect, useState } from "react";
import homeimage from "../assets/homeimage.jpg";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { IoIosArrowDown } from "react-icons/io";
import LocationSearchPanel from "../Components/LocationSearchPanel";
import ConfirmRide from "../Components/ConfirmRide";
import VehiclePanel from "../Components/VehiclePanel";
import LookingforDriver from "../Components/LookingforDriver";
import WaitForDriver from "../Components/WaitForDriver";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import SocketContext from "../context/socketcontext.jsx";
import { useSelector } from "react-redux";
import { useContext } from "react";
// import { sendMessage } from "../Slice/socketSlice";
import io from "socket.io-client";
import { initializeSocket, sendMessage, receiveMessage } from "../Slice/socketSlice";

const socket = io(import.meta.env.VITE_BASE_URL);
const Home = () => {
  const [pickup, setpickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelopen, setPanelopen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingFOrDriver] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState("");
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const userId = useSelector((state) => state?.user?.user?._id);
  useEffect(() => {
    dispatch(initializeSocket());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      console.log("userId:", userId);
      dispatch(sendMessage("join", { userType: "user", userId }));
    }
  }, [userId, dispatch]);

  // Example of receiving messages
  useEffect(() => {
    dispatch(receiveMessage("new-ride"));
  }, [dispatch]);

  const submithandler = (e) => {
    e.preventDefault();
  };

  const fetchSuggestions = async (query) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { query },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const panelRef = useRef(null);
  const panelcloseref = useRef(null);
  const vehiclepanelref = useRef(null);
  const confirmridepanelref = useRef(null);
  const vehiclefoundref = useRef(null);
  const waitingfordriverref = useRef(null);

  async function findTrip() {
    setVehiclePanel(true);
    setPanelopen(false);
    // setLoading(true);
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
    setFare(response.data);
  }

  async function createRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    console.log("response", response.data);
  }

  useGSAP(
    function () {
      if (panelopen) {
        gsap.to(panelRef.current, {
          height: "75%",
          padding: "20px",
          overflow: "visible",
          duration: 0.7,
        });
        gsap.to(panelcloseref.current, {
          opacity: "1",
          padding: "20",
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: "0px",
          overflow: "hidden",
          duration: 0.7,
        });
        gsap.to(panelcloseref.current, {
          opacity: "0",
        });
      }
    },
    [panelopen]
  );
  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclepanelref.current, {
          y: 0,
          duration: 1,
        });
      } else {
        gsap.to(vehiclepanelref.current, {
          y: "100%",
          duration: 1,
        });
      }
    },
    [vehiclePanel]
  );

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmridepanelref.current, {
          y: 0,
          duration: 1,
        });
      } else {
        gsap.to(confirmridepanelref.current, {
          y: "100%",
          duration: 1,
        });
      }
    },
    [confirmRidePanel]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehiclefoundref.current, {
          y: 0,
          duration: 1,
        });
      } else {
        gsap.to(vehiclefoundref.current, {
          y: "100%",
          duration: 1,
        });
      }
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingfordriverref.current, {
          y: 0,
          duration: 1,
        });
      } else {
        gsap.to(waitingfordriverref.current, {
          y: "100%",
          duration: 1,
        });
      }
    },
    [waitingForDriver]
  );

  return (
    <div className="h-screen relative overflow-hidden">
      <h2 className="text-3xl absolute text-white left-4 top-4 font-bold mb-10 ">
        Airvata
      </h2>
      <div>
        <img
          className="h-screen w-screen object-fill"
          src={homeimage}
          alt="home image"
        />
      </div>

      <div className="absolute h-screen bottom-0 w-full flex flex-col justify-end ">
        <div className="h-[30%] bg-white p-5 relative   ">
          <h4
            ref={panelcloseref}
            onClick={() => {
              setPanelopen(false);
            }}
            className="text-4xl font-semibold absolute right-6 top-3 opacity-0 hover:scale-x-80 duration-300"
          >
            <IoIosArrowDown />
          </h4>
          <h4 className="font-bold text-4xl mb-10 ">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submithandler(e);
            }}
            className="mt-5 mb-5"
          >
            <div className="line absolute h-25 w-1 top-[40%] left-10 bg-gray-700 rounded-full"></div>
            <input
              onClick={() => {
                setPanelopen(true);
                setActiveField("pickup");
              }}
              value={pickup}
              onChange={(e) => {
                setpickup(e.target.value);
                fetchSuggestions(e.target.value);
              }}
              className="bg-[#eee] px-12  py-4 text-lg rounded-lg w-full"
              type="text"
              placeholder="Add a pick up Location"
            ></input>
            <input
              onClick={() => {
                setPanelopen(true);
                setActiveField("destination");
              }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                fetchSuggestions(e.target.value);
              }}
              className="bg-[#eee] px-12 py-4 text-lg rounded-lg w-full mt-5"
              type="text"
              placeholder="Select your Destination"
            ></input>
          </form>
          <button
            onClick={() => {
              findTrip();
            }}
            className="border p-2 bg-black text-white font-bold rounded-md w-[8em]"
          >
            Find Trip
          </button>
        </div>

        <div ref={panelRef} className=" bg-white p-x-10  ">
          <LocationSearchPanel
            setPanelopen={setPanelopen}
            setVehiclePanel={setVehiclePanel}
            suggestions={suggestions}
            activeField={activeField}
            setPickup={setpickup}
            setDestination={setDestination}
            fetchSuggestions={fetchSuggestions}
          />
        </div>
      </div>

      <div
        ref={vehiclepanelref}
        className=" absolute bottom-0 translate-y-full py-6 pt-12 w-full bg-white"
      >
        <VehiclePanel
          fare={fare}
          setVehicleType={setVehicleType}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
        />
      </div>

      <div
        ref={confirmridepanelref}
        className=" absolute bottom-0 translate-y-full  w-full bg-white"
      >
        <ConfirmRide
          createRide={createRide}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
        />
      </div>

      <div
        ref={vehiclefoundref}
        className=" absolute bottom-0 translate-y-full  w-full bg-white"
      >
        <LookingforDriver
          pickup={pickup}
          destination={destination}
          createRide={createRide}
          fare={fare}
          vehicleType={vehicleType}
          setVehicleFound={setVehicleFound}
        />
      </div>

      <div
        ref={waitingfordriverref}
        className=" absolute bottom-0  w-full bg-white"
      >
        <WaitForDriver setWaitingFOrDriver={setWaitingFOrDriver} />
      </div>
    </div>
  );
};

export default Home;
