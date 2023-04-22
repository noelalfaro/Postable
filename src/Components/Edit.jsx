import React, { useState, useEffect } from 'react';
import { supabase } from '../Client';
import { Link, useParams } from 'react-router-dom';

export default function Edit() {

    const [post, setPost] = useState({ title: "", description: "", upvotes: "", imageLink: "" });
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('Posts')
                .select('*')
                .eq('id', id);
            if (error) {
                console.error(error);
            } else {
                setPost(data[0]);
            }
        };
        fetchData();

    }, [id]);

    const updatePost = async (event) => {
        event.preventDefault();
        if (!post.title || !post.description) {
            alert("Please fill in all required fields");
            return;
        }
        try {
            const title = event.target.elements.title.value;
            const description = event.target.elements.description.value;
            const imageLink = event.target.elements.imageLink.value;
            await supabase.from('Posts').update({ title, description, imageLink }).eq('id', id);

            window.location = '/feed/post/' + id
        } catch (error) {
            console.error('Error updating post:', error);
        }

    };


    const onChange = (event) => {
        const { name, value } = event.target;
        setPost({ ...post, [name]: value });
    }

    return (
        <div className='App'>
            <h1>Edit Post</h1>
            <div className='largeCardContainer'>
                <form onSubmit={updatePost} >
                    <label htmlFor="title"><h3>Title</h3></label>
                    <input type="text" id="title" name="title" value={post.title || ''} onChange={onChange} required /><br />
                    <br />

                    <label htmlFor="description"><h3>Description</h3></label>
                    <textarea type="text" id="description" name="description" value={post.description || ''} onChange={onChange} required /><br />
                    <br />

                    <label htmlFor="imageLink"><h3>Image Link</h3></label>
                    <input type="text" id="imageLink" name="imageLink" value={post.imageLink || ''} onChange={onChange} /><br />
                    <br />

                    <button type="submit">Update Post</button>
                </form>
            </div>
        </div>
    )
}
