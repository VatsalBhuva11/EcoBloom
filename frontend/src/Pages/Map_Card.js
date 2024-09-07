import React from "react";
import tick from "../assets/images/tick.png";
import Maps_Campaign from "../Components/Maps_Campaign.js";
import Activity_log from "./Activity_log.js";

const Maps_Card = ({ visible, onClose, formData, setFormData }) => {
    const handleOnClose = (e) => {
        if (e.target.id === "container") onClose();
    };

    const handleSetMarker = (marker) => {
        console.log("Marker clicked:", marker);
        // Perform actions when a marker is clicked
        setFormData({
            ...formData,
            latitude: marker.lat,
            longitude: marker.lng,
        });
    };

    if (!visible) return null;

    return (
      <div
        id="container"
        onClick={handleOnClose}
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center h-full"
      >
        <div className="maps-campaign-outer bg-[#E1E1E0] p-6 rounded flex flex-col items-center justify-center">
          <div className="text-2xl font-semibold text-[#277868] flex justify-center mb-3">
            MARK LOCATION
          </div>
          <div className="flex map-campaign-container">
            <div className="w-full flex justify-center items-center h-full">
              <Maps_Campaign onMapClick={handleSetMarker} />
            </div>
          </div>
          <div className="flex justify-around w-full mt-4">
            <button
              className="text-lg bg-[#277868] text-[#E9E9E9] w-32 h-8 rounded-lg"
              onClick={() => {
                document.querySelector("#container").click();
              }}
            >
              Cancel
            </button>
            <button
              className="text-lg bg-[#277868] text-[#E9E9E9] w-32 h-8 rounded-lg"
              onClick={() => {
                document.getElementById("container").click();
              }}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
};

export default Maps_Card;
