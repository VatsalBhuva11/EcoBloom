import { createContext, useState } from "react";

export const ProfileContext = createContext();

export const ProfileContextProvider = (props) => {
    const profileLSdata = JSON.parse(localStorage.getItem("profile"));
    const [profile, setProfile] = useState({
        url: profileLSdata?.profileUrl || "../assets/images/unknown.jpg",
        name: profileLSdata?.profileName || profileLSdata?.name || "Unknown",
        logo: profileLSdata?.logo || "../assets/images/unknown.jpg",
        banner: profileLSdata?.banner || "../assets/images/unknown.jpg",
    });
    return (
        <ProfileContext.Provider value={[profile, setProfile]}>
            {props.children}
        </ProfileContext.Provider>
    );
};
