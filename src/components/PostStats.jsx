import React, { useState, useEffect } from 'react'
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from "react-icons/fa"
import { IconContext } from "react-icons";
import { useSelector, useDispatch } from 'react-redux';
import appwriteService from '../appwrite/config';
import { login } from '../store/authSlice'

function PostStats({ post }) {
    const user = useSelector((state) => state.auth.userData);
    const dispatch = useDispatch();

    const [likes, setLikes] = useState(post?.likes?.map((user) => user.$id));
    const [saves, setSaves] = useState(user?.saved ? user.saved.map((post) => post.$id) : []);

    useEffect(() => {
        setLikes(post?.likes ? post.likes.map((user) => user.$id) : []);
        setSaves(user?.saved ? user.saved.map((post) => post.$id) : []);
    }, [post, user]);


    const checkIfLiked = (likes, userId) => {
        return likes?.includes(userId) ? true : false;
    };

    const checkIfSaved = (saves, postId) => {
        return saves?.includes(postId) ? true : false;
    };

    const handleLikePost = async () => {
        let likesArray = [...likes];

        if (likesArray.includes(user?.$id)) {
            likesArray = likesArray.filter((Id) => Id !== user?.$id);
        } else {
            likesArray.push(user?.$id);
        }

        const userData = await appwriteService.likePost(post?.$id, likesArray);
        if (userData) {
            setLikes(likesArray);
            dispatch(login({ userData }));
        }
    };

    const handleSavePost = async () => {
        let savedArray = [...saves];
        if (savedArray.includes(post?.$id)) {
            savedArray = savedArray.filter((Id) => Id !== post.$id);
        } else {
            savedArray.push(post?.$id);
        }

        const userData = await appwriteService.savePost(user?.$id, savedArray);
        if (userData) {
            setSaves(savedArray);
            dispatch(login({ userData }));
        }
    };

    return (
        <div className="flex justify-between border p-2 rounded-md bg-gray-900">
            <div className="mr-2">
                <IconContext.Provider value={{ size: "1.5em" }}>
                    {checkIfLiked(likes, user?.$id) ? <FaHeart className="text-red-700" onClick={handleLikePost} /> : <FaRegHeart className="text-white" onClick={handleLikePost} />}
                </IconContext.Provider>
                <span className="text-md dark:text-white text-white">
                    {checkIfLiked(likes, user?.$id) ? 'Liked' : 'Like'}
                </span>
            </div>
            <div>
                <IconContext.Provider value={{ size: "1.5em" }}>
                    {checkIfSaved(saves, post?.$id) ? <FaBookmark className="text-white" onClick={handleSavePost} /> : <FaRegBookmark className="text-white" onClick={handleSavePost} />}
                </IconContext.Provider>
                <span className="text-md dark:text-white text-white">
                    {checkIfSaved(saves, post?.$id) ? 'Saved' : 'Save'}
                </span>
            </div>
        </div>
    )
}

export default PostStats