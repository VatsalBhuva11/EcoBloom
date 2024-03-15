import { createContext, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { HashLoader } from "react-spinners";
import { auth, storage } from "../firebase.js";
import { getDownloadURL, ref } from "firebase/storage";

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
        if (auth.currentUser) {
            auth.currentUser.getIdToken().then((idToken) => {
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
                        setCurrComm(updatedComms[0]);
                        setLoader(false);
                    })
                    .catch((err) => {
                        console.log(err);
                        setLoader(false);
                        throw new Error(
                            "Error occurred while fetching communities"
                        );
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
