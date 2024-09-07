import React, { useState } from "react";
import BasicDetails from "./BasicDetails";
import UploadPhoto from "./UploadPhoto";
import MultiStep from "./MultiStep";
import OrgBasicDetails from "./OrgBasicDetails";
import AddDesc from "./AddDesc";
import UploadDocs from "./UploadDocs";
import logo from "../assets/images/leftArrow.svg";

const FreshUserSignUp = () => {
    const [step, setStep] = useState({
        stepCount: 1,
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
        phone: "",
        photo: null,
    });

    const { stepCount } = step;
    const { name, email, username, password, photo, confirmPassword } = step;

    // go back to previous step
    const prevStep = () => {
        setStep({ ...step, stepCount: step.stepCount - 1 });
    };

    const nextStep = () => {
        setStep({ ...step, stepCount: step.stepCount + 1 });
    };

    const handleChange = (e, value = e.target.value) => {
        let newStep = Object.assign({}, step);
        let input = e.target.name;
        console.log(e);
        newStep[input] = value;
        console.log(newStep);
        setStep(newStep);
    };

    const steps = [
        {
            stepNumber: 1,
            message: "Basic Info",
        },
        {
            stepNumber: 2,
            message: "Add Description",
        },
        {
            stepNumber: 3,
            message: "Upload Documents",
        },
        { stepNumber: 4, message: "Done!" },
    ];
    if (stepCount === 4) {
        setTimeout(() => {
            window.location.replace("/login");
        }, 2000);
    }

    switch (stepCount) {
        case 1:
            return (
                <div>
                    {/* <div className="absolute flex justify-center items-center flex-col text-white top-4 left-8">
                        <img
                            src={logo}
                            height={50}
                            width={70}
                            className=" cursor-pointer hover:scale-105 lg:duration-300"
                            onClick={() => {
                                window.location.href = "/signup";
                            }}
                        />
                        <p>Back to Signup</p>
                    </div> */}
                    <div className='absolute -z-10 bg-[url("./assets/images/authBg.jpg")] flex flex-col w-full h-screen justify-center items-center'>
                        <div className="absolute top-5 w-full flex justify-center items-center">
                            <MultiStep
                                nextStep={nextStep}
                                prevStep={prevStep}
                                stepCount={step.stepCount}
                                steps={steps}
                            />
                        </div>
                        <OrgBasicDetails
                            nextStep={nextStep}
                            handleChange={handleChange}
                            values={step}
                        />
                    </div>
                </div>
            );
        case 2:
            return (
                <div>
                    <div className="absolute flex justify-center items-center flex-col text-white top-4 left-8">
                        <img
                            src={logo}
                            height={50}
                            width={70}
                            className=" cursor-pointer hover:scale-105 lg:duration-300"
                            onClick={() => {
                                window.location.href = "/signup";
                            }}
                        />
                        <p>Back to Signup</p>
                    </div>
                    <div className='absolute -z-10 bg-[url("./assets/images/authBg.jpg")] flex flex-col w-full h-screen justify-center items-center'>
                        <div className="absolute top-5 w-1/2 flex justify-center items-center">
                            <MultiStep
                                nextStep={nextStep}
                                prevStep={prevStep}
                                stepCount={step.stepCount}
                                steps={steps}
                            />
                        </div>
                        <div className="flex flex-col w-full h-screen justify-center items-center">
                            <AddDesc
                                nextStep={nextStep}
                                prevStep={prevStep}
                                values={step}
                                handleChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            );
        case 3:
            return (
                <div>
                    {/* <div className="absolute flex justify-center items-center flex-col text-white top-4 left-8">
                        <img
                            src={logo}
                            height={50}
                            width={70}
                            className=" cursor-pointer hover:scale-105 lg:duration-300"
                            onClick={() => {
                                window.location.href = "/signup";
                            }}
                        />
                        <p>Back to Signup</p>
                    </div> */}
                    <div className='absolute -z-10 bg-[url("./assets/images/authBg.jpg")] flex flex-col w-full h-screen justify-center items-center'>
                        <div className="absolute top-5 w-1/2 flex justify-center items-center">
                            <MultiStep
                                nextStep={nextStep}
                                prevStep={prevStep}
                                stepCount={step.stepCount}
                                steps={steps}
                            />
                        </div>
                        <div className="flex flex-col w-full h-screen justify-center items-center">
                            <UploadDocs
                                nextStep={nextStep}
                                prevStep={prevStep}
                                values={step}
                                handleChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            );

        case 4:
            return (
                <div className="flex flex-col w-full h-screen justify-center items-center">
                    <div className="absolute top-5 w-1/2 flex justify-center items-center">
                        <MultiStep
                            nextStep={nextStep}
                            prevStep={prevStep}
                            stepCount={step.stepCount}
                            steps={steps}
                        />
                    </div>
                    <div className='absolute -z-10 bg-[url("./assets/images/authBg.jpg")] flex flex-col w-full h-screen justify-center items-center'>
                        <h1 className="text-6xl text-white text-center font-bold">
                            Registered Successfully!
                        </h1>
                    </div>
                </div>
            );
        // never forget the default case, otherwise VS code would be mad!
        default:
            return null;
    }
};

export default FreshUserSignUp;
