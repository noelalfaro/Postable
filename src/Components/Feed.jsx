import React, { useEffect, useState } from 'react';
import { supabase } from '../Client';
import PostCard from './PostCard';

export default function Feed() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchPosts = async (sort, ascending) => {
        setLoading(true);
        const { data } = await supabase
            .from('Posts')
            .select()
            .order(sort, { ascending: ascending });
        setPosts(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchPosts('created_at', false);
    }, []);

    const sortByCreated = () => {
        fetchPosts('created_at', false);
    };

    const sortByUpvotes = () => {
        fetchPosts('upvotes', false);
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        const { data } = await supabase
            .from('Posts')
            .select()
            .textSearch('title', searchTerm);
        setPosts(data);
    };

    return (
        <div className='App'>
            <h1 style={{ margin: '.1em' }}>Feed</h1>
            {loading && <h3>Loading...</h3>}
            <div>
                <button onClick={sortByCreated}>Sort by latest</button>
                <button onClick={sortByUpvotes}>
                    Sort by Most Popular (upvotes)
                </button>
            </div>
            <form onSubmit={handleSearch} autoComplete='off'>
                <input
                    type='text'
                    placeholder='Search by title'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ border: 'none' }}
                />
                <button type='submit'>Search</button>
            </form>
            {posts && posts.length > 0 ? (
                <div className='post-feed-container'>
                    {posts.map((post) => (
                        <PostCard
                            title={post.title}
                            description={post.description}
                            imageLink={post.imageLink}
                            upvote={post.upvotes}
                            created={post.created_at}
                            key={post.id}
                            id={post.id}
                        />
                    ))}
                </div>
            ) : (
                <h3>Loading...</h3>
            )}
        </div>
    );
}
