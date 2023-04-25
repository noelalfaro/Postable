import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../Client';

export default function Post() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);
    const [dateCreated, setDateCreated] = useState('');
    const [comments, setComments] = useState([]);
    const [author, setAuthor] = useState('');
    const [comment, setComment] = useState('');
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase.from('Posts').select('*').eq('id', id);
            if (error) {
                console.error(error);
            } else {
                setPost(data[0]);
                setLoading(false);
                setCount(data[0].upvotes);
                setDateCreated(data[0].created_at)
            }
        };

        const fetchComments = async () => {
            const { data, error } = await supabase
                .from('Comments')
                .select('*')
                .eq('post_id', id);

            if (error) {
                console.error(error);
            } else {
                setComments(data);
                console.log('data: ', data);

            }
        };

        fetchData();
        fetchComments();

    }, [id]);

    useEffect(() => {
        if (dateCreated) {
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
            setFormattedDate(formattedDate);
        }
    }, [dateCreated]);

    const deletePost = async (event) => {
        event.preventDefault();
        try {
            await supabase.from('Posts').delete().eq('id', id);
            window.location = '/feed';
            alert('Post Deleted');
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const updateCount = async (event) => {
        event.preventDefault();
        await supabase.from('Posts').update({ upvotes: count + 1 }).eq('id', id);
        setCount((count) => count + 1);
    };

    async function handleSubmit(event) {
        event.preventDefault();

        const newComment = {
            post_id: id,
            author,
            comment,
            created_at: new Date(),
        };

        const { data, error } = await supabase.from('Comments').insert(newComment);

        if (error) {
            console.error(error);
        } else {
            // add the new comment to the comments state
            setComments((prevComments) => [...prevComments, newComment]);


        }

        // reset the author and comment inputs
        setAuthor('');
        setComment('');
    }



    return (
        <div className='App'>
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


                    <div className='commentFormContainer'>
                        <form onSubmit={handleSubmit} >
                            <input
                                type="text"
                                name="author"
                                placeholder="Author"
                                value={author}
                                onChange={(event) => setAuthor(event.target.value)}
                                onFocus={() => setAuthor('')}
                                style={{ width: "10%", border: 'none' }}
                                autoComplete='off'
                            />

                            <input
                                type="text"
                                name="comment"
                                placeholder="Comment"
                                value={comment}
                                onChange={(event) => setComment(event.target.value)}
                                onFocus={() => setComment('')}
                                style={{ width: "80%", border: 'none' }}
                                autoComplete='off'
                            />

                            <button type="submit">Submit</button>
                        </form>
                    </div>

                    {comments && (
                        <div className='commentContainer'>


                            <ul>
                                {comments.map((comment) => {
                                    const commentDate = new Date(comment.created_at);
                                    const options = {
                                        timeZone: 'America/Chicago',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',

                                    };
                                    const formattedCommentDate = commentDate.toLocaleString('en-US', options);
                                    return (
                                        <li key={comment.id}>
                                            <strong>{comment.author}</strong>: {comment.comment} - <small>{formattedCommentDate}</small>

                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}


                </>
            )}
        </div>
    )
}