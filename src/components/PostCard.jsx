import React from 'react';
import { Link } from 'react-router-dom';
import appwriteService from "../appwrite/config";
import parse from "html-react-parser";
import { formatDistanceToNow } from "date-fns";
import { IconContext } from 'react-icons';
import { FaHeart } from "react-icons/fa";

function PostCard({ $id, title, featuredImage, content, likes, $createdAt, owner }) {
    const truncatedContent = content.length > 180 ? `${content.substring(0, 180)}...` : content;

    if (!$id) {
        return <p>Post not found</p>;
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
                            <FaHeart className="text-gray-700" />
                        </IconContext.Provider>
                        <span className="text-md dark:text-black-100 text-gray-900">
                            {likes ? likes.length : 0}
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
                <div className="author flex items-start gap-2 mt-2 ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="2em"
                        height="2em"
                        viewBox="0 0 1024 1024"
                    >
                        {/* SVG path */}
                    </svg>
                    <div className="text-left">
                        <h2 className="text-lg tracking-tight text-black dark:text-black">
                            <span className="text-black dark:text-black">
                                @{owner.name}
                            </span>
                        </h2>
                        <span className="text-gray-600 dark:text-gray-200">
                            {new Date($createdAt).toLocaleDateString(undefined, {
                                month: "long",
                                day: "numeric",
                            })}
                            {" ("}
                            {formatDistanceToNow(new Date($createdAt), {
                                addSuffix: true,
                            })}
                            {")"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostCard;