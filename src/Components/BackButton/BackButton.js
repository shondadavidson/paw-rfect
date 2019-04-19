import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


const BackButton = (props) => {
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

    if (props.location.pathname !== '/') {
    return (
        <div className=' header dead-link'>
            <button className='backButton' onClick={() => props.history.goBack()}><i className="fas fa-chevron-circle-left"></i></button>
            <img className='' src={require('../../img/paw-rfect-logo.png')} width="" height="" alt='dogs' />
            <Link to={`/inbox`}>
            <div className='messageCount'>
            <i className="far fa-comment"></i>
            <span>{newMessageCount.count} </span>
            </div>
          </Link>
            
        </div>)} else return(null)
    
    } 

    const mapStateToProps = reduxState => {
        return {
                    name: reduxState.name,
                id: reduxState.id
            }
        }

export default withRouter(connect(mapStateToProps)(BackButton))