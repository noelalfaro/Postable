import React, { useState, useEffect } from 'react';
import { supabase } from '../Client';

export default function NewPost() {

    const [posts, setPosts] = useState({ title: "", description: "", upvotes: "", imageLink: "" });

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await supabase
                .from('Posts')
                .select()
                .order('created_at', { ascending: true })

            // set state of posts
            setPosts(data);
            console.log('Posts: ', posts);
        };
        fetchData();
    }, [])

    const createPost = async (event) => {
        event.preventDefault();
        // check if required fields are not empty
        if (!posts.title || !posts.description) {
            alert("Please fill in all required fields");
            return;
        }
        try {
            await supabase
                .from('Posts')
                .insert({ title: posts.title, description: posts.description, upvotes: posts.upvotes, image: posts.imageLink })
                .select();

            window.location = "/feed";
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }

    const onChange = (event) => {
        const { name, value } = event.target;
        setPosts({ ...posts, [name]: value });
    }

    return (
        <div className='App'>
            <h1>Create a Post</h1>
            <div className='largeCardContainer'>
                <form onSubmit={createPost} >
                    <label htmlFor="title"><h3>Title</h3></label>
                    <input type="text" id="title" name="title" value={posts.title} onChange={onChange} required /><br />
                    <br />

                    <label htmlFor="description"><h3>Description</h3></label>
                    <textarea type="text" id="description" name="description" value={posts.description} onChange={onChange} required /><br />
                    <br />

                    <label htmlFor="imageLink"><h3>Image Link</h3></label>
                    <input type="text" id="imageLink" name="imageLink" value={posts.imageLink} onChange={onChange} /><br />
                    <br />

                    <button type="submit">Add Post to Feed</button>
                </form>
            </div>
        </div>
    )
}
