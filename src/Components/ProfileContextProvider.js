import { createContext, useState } from "react";

export const ProfileContext = createContext();

export const ProfileContextProvider = (props) => {
    const profileLSdata = JSON.parse(localStorage.getItem("profile"));
    const [profile, setProfile] = useState({
        url: profileLSdata?.profileUrl || "../assets/images/unknown.jpg",
        name: profileLSdata?.profileName || "Unknown",
    });
    return (
        <ProfileContext.Provider value={[profile, setProfile]}>
            {props.children}
        </ProfileContext.Provider>
    );
};
