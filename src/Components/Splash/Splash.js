import React from 'react';

function Splash() {

        return(
            <>
            <div>Welcome to Paw-rfect</div>
            <div>The Paw-rfect way to find the best care for your good boy(or girl).</div>
            <div>Connecting you to the best local dog walkers, sitters, and boarders.</div>
            <div>
                <button onClick={e=>{this.props.history.push('/Dashboard')}}>Login/Register</button>
            </div>
            <div>pictures of dogs go here</div>
            </>
        )
}

export default Splash;