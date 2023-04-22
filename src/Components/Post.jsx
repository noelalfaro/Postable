import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../Client';

export default function Post() {

    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);
    const [dateCreated, setDate] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase.from('Posts').select('*').eq('id', id);
            if (error) {
                console.error(error);
            } else {
                setPost(data[0]);
                setLoading(false);
                setCount(data[0].upvotes);
                setDate(data[0].created_at)
            }
        };
        fetchData();

    }, [id]);

    const deletePost = async (event) => {
        event.preventDefault();
        try {
            await supabase
                .from('Posts')
                .delete()
                .eq('id', id);

            window.location = "/feed";

            alert('Post Deleted')
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    }

    const updateCount = async (event) => {
        event.preventDefault();
        await supabase
            .from('Posts')
            .update({ upvotes: count + 1 })
            .eq('id', id)

        setCount((count) => count + 1);
    }


    const date = new Date(dateCreated);
    const options = {
        timeZone: 'America/Chicago',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };
    const formattedDate = date.toLocaleString('en-US', options);





    return (
        <div className='App'>
            <h1>Post</h1>
            {loading && <p>Loading...</p>}
            {post && (
                <>
                    <div className='largeCardContainer'>

                        <h2>{post.title}</h2>
                        <h4>{post.description}</h4>
                        <img src={post.imageLink} alt={post.title} />
                        <div className='button-container'>
                            <Link to={'/feed/edit/' + id}>
                                <button>Edit Post</button>
                            </Link>
                            <button onClick={deletePost}>Delete Post</button>
                            <button onClick={updateCount}>{'+ ' + count}</button>

                        </div>
                        <p>{formattedDate}</p>
                    </div>

                </>
            )}
        </div>
    )
}
