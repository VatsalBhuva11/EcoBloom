import React, { useState } from "react";
import BasicDetails from "./BasicDetails";
import UploadPhoto from "./UploadPhoto";
import MultiStep from "./MultiStep";

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

    // go back to previous step
    const prevStep = () => {
        setStep({ ...step, stepCount: step.stepCount - 1 });
    };

    const nextStep = () => {
        setStep({ ...step, stepCount: step.stepCount + 1 });
    };

    const handleChange = (e, value = e.target.value.trim()) => {
        let newStep = Object.assign({}, step);
        let input = e.target.name;
        console.log(e);
        newStep[input] = value;
        console.log(newStep);
        setStep(newStep);
    };

    const { stepCount } = step;
    const { name, email, username, password, photo, confirmPassword } = step;

    switch (stepCount) {
        case 1:
            return (
                <div className="flex flex-col w-full h-screen justify-center items-center">
                    <div className="absolute top-5 w-1/2">
                        <MultiStep
                            nextStep={nextStep}
                            prevStep={prevStep}
                            stepCount={step.stepCount}
                        />
                    </div>
                    <BasicDetails
                        nextStep={nextStep}
                        handleChange={handleChange}
                        values={step}
                    />
                </div>
            );
        case 2:
            return (
                <div className="flex flex-col w-full h-screen justify-center items-center">
                    <div className="absolute top-5 w-1/2">
                        <MultiStep
                            nextStep={nextStep}
                            prevStep={prevStep}
                            stepCount={step.stepCount}
                        />
                    </div>
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

        case 3:
            return (
                <div>
                    <MultiStep
                        nextStep={nextStep}
                        prevStep={prevStep}
                        stepCount={step.stepCount}
                    />
                    <h1>Registered successfully!</h1>
                </div>
            );
        // never forget the default case, otherwise VS code would be mad!
        default:
            return null;
    }
};

export default FreshUserSignUp;
