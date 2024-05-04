import React, { useState } from "react";
import "./MultiStep.css"; // Import the CSS styles
const steps = [
    {
        stepNumber: 1,
        message: "Basic Info",
    },
    {
        stepNumber: 2,
        message: "Upload Photo",
    },
    {
        stepNumber: 3,
        message: "Done!",
    },
];
const MultiStep = ({ stepCount, nextStep, prevStep }) => {
    return (
        <div className="container">
            <div className="steps-container">
                {steps.map((step) => (
                    <span key={step.stepNumber}>
                        {step.stepNumber > 1 && <div className="line"></div>}
                        <span
                            className={`step-circle ${
                                step.stepNumber === stepCount ? "active" : ""
                            }`}
                        >
                            {step.stepNumber}
                        </span>
                    </span>
                ))}
                <div className="progress-bar-container">
                    <span
                        className="progress-indicator"
                        style={{
                            width: `${(stepCount - 1) * 50}%`,
                        }}
                    ></span>
                </div>
            </div>
        </div>
    );
};

export default MultiStep;
