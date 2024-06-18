import React from 'react';
import { Link } from 'react-router-dom';
import appwriteService from "../appwrite/config";
import parse from "html-react-parser";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IconContext } from "react-icons";
import { formatDistanceToNow } from "date-fns";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { toggleSavePost } from "../store/postSlice"

function PostCard({ $id, title, featuredImage, content }) {
    const truncatedContent = content.length > 180 ? `${content.substring(0, 180)}...` : content;

    const dispatch = useDispatch();
    const [isSaved, setIsSaved] = useState(false);

    const handleSavePost = () => {
        setIsSaved(!isSaved);
        dispatch(toggleSavePost({ $id, title, featuredImage, content }))

    }

    return (
        <div className="group p-3 w-full rounded-xl overflow-hidden flex flex-col md:flex-row bg-gray-100 dark:bg-[#ecf0f8] border border-black">
            <div className="relative rounded-xl overflow-hidden w-full md:w-[20rem] lg:w-60 h-60 flex-none ">
                <img
                    src={appwriteService.getFilePreview(featuredImage)}
                    alt={title}
                    className="group-hover:scale-105 transition-transform duration-500 ease-in-out size-full absolute top-0 start-0 object-cover rounded-xl"
                />
            </div>
            <div className="mt-4 sm:mt-0 sm:ms-2 sm:px-2 w-full ">
                <div className="flex items-center justify-between mt-1 lg:mt-0 mr-1">
                    <h3 className="text-xl font-bold text-black group-hover:text-gray-600 dark:text-black dark:group-hover:text-black">
                        {title}
                    </h3>
                    <div className="flex flex-row gap-2 items-center justify-center ">
                        <IconContext.Provider value={{ size: "1.5em" }}>
                            {isSaved ? <FaHeart className="text-red-700" onClick={handleSavePost} /> : <FaRegHeart className="text-black" onClick={handleSavePost} />}
                        </IconContext.Provider>
                        <span className="text-md dark:text-black-100 text-gray-900">
                            {isSaved ? 'Saved' : 'Save'}
                        </span>
                    </div>
                </div>
                <div className="min-h-[6rem]">
                    <p className="mt-3 text-black dark:text-black text-left">
                        {parse(truncatedContent)}
                    </p>
                    <Link to={`/post/${$id}`} >
                        <p className="gap-x-1 dark:text-blue-900 text-blue-900 decoration-2 hover:underline font-medium text-left">
                            Read more {">"}
                        </p>
                    </Link>
                </div>
                <div className="author flex items-center gap-2 mt-2 ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="2em"
                        height="2em"
                        viewBox="0 0 1024 1024"
                    >
                        {/* SVG path */}
                    </svg>
                    <h2 className="text-lg tracking-tight text-black dark:text-black text-left">
                        <span className="text-blacl dark:text-black">
                            {/* Replace with the actual creation date */}
                            {new Date().toLocaleDateString(undefined, {
                                month: "long",
                                day: "numeric",
                            })}
                            {" ("}
                            {formatDistanceToNow(new Date(), {
                                addSuffix: true,
                            })}
                            {")"}
                        </span>
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default PostCard;