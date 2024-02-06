import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import person from "../assets/images/person.png";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { BiRepost } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";

const NewPost = ({ visible, onClose, post, org }) => {
    const handleOnClose = (e) => {
        if (e.target.id === "container") {
            onClose();
        }
    };

    const [liked, setLiked] = useState(false);

    if (!visible) return null;

    return (
        <div
            id="container"
            onClick={handleOnClose}
            className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center"
        >
            <div className="bg-[#CDE1C9] p-2 rounded-lg w-[40%] flex flex-col justify-center">
                <div className="flex justify-between">
                    <div className="flex items-center lg:gap-3 p-2 hover:scale-105 duration-300">
                        <img
                            className="w-[30px] h-[30px] rounded-full"
                            src={org.logo ? org.logo : person}
                            alt=""
                        />
                        <div>
                            <p className=" text-[14px] mt-1 lg:mt-0 font-semibold">
                                {org.name}
                            </p>
                            {/* <p className='text-[#eef0e5] text-[0.75rem]'>32 members</p>*/}
                        </div>
                    </div>
                    <div className="flex gap-2 mr-2">
                        <BsThreeDots className="text-xl" />
                        <IoMdClose
                            className="text-xl"
                            onClick={() => {
                                onClose();
                            }}
                            style={{ cursor: "pointer" }}
                        />
                    </div>
                </div>
                {post.content ? (
                    <div className="p-2 text-sm ">{post.content}</div>
                ) : null}

                <div className="p-2">
                    <img
                        src={post.photo}
                        alt=".."
                        className="rounded-lg w-full h-full"
                    />
                </div>
                <div className="flex justify-around mt-2">
                    <button>
                        <BiLike className="text-3xl" />
                    </button>
                    <button>
                        <FaRegCommentDots className="text-3xl" />
                    </button>
                    <button>
                        <BiRepost className="text-3xl" />
                    </button>
                    <button>
                        <IoIosSend className="text-3xl" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewPost;
