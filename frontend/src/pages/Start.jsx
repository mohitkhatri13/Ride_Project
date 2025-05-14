import React from "react";
import { NavLink } from "react-router-dom";
import image from "../assets/startimage.gif"
import Navbar from "../Components/Navbar";
const Start = () => {
  return (
    <div className="h-screen w-full flex-col bg-black flex items-center justify-center">
       <div className="w-[100%] mt-[-20px]"> < Navbar /></div>
      
      <div className="flex  justify-center items-center  flex-col   w-[90%] h-[90%] rounded-xl overflow-hidden shadow-lg ">
        {/* <div className="text-white text-4xl font-bold  bg-black bg-opacity-40 mt-20 select-none">
          Airavata
        </div> */}
        <div className=" w-full flex   gap-x-10 h-full mt-30 ">
          <div  
         
          className=" rounded-md bg-center bg-cover p-10 flex flex-col pt-25 items-center w-[50%]">
            <h2 className=" select-none text-3xl md:text-4xl font-bold mb-4 text-white">
              Get Started with{" "}
              <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Airavata
              </span>
            </h2>

            <p className="text-white select-none text-base mb-6 shadow-2xl shadow-black">
              Seamless ride experience begins here. Login or sign up to
              continue.
            </p>
            <NavLink
              to="/userlogin"
              className="select-none w-full text-center bg-white  text-black font-bold py-3 rounded-lg text-lg transition-all duration-300"
            >
              Continue as User
            </NavLink>
          </div>

          <img 
  className="bg-cover rounded-md bg-center w-[40%] h-110 shadow-2xl shadow-white"
  src={image} alt="" 
/>

        </div>
        
      </div>
    </div>
  );
};

export default Start;
