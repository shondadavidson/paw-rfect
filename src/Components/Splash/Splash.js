import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, sizing } from '@material-ui/system'


function Splash(){


        return(
            <div className='Container'>
            <div className='col-12'>

            <h1>Paw-rfect</h1>
          
            <div>The Paw-rfect way to find the best care for your good boy or girl.</div>
            <div>Connecting you to the best local dog walkers, sitters, and boarders.</div>
              <Link to='/dashboard'><button>Login/Register</button></Link>
              <p>
            <img className='' src={require('../../img/dogs.png')} width="" height="" alt='Get notified by txt when a match is called' />
            </p>
            </div>
            </div>
        )
}

export default Splash;