import React, { useEffect, useState } from 'react';
import '../CSS/Home.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

const Home = (props) => {
  const [requests, setRequests] = useState(0)

  useEffect(() => {
    getRequests()
  }, [])

  const getRequests = () => {
    axios.get(`/api/getRequestCount/${props.id}`).then(res => {
      setRequests(res.data)
    })
  }
  return (
    <div className='homeContainer'>
    <div className='col-12'>
      <Link to='/ownerprofile'>
        <button className="">Owner Profile</button>
      </Link>
          
      <Link to='/providerprofile'>
        <button className="">Provider Profile</button>
      </Link>
      <div className='row'>
      <div className='col-12 col-md-6'>

      <Link to='/searchproviders'>
        <div className='home-inner-container'>
          <img className='homeIcon' src={require('../../img/search.png')} width="" height="" alt='search' /> <p>Search for Providers</p></div>
      </Link>
      </div>
      <div className='col-12 col-md-6'>
      <Link to='/serviceProviders'>
        <div className='home-inner-container'>
          <img className='homeIcon' src={require('../../img/current.png')} width="" height="" alt='search' /> <p>Current Providers</p></div>
      </Link>
             </div>
             <div className='col-12 col-md-6'>
      <Link to='/clientlist'>
        <div className='home-inner-container'>
          <p>Dog pickup</p>
                  <img className='homeIcon' src={require('../../img/pickup.png')} width="" height="" alt='search' />

        </div>
      </Link>
      </div>
      <div className='col-12 col-md-6'>
      <Link to='/pendingclients'>
        <div className='home-inner-container'>
          <p>You Have {requests} New Requests</p>
          <img className='homeIcon' src={require('../../img/requests.png')} width="" height="" alt='search' />
        </div>
      </Link>
      </div>
      </div>
        </div>
        </div>
        
  )
}
const mapStateToProps = reduxState => {
  return {
    name: reduxState.name,
    id: reduxState.id
  }
}

export default connect(mapStateToProps)(Home)
