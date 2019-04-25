import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


const Header = (props) => {
    const [newMessageCount, setNewMessageCount] = useState({count: "0"})

    useEffect(() => {
        checkNewMessageCount()
    }, [])

console.log(newMessageCount)
const checkNewMessageCount = () => {
    console.log('hit new message')
    axios.get(`/api/getNewMessageCount/${props.id}`).then(res => {
      setNewMessageCount(res.data )
    })
  }

    if (props.location.pathname !== '/' && props.location.pathname !== '/dashboard') {
    return (
        <div className=' header '>
        <Link to={`/home`}>
             <img className='logo' src={require('../../img/paw-logo-white.png')} width="" height="" alt='dogs' />
            {/* <img className='logo' src={require('../../img/paw-rfect-logo.png')} width="" height="" alt='dogs' /> */}
            </Link>
            
            <div>
            <h5>Welcome {props.name}</h5>
            
            <Link to={`/inbox`}>
            
            <div className='messageCount'>
            <i className="fas fa-inbox"></i>
            <span className='messageCount'>{newMessageCount.count} </span>
            </div>
            
          </Link>
          </div>
            
        </div>)} else return(null)
    
    } 

    const mapStateToProps = reduxState => {
        return {
                    name: reduxState.name,
                id: reduxState.id
            }
        }

export default withRouter(connect(mapStateToProps)(Header))