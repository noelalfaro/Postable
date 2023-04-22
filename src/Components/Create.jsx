import React, { useState } from 'react';
import { supabase } from '../Client';

export default function NewPost() {
    const [post, setPost] = useState({ title: '', description: '', upvotes: 0, imageLink: '' });

    const createPost = async (event) => {
        event.preventDefault();

        // Check if required fields are not empty
        if (!post.title || !post.description) {
            alert('Please fill in all required fields');
            return;
        }

        // Log the post object to check if it has the correct keys and values
        console.log('New post:', post);

        try {
            await supabase.from('Posts').insert(post);

            // Log a success message
            console.log('New post added to database!');

            window.location = '/feed';
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const onChange = (event) => {
        const { name, value } = event.target;
        setPost({ ...post, [name]: value });
    };

    return (
        <div className='App'>
            <h1>Create a Post</h1>
            <div className='largeCardContainer'>
                <form onSubmit={createPost}>
                    <label htmlFor='title'>
                        <h3>Title</h3>
                    </label>
                    <input type='text' id='title' name='title' value={post.title} onChange={onChange} required />
                    <br />
                    <br />

                    <label htmlFor='description'>
                        <h3>Description</h3>
                    </label>
                    <textarea type='text' id='description' name='description' value={post.description} onChange={onChange} required />
                    <br />
                    <br />

                    <label htmlFor='imageLink'>
                        <h3>Image Link</h3>
                    </label>
                    <input type='text' id='imageLink' name='imageLink' value={post.imageLink} onChange={onChange} />
                    <br />
                    <br />

                    <button type='submit'>Add Post to Feed</button>
                </form>
            </div>
        </div>
    );
}
