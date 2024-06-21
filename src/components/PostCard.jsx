import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import appwriteService from "../appwrite/config";
import parse from "html-react-parser";
import { formatDistanceToNow } from "date-fns";
import { IconContext } from 'react-icons';
import { FaHeart, FaShareAlt, FaCopy } from "react-icons/fa";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';

function PostCard({ $id, title, featuredImage, content, likes, $createdAt, owner }) {
    const [showSharePopup, setShowSharePopup] = useState(false);
    const truncatedContent = content?.length > 180 ? `${content.substring(0, 280)}...` : content;

    const postUrl = `https://wonderword-blog-app.vercel.app/post/${$id}`; // replace with the URL pattern of your posts
    const shareTitle = title; // replace with the title of the post

    const copyToClipboard = () => {
        navigator.clipboard.writeText(postUrl);
        alert('Link copied to clipboard');
    };

    if (!$id) {
        return <p className="text-2xl font-bold text-center mt-8">Post not found</p>;
    }


    return (
        <>
            <div className="group p-3 w-full rounded-xl overflow-hidden flex flex-col md:flex-row bg-gray-100 dark:bg-[#262f40] border border-gray-400">
                <div className="relative rounded-xl overflow-hidden w-full md:w-[20rem] lg:w-60 h-60 flex-none ">
                    <img
                        src={appwriteService.getFilePreview(featuredImage)}
                        alt={title}
                        className="group-hover:scale-105 transition-transform duration-500 ease-in-out size-full absolute top-0 start-0 object-cover rounded-xl"
                    />
                </div>
                <div className="mt-4 sm:mt-0 sm:ms-2 sm:px-2 w-full text-left">
                    <div className="flex items-center justify-between mt-1 lg:mt-0 mr-1">
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-gray-600 dark:text-neutral-100 dark:group-hover:text-white">
                            {title}
                        </h3>
                        <div className="flex flex-row gap-2 items-center justify-center ">
                            <IconContext.Provider value={{ size: "1.5em" }}>
                                <FaHeart className="text-gray-500 dark:text-gray-200" />
                            </IconContext.Provider>
                            <span className="text-md dark:text-neutral-100 text-gray-900">
                                {likes?.length || 0}
                            </span>
                            <IconContext.Provider value={{ size: "1.5em" }}>
                                <FaShareAlt onClick={() => setShowSharePopup(!showSharePopup)} className="text-gray-500 dark:text-gray-200 cursor-pointer" />
                            </IconContext.Provider>
                        </div>
                    </div>
                    {showSharePopup && (
                        <div className="share-popup">
                            <FacebookShareButton
                                url={postUrl}
                                quote={shareTitle}
                                className="share-button"
                                onClick={(e) => { e.preventDefault(); window.open(postUrl, '_blank'); }}
                            >
                                <FacebookIcon size={32} round />
                            </FacebookShareButton>
                            <TwitterShareButton
                                url={postUrl}
                                title={shareTitle}
                                className="share-button"
                                onClick={(e) => { e.preventDefault(); window.open(postUrl, '_blank'); }}
                            >
                                <TwitterIcon size={32} round />
                            </TwitterShareButton>
                            <WhatsappShareButton
                                url={postUrl}
                                title={shareTitle}
                                className="share-button"
                                onClick={(e) => { e.preventDefault(); window.open(postUrl, '_blank'); }}
                            >
                                <WhatsappIcon size={32} round />
                            </WhatsappShareButton>
                            <FaCopy onClick={copyToClipboard} size={32} className="share-button cursor-pointer" />
                        </div>
                    )}
                    <div className="min-h-[6rem]">
                        <p className="mt-3 text-gray-600 dark:text-neutral-300 text-left">
                            {parse(truncatedContent)}
                        </p>
                        <Link to={`/post/${$id}`} >
                            <div className="inline-flex items-center gap-x-1 dark:text-blue-300  text-blue-600 decoration-2 hover:underline font-medium text-left">
                                Read more {">"}
                            </div>
                        </Link>
                    </div>
                    <div className="author flex items-center -ml-3 my-3">
                        <div className="text-lg tracking-tight text-gray-800 dark:text-neutral-100 font-bold text-left">
                            By {owner?.name}
                            <br></br>
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
        </>
    )
}
export default PostCard;