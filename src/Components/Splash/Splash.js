import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, sizing } from '@material-ui/system'
import './Splash.css'


function Splash() {


  return (
    <div className='Container'>
      <div className='col-12'>

        <h1>Paw-rfect</h1>

        <p>The Paw-rfect way to find the best care for your good boy or girl.</p>

        <div></div>
        <p>Connecting you to the best local dog walkers, sitters, and boarders.</p>
        <Link to='/dashboard'><button className='login-button'>Login/Register</button></Link>
        <div className='row'>
        <div className='col-12'>
          <img className='splash-dogs' src={require('../../img/dogs.png')} width="" height="" alt='dogs' />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Splash;