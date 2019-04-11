import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Splash extends Component {

    render() {
        return(
            <>
            <h1>Welcome to Paw-rfect</h1>
            <div>The Paw-rfect way to find the best care for your good boy or girl.</div>
            <div>Connecting you to the best local dog walkers, sitters, an d boarders.</div>
              <Link to='/dashboard'><button>Login/Register</button></Link>
            <div>pictures of dogs go here</div>
            </>
        )
    }
}

export default Splash;