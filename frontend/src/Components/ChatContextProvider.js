import { createContext, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { HashLoader } from "react-spinners";
import { auth, storage } from "../firebase.js";
import { getDownloadURL, ref } from "firebase/storage";
import Loader from "../assets/images/Animation.gif";

export const ChatContext = createContext();

export const ChatContextProvider = (props) => {
    const [currComm, setCurrComm] = useState({
        id: "",
        name: "",
        logo: "",
    });

    const [communities, setCommunities] = useState([]);
    const [user, loading, error] = useAuthState(auth);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setLoader(true);
        console.log("USEEFFECT: ", auth.currentUser);
        if (auth.currentUser) {
            auth.currentUser.getIdTokenResult().then((result) => {
                console.log("RESULT: ", result);
                const idToken = result.token;
                const role = result.claims.role;
                if (role === "user") {
                    fetch(
                        `${process.env.REACT_APP_DEPLOYED_API_URL}/user/communities`,
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${idToken}`,
                            },
                        }
                    )
                        .then((res) => res.json())
                        .then(async (data) => {
                            console.log(data);
                            let comms = data.data;

                            let logoPromises = comms.map(async (comm) => {
                                const storageRef = ref(
                                    storage,
                                    comm.organization.logo
                                );
                                return getDownloadURL(storageRef);
                            });

                            let logoPromisesResolved = await Promise.all(
                                logoPromises
                            );

                            let updatedComms = comms.map((comm, index) => {
                                return {
                                    ...comm,
                                    logo: logoPromisesResolved[index],
                                };
                            });

                            console.log("updatedComms: ", updatedComms);

                            setCommunities(updatedComms);
                            if (updatedComms.length > 0) {
                                setCurrComm(updatedComms[0]);
                            }
                            setLoader(false);
                        })
                        .catch((err) => {
                            console.log(err);
                            setLoader(false);
                            throw new Error(
                                "Error occurred while fetching communities"
                            );
                        });
                } else {
                    setLoader(false);
                }
            });
        } else {
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

    return (
        <ChatContext.Provider
            value={{
                currComm,
                setCurrComm,
                communities,
                setCommunities,
            }}
        >
            {props.children}
        </ChatContext.Provider>
    );
};
