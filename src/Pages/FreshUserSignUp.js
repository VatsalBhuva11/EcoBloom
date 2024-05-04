import React, { useState } from "react";
import BasicDetails from "./BasicDetails";
import UploadPhoto from "./UploadPhoto";
import ProgressBar from "./ProgressBar";

const FreshUserSignUp = () => {
    const [step, setStep] = useState({
        stepCount: 1,
        email: "",
        name: "",
        password: "",
        phone: "",
        photo: null,
    });

    // go back to previous step
    const prevStep = () => {
        setStep({ ...step, stepCount: step.stepCount - 1 });
    };

    const nextStep = () => {
        setStep({ ...step, stepCount: step.stepCount + 1 });
    };

    const handleChange = (e, value = e.target.value) => {
        if (value) {
            let newStep = Object.assign({}, step);
            let input = e.target.name;
            console.log(e);
            newStep[input] = value;
            console.log(newStep);
            setStep(newStep);
        }
    };

    const { stepCount } = step;
    const { name, email, username, password, photo } = step;

    switch (stepCount) {
        case 1:
            return (
                <div className="flex flex-col w-full h-screen justify-center items-center">
                    {/* <ProgressBar /> */}
                    <BasicDetails
                        nextStep={nextStep}
                        handleChange={handleChange}
                        values={step}
                    />
                </div>
            );
        case 2:
            return (
                <div>
                    {/* <ProgressBar /> */}
                    <div className="flex flex-col w-full h-screen justify-center items-center">
                        <UploadPhoto
                            nextStep={nextStep}
                            prevStep={prevStep}
                            values={step}
                            handleChange={handleChange}
                        />
                    </div>
                </div>
            );
        // case 3:
        //   return (
        //     <Confirmation />
        //   )
        // case 4:
        //   return (
        //     <Success />
        //   )
        // never forget the default case, otherwise VS code would be mad!
        default:
            return null;
    }
};

export default FreshUserSignUp;
