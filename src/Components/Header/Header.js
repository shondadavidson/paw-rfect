import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import io from 'socket.io-client'



const Header = (props) => {
    const [newMessageCount, setNewMessageCount] = useState({count: "0"})
    const [walkStatus, setWalkStatus] = useState({providerId: null})

    useEffect(() => {
        checkNewMessageCount()
        checkDogStatus()
        setSocketListeners()
    }, [])

    const setSocketListeners = () => {
      let socket = io()

      socket.emit('videoRoom', props.id)

      socket.on('reloadHeader', () => {
        console.log('hit reloadHeader')
        checkDogStatus()
      })


  }


const checkNewMessageCount = () => {
    axios.get(`/api/getNewMessageCount/${props.id}`).then(res => {
      setNewMessageCount(res.data )
    })
  }

  const checkDogStatus = () => {
    axios.get(`/api/dogStatus/${props.id}`).then(res => {
      setWalkStatus(res.data )
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

          {walkStatus.walk_id > 1  ? <Link to={`/videocall/${props.id}/${walkStatus.provider_id}`} className=""><button>
          <small>your dogs have been picked up</small>
          <p>
        <i className="fas fa-video videoButton"></i>Video Call</p></button></Link> : <div></div>  
        
        }

          
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