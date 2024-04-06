import React, { useContext, useEffect, useState } from "react";
import logo_new from "../assets/images/logo_new.png";
import banner from "../assets/images/banner1.jpg";
import logo_commu from "../assets/images/logo_commu.jpg";
import { ProfileContext } from "../Components/ProfileContextProvider.js";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { jwtDecode } from "jwt-decode";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, storage } from "../firebase.js";
import { getDownloadURL, ref } from "firebase/storage";

const Communities = () => {
    const [search, setSearch] = useState("");
    const [profile, setProfile] = useContext(ProfileContext);
    const [orgs, setOrgs] = useState([]);
    //const [loading, setLoading] = useState(true);
    const [loader, setLoader] = useState(true);
    const [user, loading, error] = useAuthState(auth);
    // const [profile, setProfile] = useState(pers
    useEffect(() => {
        if (auth.currentUser) {
            auth.currentUser.getIdToken().then((idToken) => {
                const idTokenResult = jwtDecode(idToken);
                console.log(idTokenResult);
                if (idTokenResult.role === "org") {
                    window.location.replace("/org/dashboard");
                    // <Navigate to = 'org/dashboard'  replace  = {true}/>
                }
                fetch(`${process.env.REACT_APP_DEPLOYED_API_URL}/org`)
                    .then((response) => response.json())
                    .then((orgsFetched) => {
                        console.log(orgsFetched.data);
                        if (orgsFetched.data) {
                            (async () => {
                                const postsPromises = orgsFetched.data.map(
                                    async (org) => {
                                        const storageRef1 = ref(
                                            storage,
                                            org.logo
                                        );
                                        const storageRef2 = ref(
                                            storage,
                                            org.banner
                                        );
                                        const urls = await Promise.all([
                                            getDownloadURL(storageRef1),
                                            getDownloadURL(storageRef2),
                                        ]);

                                        return {
                                            ...org,
                                            logo: urls[0],
                                            banner: urls[1],
                                        };
                                    }
                                );
                                const posts = await Promise.all(postsPromises);
                                setOrgs(posts);
                                console.log(posts);
                            })();
                        }
                        setLoader(false);
                    })
                    .catch((err) => {
                        console.log(
                            "error occurred while fetching organizations"
                        );
                        console.log(err);
                        setLoader(false);
                    });
            });
        }
    }, [loading]);

    if (loading || loader) {
        return (
            <div className="h-screen flex items-center justify-center">
                <HashLoader color="#36d7b7" size={100} />
            </div>
        );
    }
    return (
        <div className="h-screen w-full bg-[#eef0e5]">
            <div className="flex items-center justify-between ">
                <Link to="/">
                    <img
                        className="w-20 md:w-28 lg:w-32 ml-2 mt-1 cursor-pointer hover:scale-105 duration-300"
                        src={logo_new}
                        alt=""
                    />
                </Link>
                <p className="text-lg sm:text-2xl md:text-3xl font-bold">
                    COMMUNITIES TO EXPLORE
                </p>
                <div className="flex items-center mr-4 gap-3">
                    <Link to="/user/profile">
                        <img
                            className="w-9 md:w-12 lg:w-14 rounded-full h-9 md:h-12 lg:h-14"
                            src={profile.url}
                            alt=""
                        />
                    </Link>
                    <p className="hidden sm:flex text-xl font-medium">
                        {profile.name}
                    </p>
                </div>
            </div>
            <div className="mx-8 my-3">
                <input
                    onChange={(e) => setSearch(e.target.value.toLowerCase())}
                    type="text"
                    className="w-full h-10 rounded-2xl px-4"
                    placeholder="🔍 Search For Communities"
                />
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 p-7 gap-y-7 h-[83%] md:h-[80%] lg:h-[79%] overflow-scroll">
                {orgs
                    ?.filter((org) => {
                        return search.toLowerCase() === ""
                            ? org
                            : org.name.toLowerCase().includes(search);
                    })
                    .map((org) => {
                        if (org.isVerified) {
                            return (
                                <div className="w-[21.5rem] lg:w-[24.5rem] bg-[#DFE4C5] flex-col rounded-lg h-64 lg:h-56">
                                    <div className="w-[21.5rem] lg:w-[24.5rem] h-20 p-2 overflow-hidden">
                                        <img
                                            className="rounded-xl bg-cover"
                                            src={org.banner}
                                            alt=""
                                        />
                                    </div>
                                    <div className="flex pl-8 justify-center items-center w-full">
                                        <div className="w-1/4">
                                            <img
                                                className="w-16 h-16 relative bottom-[3rem] lg:bottom-[rem]"
                                                src={org.logo}
                                                alt=""
                                            />
                                        </div>
                                        <div className="w-3/4 flex flex-col justify-center pl-6 pt-4">
                                            <div className="text-lg lg:text-xl font-medium overflow-hidden">
                                                {org.name}
                                            </div>
                                            <div>{org.members} Members</div>
                                            <div className="text-xs">
                                                {org.description.slice(0, 30)}
                                                ...
                                            </div>
                                            <button
                                                onClick={() => {
                                                    window.location.href = `/org/profile/${org.firebaseId}`;
                                                }}
                                                className="w-36 mt-2 text-[16px] text-[#eef0e5] rounded-3xl bg-[#0F1035] hover:scale-105 duration-200 flex justify-center gap-1"
                                            >
                                                See Profile{" "}
                                                <div className="text-md mt-[0.34rem]">
                                                    {" "}
                                                    <FaArrowRightLong />{" "}
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                        return <></>;
                    })}
            </div>
        </div>
    );
};

export default Communities;
