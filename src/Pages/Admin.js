import React, { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, storage } from "../firebase.js";
import { getDownloadURL, ref } from "firebase/storage";
import { HashLoader } from "react-spinners";
import { FaRegFilePdf } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import moment from "moment";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
const Admin = () => {
    const [search, setSearch] = useState("");
    const [_userAuth, loading, error] = useAuthState(auth);
    const [loader, setLoader] = useState(true);
    const [user, setUser] = useState({});
    const [orgs, setOrgs] = useState([]);
    const [orgsInfo, setOrgsInfo] = useState({
        accepted: 0,
        rejected: 0,
        unreviewed: 0,
    });
    const [clicked, setClicked] = useState({ id: null });

    function handleVerifyOrg(firebaseId, key) {
        setClicked({ id: firebaseId });
        fetch(
            `${process.env.REACT_APP_DEPLOYED_API_URL}/admin/verify?orgId=${firebaseId}`,
            {
                method: "POST",
                headers: {
                    authorization: `Bearer ${_userAuth.accessToken}`,
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                console.log("data: ", data);
                if (data.status === "OK") {
                    console.log("OKKKAY");
                    var old = document.getElementById("org" + key);
                    var newElem = document.createElement("button");
                    newElem.disabled = true;
                    newElem.className =
                        "hover:scale-105 duration-300 bg-[#6BBE7D] text-[#edede3] w-32 h-8 rounded-2xl font-medium text-[14px]";
                    newElem.innerText = "VERIFIED";
                    setOrgsInfo({
                        ...orgsInfo,
                        accepted: orgsInfo.accepted + 1,
                    });
                    old.parentNode.replaceChild(newElem, old);
                    setClicked(false);
                } else {
                    console.log("Error occurred while verifying organisation.");
                    setClicked(false);
                }
            });
    }

    useEffect(() => {
        if (auth.currentUser) {
            auth.currentUser.getIdTokenResult().then((idTokenResult) => {
                if (idTokenResult.claims.role !== "admin") {
                    window.location.replace("/home");
                } else {
                    fetch(`${process.env.REACT_APP_DEPLOYED_API_URL}/org/`)
                        .then((res) => res.json())
                        .then(async (data) => {
                            console.log(data);
                            let updatedOrgDocs = await Promise.all(
                                data.data.map(async (org) => {
                                    console.log(org);
                                    const storageRef = ref(
                                        storage,
                                        org.document
                                    );
                                    const urlFetched = await getDownloadURL(
                                        storageRef
                                    );
                                    console.log(urlFetched);
                                    const orgData = {
                                        ...org,
                                        document: urlFetched,
                                    };
                                    console.log(`org ${org.name}: `, orgData);
                                    return orgData;
                                })
                            );

                            let accepted = 0;
                            updatedOrgDocs.forEach((org) => {
                                if (org.isVerified) accepted++;
                            });
                            setOrgsInfo({
                                ...orgsInfo,
                                accepted,
                                unreviewed: updatedOrgDocs.length - accepted,
                            });
                            setOrgs(updatedOrgDocs);
                            setLoader(false);
                        })
                        .catch((err) => {
                            console.log(
                                "error occurred while fetching organisations",
                                err
                            );
                        });
                }
            });
        } else {
            window.location.replace("/login");
            setLoader(false);
        }
    }, [loading]);

    if (loading || loader) {
        return (
            <div className="h-screen flex items-center justify-center">
                <HashLoader color="#36d7b7" size={100} />
            </div>
        );
    }

    if (!loading && !user) {
        window.location.replace("/login");
    }

    return (
        <div className="bg-[#eef0e5] h-screen flex flex-col ">
            <div className="flex justify-between">
                <div>
                    <div className="flex items-center pt-3 md:pt-6">
                        <Link to="/home">
                            <img
                                className="h-16 hover:scale-105 duration-300 mt-4 ml-4 sm:ml-8 md:ml-12"
                                src={logo}
                                alt=""
                            />
                        </Link>
                        <p className="text-lg sm:text-2xl md:text-3xl font-bold text-[#191B58] pt-2">
                            VERIFY ORGANIZATION
                        </p>
                    </div>
                </div>
                <div className=" cursor-pointer hover:scale-105 text-xl sm:text-2xl md:text-4xl lg:text-5xl flex justify-center items-center lg:mr-10 md:mr-8 sm:mr-6 mr-3">
                    <button
                        onClick={() => {
                            auth.signOut();
                            window.location.replace("/login");
                        }}
                    >
                        <IoLogOutOutline className="cursor-pointer" />
                    </button>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <div className="flex justify-center items-center rounded-3xl p-2 md:p-4 bg-gradient-to-r from-[#353657] to-[#404162] w-3/4 mt-4 md:mt-8">
                    <div className="w-full text-gray-100 border-r-2 border-b-gray-100 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
                        <div className="flex justify-center">
                            <p>Accepted: </p>
                            <p className="pl-2 text-[#EAC5C5]">
                                {orgsInfo.accepted}
                            </p>
                        </div>
                    </div>
                    {/* <div className="w-full text-gray-100 border-r-2 border-b-gray-100 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
                        <div className="flex justify-center">
                            <p>Rejected: </p>
                            <p className="pl-2 text-[#EAC5C5]">
                                {orgsInfo.rejected}
                            </p>
                        </div>
                    </div> */}
                    <div className="w-full text-gray-100 border-b-gray-100 p-2  md:text-[20px] sm:text-[15px] text-[13px]">
                        <div className="flex justify-center">
                            <p>Unreviewed: </p>
                            <p className="pl-2 text-[#EAC5C5]">
                                {orgsInfo.unreviewed}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mx-8 my-3">
                <input
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    className="w-full h-10 rounded-2xl px-4"
                    placeholder="🔍 Search For Communities"
                />
            </div>
            {/* 
      search */}
            <div className="flex items-center justify-center font-semibold ">
                <div className="flex justify-center items-center rounded-xl p-1 md:p-2 bg-gradient-to-r from-[#353657] to-[#404162] w-11/12">
                    <div className="w-full text-gray-100 border-r-2 border-b-gray-700 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
                        <div className="flex justify-center">
                            <p>Name </p>
                        </div>
                    </div>
                    <div className="w-full text-gray-100 border-r-2 border-b-gray-700 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
                        <div className="flex justify-center">
                            <p>Apply Date </p>
                        </div>
                    </div>
                    <div className="w-full text-gray-100 border-r-2 border-b-gray-700 p-2  md:text-[20px] sm:text-[15px] text-[13px]">
                        <div className="flex justify-center">
                            <p>Information </p>
                        </div>
                    </div>
                    <div className="w-full text-gray-100  border-b-gray-700 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
                        <div className="flex justify-center">
                            <p>Status </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-full overflow-scroll mb-5 overflow-x-hidden">
                {orgs
                    .filter((org) => {
                        return search.toLowerCase() === ""
                            ? org
                            : org.name.toLowerCase().includes(search);
                    })
                    .map((org, key) => {
                        return (
                            <div className="flex items-center justify-center  ">
                                <div className="flex justify-center items-center rounded-xl p-1 md:p-2 bg-[#E4E8D3] w-11/12 mt-3 md:mt-4">
                                    <div className="w-full text-gray-700 border-r-2 border-gray-500 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
                                        <div className="flex justify-center">
                                            <p className="font-semibold">
                                                {org.name}{" "}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-full text-gray-700 border-r-2 border-gray-500 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
                                        <div className="flex justify-center">
                                            <p>
                                                {moment(org.applyDate).format(
                                                    "ll"
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-full flex justify-center text-gray-700 border-r-2 border-gray-500 p-2  md:text-[20px] sm:text-[15px] text-[13px]">
                                        <a href={org.document}>
                                            <FaRegFilePdf />
                                        </a>
                                    </div>
                                    <div className="w-full flex justify-center text-gray-700 p-2  md:text-[20px] sm:text-[15px] text-[13px]">
                                        {org.isVerified ? (
                                            <button
                                                disabled
                                                className="hover:scale-105 duration-300  bg-[#6BBE7D] text-[#edede3] w-32 h-8 rounded-2xl  font-medium text-[14px]"
                                            >
                                                VERIFIED
                                            </button>
                                        ) : clicked.id === org.firebaseId ? (
                                            <button
                                                onClick={() => {
                                                    handleVerifyOrg(
                                                        org.firebaseId,
                                                        key
                                                    );
                                                }}
                                                className="hover:scale-105 duration-300  bg-[#bff148] text-[#edede3] w-32 h-8 rounded-2xl  font-medium text-[14px]"
                                                id={"org" + key}
                                            >
                                                ACCEPT
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    handleVerifyOrg(
                                                        org.firebaseId,
                                                        key
                                                    );
                                                }}
                                                className="hover:scale-105 duration-300  bg-[#BEBA6B] text-[#edede3] w-32 h-8 rounded-2xl  font-medium text-[14px]"
                                                id={"org" + key}
                                            >
                                                ACCEPT
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                {/* .. */}
            </div>
        </div>
    );
};

export default Admin;
