import React from 'react'

export default function About() {
    return (
        <div className='App' style={{ textAlign: 'left' }}>
            <h1 style={{ margin: '.5em' }}>About</h1>

            <div className='aboutTextContainer'>
                <h3>
                    This is a web app that uses supabase to allow users to create, read, update, and/or delete 'posts' & comments.
                    <br /> <br />
                    The Feed shows all the added posts, where the user can user can search or sort by popularity or time created
                    each Post has a dedicated page that the user can navigate to by clicking on a post card in the feed, navigation is
                    handled by react-router-dom.
                    <br /> <br />
                    Built with React, Vite, Supabase by <a href="https://github.com/noelzzz" style={{ textDecoration: 'underline' }}>Noel Alfaro</a>
                </h3>
            </div>

        </div>
    )
}
