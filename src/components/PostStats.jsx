import React, { useState } from 'react'
import { FaHeart, FaRegHeart, FaSave, FaRegSave } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useSelector, useDispatch } from 'react-redux';
import appwriteService from '../appwrite/config';

function PostStats({ post }) {
    const user = useSelector((state) => state.auth.userData);
    const dispatch = useDispatch();
    const likesList = post?.likes?.map((user) => user.$id);
    const savedList = user?.saved?.map((post) => post.$id);

    const [likes, setLikes] = useState(likesList);
    const [saves, setSaves] = useState(savedList);

    const checkIfLiked = (likes, userId) => {
        return likes && likes.includes(userId) ? true : false;
    };

    const checkIfSaved = (saves, postId) => {
        return saves && saves.includes(postId) ? true : false;
    };

    const handleLikePost = async () => {
        let likesArray = [...likes];

        if (likesArray.includes(user.$id)) {
            likesArray = likesArray.filter((Id) => Id !== user.$id);
        } else {
            likesArray.push(user.$id);
        }
        setLikes(likesArray);
        await appwriteService.likePost({postId: post.$id, likes: likesArray});
    };

    const handleSavePost = async () => {
        let savedArray = [...saves];
        if (savedArray.includes(post.$id)) {
            savedArray = savedArray.filter((Id) => Id !== post.$id);
        } else {
            savedArray.push(post.$id);
        }
        setSaves(savedArray);
        await appwriteService.savePost({userId: user.$id, saved: savedArray});
    };

    return (
        <div className="flex justify-between border p-2 rounded-md">
            <div>
                <IconContext.Provider value={{ size: "1.5em" }}>
                    {checkIfLiked(likes, user.$id) ? <FaHeart className="text-red-700" onClick={handleLikePost} /> : <FaRegHeart className="text-black" onClick={handleLikePost} />}
                </IconContext.Provider>
                <span className="text-md dark:text-black-100 text-gray-900">
                    {checkIfLiked(likes, user.$id) ? 'Liked' : 'Like'}
                </span>
            </div>
            <div>
                <IconContext.Provider value={{ size: "1.5em" }}>
                    {checkIfSaved(saves, post.$id) ? <FaSave className="text-red-700" onClick={handleSavePost} /> : <FaRegSave className="text-black" onClick={handleSavePost} />}
                </IconContext.Provider>
                <span className="text-md dark:text-black-100 text-gray-900">
                    {checkIfSaved(saves, post.$id) ? 'Saved' : 'Save'}
                </span>
            </div>
        </div>
    )
}

export default PostStats