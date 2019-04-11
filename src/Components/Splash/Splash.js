import React from 'react';
import { Link } from 'react-router-dom';

function Splash(){


        return(
            <>
            <div>Welcome to Paw-rfect</div>
            <div>The Paw-rfect way to find the best care for your good boy(or girl).</div>
            <div>Connecting you to the best local dog walkers, sitters, and boarders.</div>
            <Link to='/dashboard'>
                <button>Login/Register</button>
            </Link>
            <div>pictures of dogs go here</div>
            </>
        )
}

export default Splash;