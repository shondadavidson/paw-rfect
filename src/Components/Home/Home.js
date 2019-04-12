import React from 'react';
import '../CSS/Home.css'
import { Link } from 'react-router-dom'

export default function() {
  return (
    <div>
      <div>
        <div>
          <h1>Dog Owners</h1>
        </div>
        <div className='home-container'>
          <Link to='/searchproviders'><div className='home-inner-container'>Search for Providers</div></Link>
          <div className='home-inner-container'>Current Providers</div>
        </div>
        <div>
          <Link to='/ownerprofile'>
            <button className="btn btn-success">Owner Profile</button>
          </Link>
        </div>
        <div>
          <h1>Service Providers</h1>
        </div>
        <div className='home-container'>
        <div className='home-inner-container'> <Link to='/clientlist'>Dog pickup</Link></div>
          <div className='home-inner-container'>New requests</div>
        </div>
        <div>
          <Link to='/providerprofile'>
            <button className="btn btn-success">Provider Profile</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
