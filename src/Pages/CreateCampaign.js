import { React, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Create_Campaign_Card from "./Create_Campaign_Card";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import Maps_Campaign from "../Components/Maps_Campaign.js";
import Activity_log from "./Activity_log.js";
import Maps_Card from "./Map_Card.js";

const CreateCampaign = () => {
    const [showMyModel, setShowMyModal] = useState(false);
    const [showMyModel1, setShowMyModal1] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [formData, setFormData] = useState({});
    const [showMap, setShowMap] = useState(false);

    // const handleMarkerClick = (marker) => {
    //     console.log("Marker clicked:", marker);
    //     // Perform actions when a marker is clicked
    // };

    const handleSetMarker = (marker) => {
        console.log("Marker clicked:", marker);
        // Perform actions when a marker is clicked
        setFormData({
            ...formData,
            latitude: marker.lat,
            longitude: marker.lng,
        });
    };

    const handleOnClose = () => setShowMyModal(false);
    const handleOnClose1 = () => setShowMyModal1(false);

    function handleCreateCampaign(event) {
        event.preventDefault();
        setClicked(true);
        if (auth.currentUser) {
            auth.currentUser.getIdToken().then((idToken) => {
                try {
                    fetch(
                        `${process.env.REACT_APP_LOCAL_API_URL}/campaign/create`,
                        {
                            body: JSON.stringify(formData),
                            headers: {
                                authorization: `Bearer ${idToken}`,
                                "Content-Type": "application/json",
                            },
                            method: "POST",
                        }
                    )
                        .then((data) => data.json())
                        .then((data) => {
                            console.log(data);
                            if (data.status === "OK") {
                                setClicked(false);
                                setShowMyModal(true);
                            } else {
                                setClicked(false);
                                alert("Could not update in DB");
                            }
                        });
                } catch (err) {
                    setClicked(false);
                    console.log(err);
                    alert("Error in fetch API");
                }
            });
        } else {
            setClicked(false);
            alert("Login as an organization.");
        }
    }

    function showMapModal() {
        setShowMap(!showMap);
    }

    return (
        <div className="w-screen h-screen p-8 sm:p-12 lg:p-20 bg-[#EEF0E5] flex flex-col justify-evenly gap-1 sm:gap-3">
            <div className="flex items-center gap-5 text-[#0F1035]">
                <Link
                    to="/org/dashboard"
                    className="text-xl sm:text-3xl lg:text-4xl mt-0 sm:mt-1 lg:mt-2 cursor-pointer hover:scale-110 duration-300"
                >
                    <FaArrowLeft />
                </Link>
                <div className="text-2xl sm:text-3xl lg:text-5xl font-bold">
                    CREATE CAMPAIGN
                </div>
            </div>
            <form id="createCampaign" className="flex flex-col sm:gap-2" action="#">
                <div className="flex gap-5">
                    <div className="flex flex-col w-full sm:w-[74%] gap-1 lg:gap-1">
                        <div className="text-[1.30rem] sm:text-[1.50rem] lg:text-[1.6rem] font-semibold text-[#333333]">
                            Campaign Name*
                        </div>
                        <div>
                            <input
                                className="w-full h-[40px] sm:h-[50px] rounded-lg bg-[#CFD6DE] px-2 sm:px-4 text-xl sm:text-[1.4rem] hover:scale-103 duration-300"
                                placeholder="Greenvalley Campaign"
                                type="text"
                                name="name"
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    });
                                }}
                            />
                        </div>
                    </div>
                    <div className="hidden sm:flex flex-col w-[25%] gap-1 lg:gap-1">
                        <div className="text-[1.30rem] sm:text-[1.50rem] lg:text-[1.6rem] font-semibold text-[#333333]">
                            Start Date*
                        </div>
                        <div>
                            <input
                                className="w-full h-[40px] sm:h-[50px] rounded-lg bg-[#CFD6DE] px-2 sm:px-4 text-xl sm:text-[1.4rem] hover:scale-103 duration-300"
                                type="datetime-local"
                                name="startDate"
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        startDate: e.target.value,
                                    });
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-5">
                    <div className="flex flex-col w-full sm:w-[74%] gap-1 lg:gap-1">
                        <div className="text-[1.30rem] sm:text-[1.50rem] lg:text-[1.6rem] font-semibold text-[#333333]">
                            Campaign Address*
                        </div>
                        <div>
                            <input
                                className="w-full h-[40px] sm:h-[50px] rounded-lg bg-[#CFD6DE] px-2 sm:px-4 text-xl sm:text-[1.4rem] hover:scale-103 duration-300"
                                placeholder="Greenvalley Campaign"
                                type="text"
                                name="address"
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        address: e.target.value,
                                    });
                                }}
                            />
                        </div>
                        <a onClick={() => setShowMyModal1(true)} className="flex text-[#862B2B] text-[1rem] sm:text-lg lg:text-xl font-bold items-center ">
                            <div
                                className="cursor-pointer"
                                onClick={showMapModal}
                            >
                                <FaLocationDot />
                            </div>
                            <div
                                className="text-[1.0rem] cursor-pointer"
                                onClick={showMapModal}
                            >
                                Mark Location On Map
                            </div>
                            {showMap && (
                                <div className="absolute top-0 left-0 w-screen h-screen bg-[#00000099] flex flex-col justify-center items-center">
                                    <div
                                        className="w-5 h-5 text-white"
                                        onClick={() => {
                                            setShowMap(false);
                                        }}
                                    >
                                        X
                                    </div>
                                    <div className="w-[90%] h-[90%]">
                                        <div>
                                            <Maps_Campaign
                                                onClose={() => {
                                                    setShowMap(false);
                                                }}
                                                onMapClick={handleSetMarker}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </a>
                    </div>
                    <div className="hidden sm:flex flex-col w-[25%] gap-1 lg:gap-1">
                        <div className="text-[1.30rem] sm:text-[1.50rem] lg:text-[1.6rem] font-semibold text-[#333333]">
                            End Date*
                        </div>
                        <div>
                            <input
                                className="w-full h-[40px] sm:h-[50px] rounded-lg bg-[#CFD6DE] px-2 sm:px-4 text-xl sm:text-[1.4rem] hover:scale-103 duration-300"
                                type="datetime-local"
                                name="endDate"
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        endDate: e.target.value,
                                    });
                                }}
                            />
                        </div>
                    </div>
                </div>

