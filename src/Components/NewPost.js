import React, { useState } from "react";
import tick from "../assets/images/tick.png";
import { Link } from "react-router-dom";
import { is } from "@babel/types";

const NewPost = ({ visible, onClose }) => {

    const [file, setFile] = useState();
    const [isfile, setIsfile] = useState(false);

    const handleOnClose = (e) => {
        if (e.target.id === "container") onClose();
        setIsfile(false)
    };

    if (!visible) return null;



    const handleOnChange = (e) => {
        
        setFile(URL.createObjectURL(e.target.files[0]))
        setIsfile(true);
    }

    return (
        <div
            id="container"
            onClick={handleOnClose}
            className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center"
        >
            <div className="bg-[#CDE1C9] p-2 rounded w-92 flex flex-col justify-center px-20">
                <div className="text-center font-bold text-lg mb-3">ADD A NEW POST</div>

                {isfile && <img className="p-3 h-[350px] w-[350px]" src={file} alt='..' />}
                {/* <label>Upload your image</label> */}
                {!isfile && <input
                    class="block w-full text-sm  file:bg-[#0f1035] mt-4  file:text-white file:p-2 file:rounded-lg file:font-bold file:hover:scale-105 file:duration-300 rounded-lg cursor-pointer focus:outline-none bg-transparent text-[#0f1035]"
                    type="file"
                    accept="image/*"
                    required
                    onChange={handleOnChange}
                />}
                <div className="mt-4">
                    <label
                        for="text"
                        class="block mb-2 text-sm font-medium text-gray-900 "
                    >
                        Caption for post
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        class=" bg-transparent border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-700 placeholder-opacity-70"
                        required
                    />
                    <div className="flex justify-around mt-7 mb-5">
                        <button
                             onClick={() => {
                                document.getElementById("container").click();
                            }}
                            className="text-lg bg-[#EEF0E5] text-[#0F1035] w-32 h-8 rounded-lg border-2 border-[#0F1035]"
                        >
                            Cancel
                            </button>
                       {isfile && 
                        
                        <button
                            className="text-lg bg-[#0F1035] text-[#EEF0E5] w-32 h-8 rounded-lg"
                        >
                            Create Post
                        </button>} 
                    
                        
                    </div>
                </div>



            </div>
        </div>
    );
};

export default NewPost;


