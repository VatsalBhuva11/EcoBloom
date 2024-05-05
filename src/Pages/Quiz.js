import React, { useState, useEffect } from "react";
import questionImg from "../assets/images/question.png";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { HashLoader } from "react-spinners";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.js";
import { jwtDecode } from "jwt-decode";
import Loader from "../assets/images/Animation.gif";

const Quiz = () => {
    const [user, loading, error] = useAuthState(auth);

    const [question, setQuestion] = useState({});
    const [loader, setLoader] = useState(true);
    const [answered, setAnswered] = useState(false);
    const [correct, setCorrect] = useState(null);
    const [optionSelected, setOptionSelected] = useState("");

    useEffect(() => {
        if (!auth.currentUser) {
            window.location.replace("/login");
            return; // Stop execution if user is not authenticated
        }

        console.log("COMING HERE");

        // fetch(`${process.env.REACT_APP_LOCAL_API_URL}/question`)
        fetch(`${process.env.REACT_APP_DEPLOYED_API_URL}/question`)
            .then((res) => res.json())
            .then((res) => res.data)
            .then((question) => {
                // Now that we have the question, fetch the answered question
                auth.currentUser.getIdToken().then((token) => {
                    let decodedToken = jwtDecode(token);
                    return fetch(
                        `${process.env.REACT_APP_DEPLOYED_API_URL}/question/${decodedToken.userId}/answered`,
                        // `${process.env.REACT_APP_LOCAL_API_URL}/question/${decodedToken.userId}/answered`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                question,
                            }),
                        }
                    )
                        .then((res) => res.json())
                        .then((res) => res.data)
                        .then((answeredQuestion) => {
                            // Handle the response from the second fetch
                            console.log("Question:", question);
                            console.log("Answered Question:", answeredQuestion);

                            setQuestion(question);
                            setLoader(false);

                            if (
                                answeredQuestion &&
                                answeredQuestion.attemptedStatus === true
                            ) {
                                setAnswered(true);
                                setOptionSelected(answeredQuestion.attempted);
                                setCorrect(
                                    answeredQuestion.attempted ===
                                        question.correctAnswer
                                );
                            }
                        })
                        .catch((err) => {
                            console.log(
                                "Error occurred while fetching answered question: ",
                                err
                            );
                            throw err; // Propagate the error
                        });
                });
            })
            .catch((err) => {
                console.log("Error occurred while fetching questions: ", err);
                setLoader(false);
            });
    }, []);

    async function checkAnswer(e) {
        if (answered) return;
        setAnswered(true);
        console.log(e.target.value);
        setOptionSelected(e.target.value);
        if (e.target.value === question.correctAnswer) {
            setCorrect(true);
        } else {
            setCorrect(false);
        }
        const body = {
            question,
            option: e.target.value,
        };
        auth.currentUser.getIdToken().then((token) => {
            fetch(
                `${process.env.REACT_APP_DEPLOYED_API_URL}/question/checkAnswer`,
                // `${process.env.REACT_APP_LOCAL_API_URL}/question/checkAnswer`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(body),
                }
            )
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    setTimeout(() => {
                        window.location.href = "/user/dashboard";
                    }, 3000);
                })
                .catch((err) => {
                    console.log(
                        "Error occurred while fetching question: ",
                        err
                    );
                });
        });
    }

    if (loading || loader) {
        return (
            <div className="h-screen flex items-center justify-center">
                <img src={Loader} height={200} width={200}></img>
            </div>
        );
    }
    return (
        <div className="bg-cover bg-fixed bg-center bg-no-repeat bg-[url('./assets/images/quiz_bg.jpg')] h-screen">
            <img
                className="h-24 absolute z-20 hover:scale-105 cursor-pointer duration-300"
                src={logo}
                alt=""
                onClick={() => {
                    window.location.href = "/user/dashboard";
                }}
            />
            <div className="absolute flex flex-col justify-center items-center h-screen w-screen top-0 left-0">
                <div className="xl:flex w-[80%]">
                    <img
                        className="hidden xl:flex mr-[-16rem] xl:w-36 ml-12 2xl:w-56 "
                        src={questionImg}
                        alt=""
                    />
                    <div className="w-3/4 mx-auto mt-24 p-4  md:p-8 lg:p-20 rounded-3xl bg-gradient-to-l from-[#335252] via-[#335252] to-[#496E6E ]">
                        <div className="text-[#c1c1c1] text-xl md:text-2xl lg:text-3xl xl:text-4xl   text-center ">
                            {question.question}
                        </div>
                    </div>
                </div>
                <div className="w-3/4  mx-auto mt-24 px-4">
                    <div className="flex gap-8 lg:gap-24 2xl:gap-48 xl:px-32 justify-between text-[#c1c1c1]">
                        <button
                            onClick={(e) => {
                                checkAnswer(e);
                            }}
                            className={
                                "border-[1px] border-[#EECB46]  py-2 md:py-4 rounded-full w-1/2 text-2xl  " +
                                (!answered
                                    ? "  hover:bg-[#335252] "
                                    : question.options[0] ===
                                      question.correctAnswer
                                    ? " cursor-default  bg-green-700 "
                                    : "cursor-default") +
                                (optionSelected === question.options[0]
                                    ? correct === true
                                        ? " bg-green-700 "
                                        : correct === false
                                        ? " bg-red-500 "
                                        : ""
                                    : "")
                            }
                            value={question.options[0]}
                        >
                            A. {question.options[0]}
                        </button>
                        <button
                            onClick={(e) => {
                                checkAnswer(e);
                            }}
                            className={
                                "border-[1px] border-[#EECB46]  py-2 md:py-4 rounded-full w-1/2 text-2xl  " +
                                (!answered
                                    ? "  hover:bg-[#335252] "
                                    : question.options[1] ===
                                      question.correctAnswer
                                    ? " cursor-default  bg-green-700 "
                                    : "cursor-default") +
                                (optionSelected === question.options[1]
                                    ? correct === true
                                        ? " bg-green-700 "
                                        : correct === false
                                        ? " bg-red-500 "
                                        : ""
                                    : "")
                            }
                            value={question.options[1]}
                        >
                            B. {question.options[1]}
                        </button>
                    </div>
                    <div className="flex gap-8 lg:gap-24 2xl:gap-48 xl:px-32 justify-between text-[#c1c1c1] mt-8 2xl:mt-12 ">
                        <button
                            onClick={(e) => {
                                checkAnswer(e);
                            }}
                            className={
                                "border-[1px] border-[#EECB46]  py-2 md:py-4 rounded-full w-1/2 text-2xl  " +
                                (!answered
                                    ? "  hover:bg-[#335252] "
                                    : question.options[2] ===
                                      question.correctAnswer
                                    ? " cursor-default  bg-green-700 "
                                    : "cursor-default") +
                                (optionSelected === question.options[2]
                                    ? correct === true
                                        ? " bg-green-700 "
                                        : correct === false
                                        ? " bg-red-500 "
                                        : ""
                                    : "")
                            }
                            value={question.options[2]}
                        >
                            C. {question.options[2]}
                        </button>
                        <button
                            onClick={(e) => {
                                checkAnswer(e);
                            }}
                            className={
                                "border-[1px] border-[#EECB46]  py-2 md:py-4 rounded-full w-1/2 text-2xl  " +
                                (!answered
                                    ? "  hover:bg-[#335252] "
                                    : question.options[3] ===
                                      question.correctAnswer
                                    ? " cursor-default  bg-green-700 "
                                    : "cursor-default") +
                                (optionSelected === question.options[3]
                                    ? correct === true
                                        ? " bg-green-700 "
                                        : correct === false
                                        ? " bg-red-500 "
                                        : ""
                                    : "")
                            }
                            value={question.options[3]}
                        >
                            D. {question.options[3]}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quiz;
