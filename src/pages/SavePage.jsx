import React, { useEffect } from 'react'
import { Container, PostCard } from '../components'
import { useSelector, useDispatch } from 'react-redux'
import {setSavedPosts}  from '../store/postSlice'

function SavedPage() {
    const dispatch = useDispatch();
    const savedPosts = useSelector((state) => state.posts.savedPosts);

    useEffect(() => {
        let savedArray = JSON.parse(localStorage.getItem('savedPosts')) || []

        if(savedArray.length > 0){
            dispatch(setSavedPosts(savedArray));
        }

        localStorage.setItem('savedPosts', JSON.stringify(savedPosts))
    }, [savedPosts, dispatch]);

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {savedPosts.map((post) => (
                        <div key={post.$id} className='p-2 sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}
export default SavedPage