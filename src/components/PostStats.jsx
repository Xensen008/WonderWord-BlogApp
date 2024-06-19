import React, { useState } from 'react'
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from "react-icons/fa"
import { IconContext } from "react-icons";
import { useSelector, useDispatch } from 'react-redux';
import appwriteService from '../appwrite/config';
import  {login} from '../store/authSlice'

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
        const newUserData =   await appwriteService.likePost(post.$id, likesArray);  if(newUserData) { dispatch(login(newUserData)) }
    };

    const handleSavePost = async () => {
        let savedArray = [...saves];
        if (savedArray.includes(post.$id)) {
            savedArray = savedArray.filter((Id) => Id !== post.$id);
        } else {
            savedArray.push(post.$id);
        }
        setSaves(savedArray);
        const newUserData =  await appwriteService.savePost(user.$id, savedArray);  if(newUserData) { dispatch(login(newUserData)) }
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
                    {checkIfSaved(saves, post.$id) ? <FaBookmark className="text-red-700" onClick={handleSavePost} /> : <FaRegBookmark className="text-black" onClick={handleSavePost} />} {/* Use FaBookmark and FaRegBookmark */}
                </IconContext.Provider>
                <span className="text-md dark:text-black-100 text-gray-900">
                    {checkIfSaved(saves, post.$id) ? 'Saved' : 'Save'}
                </span>
            </div>
        </div>
    )
}


export default PostStats