import React, { useState } from "react";
import "./MultiStep.css"; // Import the CSS styles

const MultiStep = ({ stepCount, nextStep, prevStep }) => {
    return (
        <div className="container">
            <div className="steps-container">
                {[1, 2, 3].map((stepNumber) => (
                    <span key={stepNumber}>
                        {stepNumber > 1 && <div className="line"></div>}
                        <span
                            className={`step-circle ${
                                stepNumber === stepCount ? "active" : ""
                            }`}
                        >
                            {stepNumber}
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
