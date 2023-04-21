import React, { useEffect, useState } from 'react'
import { supabase } from '../Client'
import Post from './Post';


export default function Feed() {

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await supabase
                .from('Posts')
                .select()
                .order('created_at', { ascending: true })

            setPosts(data);
        };
        fetchData();
    }, [])


    return (
        <div className='App'>
            <h1>Feed</h1>
            {
                posts && posts.length > 0 ?
                    <div className='post-feed-container'>
                        {posts.map((post) => (
                            <Post title={post.title} description={post.description} imageLink={post.imageLink} upvote={post.upvotes} created={post.created_at} key={post.id} id={post.id} />
                        ))}
                    </div>
                    : ""
            }

        </div>

    )
}
