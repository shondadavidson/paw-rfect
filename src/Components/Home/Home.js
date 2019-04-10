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
          <div className='home-inner-container'>Find Providers</div>
          <div className='home-inner-container'>Current Providers</div>
        </div>
        <div>
          <button className="btn btn-success">Owner Profile</button>
        </div>
        <div>
          <h1>Service Providers</h1>
        </div>
        <div className='home-container'>
        <div className='home-inner-container'> <Link to='/clientlist'>Dog pickup</Link></div>
          <div className='home-inner-container'>New requests</div>
        </div>
        <div>
          <button className="btn btn-success">Provider Profile</button>
        </div>
      </div>
    </div>
  )
}
