import { createContext, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { HashLoader } from "react-spinners";

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
                    .then((data) => {
                        console.log(data);
                        setCommunities(data.data);
                        setCurrComm(data.data[0]);
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
