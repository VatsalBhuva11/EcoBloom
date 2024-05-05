import React, { useState } from "react";
import "./MultiStep.css"; // Import the CSS styles

const MultiStep = ({ stepCount, nextStep, prevStep, steps }) => {
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
                            width: `${
                                (stepCount - 1) * (100 / (steps.length - 1))
                            }%`,
                        }}
                    ></span>
                </div>
            </div>
        </div>
    );
};

export default MultiStep;
