import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components'
import LandingPage from '../components/LandingPage';
import LoadingSpinner from '../components/Loading/LoadingSpinner'; // Import your LoadingSpinner component
import { useSelector, useDispatch } from 'react-redux';
import { setPosts } from '../store/postSlice';

function Home() {
    const posts = useSelector(state => state.posts.posts);
    const [isLoading, setIsLoading] = useState(true); // Add isLoading state
    const dispatch = useDispatch();
    const authStatus = useSelector(state => state.auth.status)


    useEffect(() => {
        appwriteService.getPosts().then((post) => {
            if (post) {
                dispatch(setPosts(post.documents));
            }
            setIsLoading(false);
        })
    }, [])

    if (isLoading) {
        return <LoadingSpinner />; // Render LoadingSpinner if isLoading is true
    }

    if (posts.length === 0) {
        return <LandingPage />
    }

    if (authStatus === false) {
        return <LandingPage />
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    <h1 className="text-2xl font-bold text-center mb-8">All Posts</h1>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-full'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home