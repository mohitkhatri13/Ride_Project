import React from "react";
import { IoLocationSharp } from "react-icons/io5";

const LocationSearchPanel = ({
  setPanelopen,
  setVehiclePanel,
  suggestions,
  activeField,
  setPickup,
  setDestination,
}) => {
  return (
    <div>
      {suggestions.map((element, id) => (
        <div
          key={id}
          onClick={() => {
            if (activeField === "pickup") {
              setPickup(element);
            } else if (activeField === "destination") {
              setDestination(element);
            }
            setVehiclePanel(true);
            setPanelopen(false);
          }}
          className="flex p-3 border-2 rounded-xl border-gray-100 active:border-black items-center gap-x-4 justify-start my-2"
        >
          <h4 className="text-xl bg-[#eee] p-4 rounded-full">
            <IoLocationSharp />
          </h4>
          <h4 className="text-xl">{element}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
