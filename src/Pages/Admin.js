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
import Loader from "../assets/images/Animation.gif";


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
                        unreviewed: orgsInfo.unreviewed - 1,
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
                <img src={Loader} height={200} width={200}></img>
            </div>
        );
    }



    if (!loading && !user) {
        window.location.replace("/login");
    }

    return (
        <div className="bg-[#fbfbfa] h-screen flex flex-col ">
            <div className="flex justify-between">
                    <div className="flex items-center pt-3 ">
                        <Link to="/home">
                            <img
                                className="h-16 hover:scale-105 duration-300"
                                src={logo}
                                alt=""
                            />
                        </Link>
                        
                    </div>
                    <div className="flex justify-center mt-16   ">
                    <p className="text-lg  sm:text-2xl md:text-3xl font-bold text-[#277868] pt-2">
                            VERIFY ORGANIZATION
                        </p>
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
                <div className="flex justify-center items-center rounded-3xl p-2 md:p-4 bg-[#277868] w-3/4 mt-4 md:mt-8">
                    <div className="w-full text-gray-100 border-r-2 border-b-gray-100 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
                        <div className="flex justify-center">
                            <p>Accepted: </p>
                            <p className="pl-2">
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
                            <p className="pl-2 ">
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
                <div className="flex justify-center items-center rounded-xl p-1 md:p-2 bg-[#277868] w-11/12">
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
                                <div className="flex justify-center items-center rounded-xl p-1 md:p-2 bg-[#D7E6E3] w-11/12 mt-3 md:mt-4">
                                    <div className="w-full text-[#277868] border-r-2 border-gray-500 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
                                        <div className="flex justify-center">
                                            <p className="font-semibold">
                                                {org.name}{" "}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-full text-[#277868] border-r-2 border-gray-500 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
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
                                                className="hover:scale-105 justify-center flex items-center duration-300  bg-[#aeab6a] text-[#edede3] w-32 h-8 rounded-2xl  font-medium text-[14px]"
                                                id={"org" + key}
                                            >
                                                <div role="status">
                                                    <svg
                                                        aria-hidden="true"
                                                        class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                                        viewBox="0 0 100 101"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                            fill="currentColor"
                                                        />
                                                        <path
                                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                            fill="currentFill"
                                                        />
                                                    </svg>
                                                    <span class="sr-only">
                                                        Loading...
                                                    </span>
                                                </div>
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    handleVerifyOrg(
                                                        org.firebaseId,
                                                        key
                                                    );
                                                }}
                                                className="hover:scale-105 duration-300  bg-[#a4a163] text-[#edede3] w-32 h-8 rounded-2xl  font-medium text-[14px]"
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
