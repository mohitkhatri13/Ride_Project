import React from "react";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { CaptainDataContext } from "../context/CaptainContext2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainProtextWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { captain, setCaptain } = React.useContext(CaptainDataContext);
  const [isloading, setIsloading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/captainlogin");
    }
  }, [token]);
  axios
    .get(`${import.meta.env.VITE_API_URL}/captains/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        setCaptain(response?.data?.captain);
        setIsloading(false);
      }
    })
    .catch((err) => {
      localStorage.removeItem("token");
      navigate("/captainlogin");
    });

  if (isloading) {
    return <div>IsLoading</div>;
  }

  return <div>{children}</div>;
};

export default CaptainProtextWrapper;
