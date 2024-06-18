import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components'
import LandingPage from '../components/LandingPage';
import LoadingSpinner from '../components/Loading/LoadingSpinner'; // Import your LoadingSpinner component
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true); // Add isLoading state

    const authStatus = useSelector(state => state.auth.status)
    

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
            setIsLoading(false); // Set isLoading to false after fetching posts
        })
    }, [])

    if (isLoading) {
        return <LoadingSpinner />; // Render LoadingSpinner if isLoading is true
    }

    if (posts.length === 0) {
        return <LandingPage />
    }

    if(authStatus === false){
        return <LandingPage />
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
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