import React from "react";
import { Link } from "react-router-dom";
import image1 from "../assets/startimage.gif";
import { NavLink } from "react-router-dom";
// import Button from "./common/Button";
import Button from "../Common/Button";  

const Navbar = () => {
  return (
    <header className="px-4  shadow-md sticky top-0 backdrop-blur-sm bg-[#fffefc30] z-20">
      <div className="flex justify-around items-center py-3  mx-auto">
        <Link to="/" className="flex justify-center items-center">
          {/* <img className="h-11" src={image1} alt="app__logo" /> */}
          <p className=" text-2xl text-white font-bold">Airawat</p>
        </Link>

        <div className=" text-white font-semibold hidden  md:flex gap-x-8 items-center justify-center">
          <Button linkto={"/userlogin"}>Login</Button>
          <Button linkto={"/usersignup"}>Signup</Button>
          <Button linkto={"/captainsignup"}>Become a Captain</Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