{/* New Start Date and End Date which will be flexed after width small */}

                <div className="flex sm:hidden justify-between">
                    <div className="flex flex-col w-[40%] gap-1 lg:gap-1">
                        <div className="text-[1.30rem] sm:text-[1.50rem] lg:text-[1.6rem] font-semibold text-[#333333]">
                            Start Date*
                        </div>
                        <div>
                            <input
                                className="w-full h-[40px] sm:h-[50px] rounded-lg bg-[#CFD6DE] px-2 sm:px-4 text-xl sm:text-[1.4rem] hover:scale-103 duration-300"
                                type="datetime-local"
                                name="startDate2"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-[40%] gap-1 lg:gap-1">
                        <div className="text-[1.30rem] sm:text-[1.50rem] lg:text-[1.6rem] font-semibold text-[#333333]">
                            End Date*
                        </div>
                        <div>
                            <input
                                className="w-full h-[40px] sm:h-[50px] rounded-lg bg-[#CFD6DE] px-2 sm:px-4 text-xl sm:text-[1.4rem] hover:scale-103 duration-300"
                                type="datetime-local"
                                name="endDate"
                            />
                        </div>
                    </div>
                </div>

{/* New start date and End Date Ends */}

                <div className="flex gap-5 mt-2">
                    <div className="flex flex-col w-full sm:w-[74%] gap-1 lg:gap-1">
                        <div className="text-[1.30rem] sm:text-[1.50rem] lg:text-[1.6rem] font-semibold text-[#333333]">
                            City*
                        </div>
                        <div>
                            <input
                                className="w-full h-[40px] sm:h-[50px] rounded-lg bg-[#CFD6DE] px-2 sm:px-4 text-xl sm:text-[1.4rem] hover:scale-103 duration-300"
                                placeholder="Greenvalley Campaign"
                                type="text"
                                name="city"
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        city: e.target.value,
                                    });
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-[25%] gap-1 lg:gap-1">
                        <div className="text-[1.30rem] sm:text-[1.50rem] lg:text-[1.6rem] font-semibold text-[#333333]">
                            Location*
                        </div>

                        <select
                            name="locationType"
                            id="locationType"
                            className="w-full h-[40px] sm:h-[50px] rounded-lg bg-[#CFD6DE] px-2 sm:px-4 text-xl sm:text-[1.4rem] hover:scale-103 duration-300"
                            onChange={(e) => {
                                console.log(e.target.value);
                                setFormData({
                                    ...formData,
                                    locationType: e.target.value,
                                });
                            }}
                        >
                            <option value="Lake">Lake</option>
                            <option value="River">River</option>
                            <option value="Sea">Sea</option>
                            <option value="Ocean">Ocean</option>
                            <option value="City">City</option>
                            <option value="Beach">Beach</option>
                            <option value="Park">Park</option>
                            <option value="Forest">Forest</option>
                            <option value="Mountain">Mountain</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col w-full sm:w-[74%] gap-1 lg:gap-1">
                    <div className="text-[1.30rem] sm:text-[1.50rem] lg:text-[1.6rem] font-semibold text-[#333333]">
                        Country*
                    </div>
                    <div>
                        <input
                            className="w-full h-[40px] sm:h-[50px] rounded-lg bg-[#CFD6DE] px-2 sm:px-4 text-xl sm:text-[1.4rem] hover:scale-103 duration-300"
                            placeholder="Greenvalley Campaign"
                            type="text"
                            name="country"
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    country: e.target.value,
                                });
                            }}
                        />
                    </div>
                </div>
                <div className="flex flex-col w-full sm:w-[74%] gap-1 lg:gap-1">
                    <div className="text-[1.30rem] sm:text-[1.50rem] lg:text-[1.6rem] font-semibold text-[#333333]">
                        Campaign Goal*
                    </div>
                    <div>
                        <input
                            className="w-full h-[40px] sm:h-[50px] rounded-lg bg-[#CFD6DE] px-2 sm:px-4 text-xl sm:text-[1.4rem] hover:scale-103 duration-300"
                            placeholder="Greenvalley Campaign"
                            type="text"
                            name="goal"
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    goal: e.target.value,
                                });
                            }}
                        />
                    </div>
                </div>
                <div className="flex gap-10 mt-3">
                    {!clicked ? (
                        <button
                            onClick={handleCreateCampaign}
                            className="text-xl sm:text-2xl bg-[#0F1035] text-[#EEF0E5] px-2 sm:px-5 w-auto h-12 rounded-lg cursor-pointer hover:scale-110 duration-300"
                        >
                            CREATE
                        </button>
                    ) : (
                        <button
                            onClick={handleCreateCampaign}
                            className="text-xl sm:text-2xl bg-[#0f1035e9] text-[#EEF0E5] px-2 sm:px-5 w-auto h-12 rounded-lg cursor-pointer hover:scale-110 duration-300"
                            disabled
                        >
                            Creating...
                        </button>
                    )}

                    <Link to="/org/dashboard">
                        <button className="text-xl sm:text-2xl bg-[#EEF0E5] text-[#0F1035] px-2 sm:px-5 w-auto h-12 rounded-lg border-2 border-[#0F1035] cursor-pointer hover:scale-110 duration-300">
                            CANCEL
                        </button>
                    </Link>
                </div>
                <Create_Campaign_Card
                    onClose={handleOnClose}
                    visible={showMyModel}
                />
                <Maps_Card onClose={handleOnClose1}
                    visible={showMyModel1}/>
            </form>
        </div>
    );
};

export default CreateCampaign;
