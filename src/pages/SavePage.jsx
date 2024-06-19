import React, { useState } from 'react';
import { Container, PostCard } from '../components';
import { useSelector, useDispatch } from 'react-redux';


function SavedPage() {
    const savedPosts = useSelector((state) => state.auth.userData.saved);

    return(
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {savedPosts && savedPosts.map((post) => (
                        <div key={post.$id} className='p-2 sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default SavedPage;