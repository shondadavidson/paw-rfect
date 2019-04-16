import React, {useEffect, useState} from 'react';
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
    <div className='home'>
      <div>
        <div>
          <h1>Dog Owners</h1>
        </div>
        <div className='home-container'>
          <Link to='/searchproviders'><div className='home-inner-container'>Search for Providers</div></Link>
          <Link to='/serviceProviders'>
          <div className='home-inner-container'>Current Providers</div>
          </Link>
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
          <Link to='/pendingclients'>
          <div className='home-inner-container'>You Have {requests} New Requests</div>
          </Link>
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
const mapStateToProps = reduxState => {
  return {
      name: reduxState.name,
      id: reduxState.id
  }
}

export default connect(mapStateToProps)(Home)
