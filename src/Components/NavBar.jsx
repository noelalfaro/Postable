import React from 'react'
import { EditWrite } from 'react-basicons'
import { Link } from 'react-router-dom'


export default function NavBar() {
    return (
        <div className='nav-bar'>
            <div className='nav-functions'>
                <Link to={'/'}>
                    <div className='title'>
                        <h2>Postable <EditWrite size={32} weight={2} color='currentColor' /> </h2>
                    </div>
                </Link>
                <Link to={'/'}>
                    <div className='nav-item'>
                        Home
                    </div>
                </Link>
                <Link to={'/feed'}>
                    <div className='nav-item'>
                        Feed
                    </div>
                </Link>
                <Link to={'/create-post'}>
                    <div className='nav-item'>
                        Create a Post
                    </div>
                </Link>
                <Link to={'/about'}>
                    <div className='nav-item'>
                        About
                    </div>
                </Link>
            </div>
            <div className='nav-config'>
                <div className='nav-item'>

                </div>
            </div>


        </div>
    )
}
