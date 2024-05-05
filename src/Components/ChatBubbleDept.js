import React from "react";

export default function ChatBubbleDept({ message }) {
    console.log("MESSAGE DEPT: ", message);

    return (
        <div className="flex justify-end">
            <div className="flex w-fit max-w-[35%]   gap-2.5 mt-2 mb-2 mr-4">
                <div className="flex flex-col  p-2 shadow-lg border-gray-200 bg-[#20A090] rounded-tl-lg rounded-bl-lg rounded-br-lg ">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse"></div>
                    <p className="text-sm font-normal p-1 text-white">
                        {message.text}
                    </p>
                </div>
            </div>
        </div>
    );
}
