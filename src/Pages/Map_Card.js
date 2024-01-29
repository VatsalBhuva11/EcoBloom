import React from "react";
import tick from "../assets/images/tick.png";

const Maps_Card = ({ visible, onClose }) => {
  const handleOnClose = (e) => {
    if (e.target.id === "container") onClose();
  };

  if (!visible) return null;

  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center"
    >
      <div className="bg-[#CDE1C9] p-2 rounded w-auto flex flex-col items-center justify-center">
        <div className="text-2xl font-semibold text-[#1C1C1C] flex justify-center">MARK LOCATION</div>
        <div>ADD MAP HERE VATSAL</div>
        <div className="flex justify-around w-full mt-7 mb-5">
          <button
            className="text-lg bg-[#EEF0E5] text-[#0F1035] w-32 h-8 rounded-lg border-2 border-[#0F1035]"
            onClick={() => {
              document.querySelector("#container").click();
            }}
          >
            Cancel
          </button>
          <button className="text-lg bg-[#0F1035] text-[#EEF0E5] w-32 h-8 rounded-lg"
            onClick={() => {
              document.getElementById("container").click();
          }}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default Maps_Card;
