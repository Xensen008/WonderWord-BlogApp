import React, { useState } from 'react';
import { Container, PostCard } from '../components';
import { useSelector, useDispatch } from 'react-redux';

function SavedPage() {
    const savedPosts = useSelector((state) => state.auth.userData.saved);

    if(!savedPosts || savedPosts.length === 0){
    return <div className="text-2xl font-bold text-center mt-8 mb-16">
        No post have been Saved
    </div>
}

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {savedPosts && savedPosts.map((post) => (
                        <div key={post.$id} className='p-2 w-full'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default SavedPage;