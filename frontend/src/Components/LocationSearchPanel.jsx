import React from "react";

const LocationSearchPanel = ({
  suggestions,
  setPickup,
  setDestination,
  activeField,
}) => {
  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion.description);
    } else if (activeField === "destination") {
      setDestination(suggestion.description);
    }
  };

  return (
    <div>
      {suggestions.map((elem, idx) => (
        <div
          key={idx}
          onClick={() => handleSuggestionClick(elem)}
          className="flex gap-4 border-2 p-4 border-gray-50 active:border-black rounded-xl "
        >
          <h2 className="bg-[#eee] h-6 w-10  rounded-full">
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className="text-sm font-medium">{elem.description}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
