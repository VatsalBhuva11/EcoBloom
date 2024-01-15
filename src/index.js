import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./output.css";

//access env variables by creating .env file in /, and adding REACT_APP_ prefix to each variable
//run npm start after changing/creating .env file to see changes. after that run npm run build to see changes in production

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
