import React from 'react';
import { Link } from 'react-router-dom';

export default function PostCard(props) {
    const date = new Date(props.created);
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
        <Link to={'/feed/post/' + props.id}>
            <div className='post-container'>
                <h3>{props.title}</h3>
                <p>Upvotes: {props.upvote}</p>
                <p>{formattedDate}</p>
            </div>
        </Link>
    );
}
