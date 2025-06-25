import React from "react";
import homeimage from "../assets/homeimage.jpg";
import carimage from "../assets/carimage.jpeg";
import { IoLocationSharp } from "react-icons/io5";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { receiveMessage } from "../Slice/socketSlice";
import LiveTracking from "../Components/LiveTracking";

const Riding = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const ride = location.state || {};

  useEffect(() => {
    dispatch(
      receiveMessage("ride-ended", (data) => {
        navigate("/home");
      })
    );
  }, [dispatch]);

  return (
    <div className="w-full  h-screen justify-center items-center  flex flex-col ">
    <div className="h-screen w-[25em]  flex flex-col relative ">
      <Link
        to={"/home"}
        className="rounded-full absolute pt-10 text-3xl text-white left-2 "
      >
        <IoHomeOutline />
      </Link>
      <div className="h-[50%]">
        {/* <img
          className="h-full mt-5 w-screen object-fill"
          src={homeimage}
          alt="home image"
        /> */}
        <LiveTracking/>
      </div>
        
      <div className="h-1/2  flex flex-col items-center">
        <div className="flex flex-col justify-center items-center p-4">
          <div className="flex items-center justify-around w-full ">
            <img className="h-20 mt-5  " src={carimage} alt="" />
            <div className="text-right">
              <h2 className="text-xl font-medium">
                {ride?.ride?.captain?.fullname?.firstname}
              </h2>
              <h4 className="text-xl font-semibold">
                {ride?.ride?.captain?.vehicle?.plate}
              </h4>
              <p className="text-sm text-gray-600">Maruti Suzuki Brezza</p>
            </div>
          </div>
          <div className="w-[90%] text-xl">
            <div className="w-full  border-b-2 flex items-center px-5">
              <div className="text-3xl">
                <IoLocationSharp />
              </div>
              <div className="px-10 text-sm font-semibold py-4">
                {/* <h3>562/11 A </h3> */}
                <p>{ride?.ride?.destination}</p>
              </div>
            </div>

            <div className="w-full  flex items-center px-5">
              <div className="text-3xl">
                <FaIndianRupeeSign />
              </div>

              <div className="px-10 text-sm font-semibold py-4">
                <h3>{ride?.ride?.fare}</h3>
                <p>Cash</p>
              </div>
            </div>
          </div>
        </div>
        <button className="w-[80%] hover:scale-95  py-2  bg-gray-300 rounded-lg text-xl  font-bold">
          Make a payment
        </button>
      </div>
    </div>
    </div>
  );
};

export default Riding;
