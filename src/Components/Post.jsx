import React from 'react';

export default function Post(props) {
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
        <div className='post-container'>
            <h3>{props.title}</h3>
            <button>Upvote {props.upvote}</button>
            <p>{formattedDate}</p>

        </div>
    );
}
