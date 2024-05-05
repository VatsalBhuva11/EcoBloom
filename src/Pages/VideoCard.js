import React from "react";
import Video from "../Components/Video.js";

const VideoCard = ({ visible, onClose, data }) => {
    const { userId, userName, campaignId } = data;
    const handleOnClose = (e) => {
        if (e.target.id === "container") onClose();
    };

    if (!visible) return null;

    return (
      <div
        id="container"
        onClick={handleOnClose}
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center h-full"
      >
        <div className="h-[56%] bg-[#E1E1E0] p-6 rounded flex flex-col items-center justify-center">
          <div className="text-2xl font-semibold text-[#277868] flex justify-center mb-3">
            Verify {userName}
          </div>
          <div className="flex map-campaign-container">
            <div className="w-full flex justify-center items-center">
              <Video userId={userId} campaignId={campaignId} />
            </div>
          </div>
        </div>
      </div>
    );
};

export default VideoCard;
